import { APIError } from "better-auth/api";

import { GalatValidasi } from "~/lib/galat";
import { BetterAuth } from "~/server/adapters/BetterAuth";
import { CloudStorageAdapter } from "~/server/adapters/CloudStorageAdapter";
import { db } from "~/server/db";
import { Peran, StatusVerifikasi } from "~/server/models/enums";
import { Notifikasi } from "~/server/models/Notifikasi";
import { Pengguna } from "~/server/models/Pengguna";

/** Isian formulir registrasi (tipe FormData pada DPPL). */
export type DataDiri = {
  peran: Extract<Peran, "RELAWAN" | "INISIATOR">;
  email: string;
  kataSandi: string;
  // Relawan
  nama?: string;
  noTelepon?: string;
  domisili?: string;
  jenisDokumen?: string;
  // InisiatorProgram
  namaLembaga?: string;
  tautanSitusResmi?: string;
  /** Dipakai cekStatusVerifikasi(). Saat registrasi selalu belum terverifikasi. */
  emailTerverifikasi?: boolean;
};

/** Hasil buatAkunBaru(). Pengganti tipe Pengguna di DPPL (lihat catatan di buatAkunBaru). */
export type HasilRegistrasi = {
  idPengguna: string;
  email: string;
  peran: Extract<Peran, "RELAWAN" | "INISIATOR">;
  statusVerifikasi: StatusVerifikasi;
  dokumenTerunggah: boolean;
};

const POLA_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const KATA_SANDI_MINIMAL = 8;
const JENIS_DOKUMEN_BAWAAN = "Dokumen verifikasi diri";

/** Berkas unggahan (tipe File pada DPPL). */
export type BerkasUnggahan = File | null;

/** Dilempar validasiKredensial() saat IP sedang diblokir (UC02 alt. 2, KNF06). */
export class GalatIPDiblokir extends Error {
  constructor(public readonly sampai: Date) {
    super("IP diblokir sementara selama 5 menit");
    this.name = "GalatIPDiblokir";
  }
}

/** Dilempar saat data yang diminta tidak ada atau bukan milik pengguna. */
export class GalatTidakDitemukan extends Error {
  constructor(pesan: string) {
    super(pesan);
    this.name = "GalatTidakDitemukan";
  }
}

function adalahUrlWeb(teks: string): boolean {
  try {
    const url = new URL(teks);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * C13 AuthController «control» (Tabel 4.1 DPPL2).
 * Registrasi (UC01), login + blokir IP (UC02, KNF06), dan notifikasi akun (UC06).
 */
export class AuthController {
  // Blokir IP disimpan di memori (SPEC §1), dipakai bersama semua request.
  private static percobaanGagal = new Map<string, number>();
  private static waktuBlokir = new Map<string, Date>();
  private static readonly BATAS_PERCOBAAN = 5;
  private static readonly DURASI_BLOKIR_MENIT = 5;

  /**
   * Algo-C13-01 (UC01). Membuat akun Relawan atau InisiatorProgram beserta dokumennya.
   *
   * Beda dari DPPL (catat di B.1):
   * - Mengembalikan HasilRegistrasi, bukan objek Pengguna. Entity Relawan, InisiatorProgram,
   *   dan DokumenVerifikasi milik Modul 3/5, jadi baris-barisnya disimpan lewat Prisma
   *   di sini supaya AuthController tidak bergantung pada file model modul lain.
   * - Berkas diperiksa dan email dicek dulu sebelum akun dibuat, supaya registrasi yang
   *   gagal tidak meninggalkan akun setengah jadi. Kalau penyimpanan gagal sesudah akun
   *   terbentuk, akun dan berkas yang sudah terunggah dihapus kembali.
   */
  static async buatAkunBaru(
    dataDiri: DataDiri,
    berkas: BerkasUnggahan,
  ): Promise<HasilRegistrasi> {
    const data = AuthController.rapikanData(dataDiri);
    const daftarGalat = AuthController.validasiKelengkapanData(data, berkas);
    if (berkas !== null && !(await CloudStorageAdapter.validasiBerkas(berkas))) {
      daftarGalat.push("Berkas tidak valid");
    }
    if (
      POLA_EMAIL.test(data.email) &&
      (await db.user.findUnique({ where: { email: data.email } })) !== null
    ) {
      daftarGalat.push("Email sudah terdaftar");
    }
    if (daftarGalat.length > 0) throw new GalatValidasi(daftarGalat);

    const status = AuthController.cekStatusVerifikasi(data);
    const urlBerkas =
      berkas !== null ? await CloudStorageAdapter.unggahBerkas(berkas) : null;

    let idPengguna: string;
    try {
      idPengguna = await BetterAuth.daftarkanKredensial(
        data.email,
        data.kataSandi,
        { nama: data.nama ?? data.namaLembaga, peran: data.peran },
      );
    } catch (galat) {
      if (urlBerkas !== null) await CloudStorageAdapter.hapusBerkas(urlBerkas);
      // Dua registrasi bersamaan dengan email yang sama: yang kedua ditolak Better Auth.
      if (galat instanceof APIError && galat.status === "UNPROCESSABLE_ENTITY") {
        throw new GalatValidasi(["Email sudah terdaftar"]);
      }
      throw galat;
    }

    try {
      await db.$transaction(async (tx) => {
        if (data.peran === Peran.RELAWAN) {
          await tx.relawan.create({
            data: {
              nama: data.nama!,
              noTelepon: data.noTelepon,
              domisili: data.domisili,
              statusVerifikasi: status,
              userId: idPengguna,
            },
          });
        } else {
          await tx.inisiatorProgram.create({
            data: {
              namaLembaga: data.namaLembaga!,
              tautanSitusResmi: data.tautanSitusResmi || null,
              statusVerifikasi: status,
              userId: idPengguna,
            },
          });
        }
        if (urlBerkas !== null) {
          await tx.dokumenVerifikasi.create({
            data: {
              jenisDokumen: data.jenisDokumen || JENIS_DOKUMEN_BAWAAN,
              urlFile: urlBerkas,
              statusVerifikasi: StatusVerifikasi.MENUNGGU,
              userId: idPengguna,
            },
          });
        }
      });
    } catch (galat) {
      // Batalkan akun yang sudah terbentuk (baris terkait ikut terhapus lewat cascade).
      await db.user.delete({ where: { id: idPengguna } }).catch(() => undefined);
      if (urlBerkas !== null) await CloudStorageAdapter.hapusBerkas(urlBerkas);
      throw galat;
    }

    return {
      idPengguna,
      email: data.email,
      peran: data.peran,
      statusVerifikasi: status,
      dokumenTerunggah: urlBerkas !== null,
    };
  }

  /** Spasi di tepi isian dibuang dan email disamakan huruf kecilnya (seperti Better Auth). */
  private static rapikanData(dataDiri: DataDiri): DataDiri {
    const potong = (nilai?: string) => nilai?.trim();
    return {
      ...dataDiri,
      email: (dataDiri.email ?? "").trim().toLowerCase(),
      // Kata sandi tidak dipotong: spasi bagian dari kata sandi.
      kataSandi: dataDiri.kataSandi ?? "",
      nama: potong(dataDiri.nama),
      noTelepon: potong(dataDiri.noTelepon),
      domisili: potong(dataDiri.domisili),
      jenisDokumen: potong(dataDiri.jenisDokumen),
      namaLembaga: potong(dataDiri.namaLembaga),
      tautanSitusResmi: potong(dataDiri.tautanSitusResmi),
    };
  }

  /**
   * Algo-C13-02. Mengembalikan daftar pesan galat (kosong kalau valid).
   * Tambahan di luar DPPL, karena aturan Better Auth dan peran yang diizinkan:
   * kata sandi minimal 8 karakter, peran harus Relawan/Inisiator, tautan situs harus URL.
   */
  private static validasiKelengkapanData(
    dataDiri: DataDiri,
    berkas: BerkasUnggahan,
  ): string[] {
    const galat: string[] = [];
    const kosong = (nilai?: string) => !nilai || nilai.trim() === "";

    if (kosong(dataDiri.email) || !POLA_EMAIL.test(dataDiri.email)) {
      galat.push("Email tidak valid");
    }
    if (dataDiri.kataSandi === undefined || dataDiri.kataSandi === "") {
      galat.push("Kata sandi wajib diisi");
    } else if (dataDiri.kataSandi.length < KATA_SANDI_MINIMAL) {
      galat.push(`Kata sandi minimal ${KATA_SANDI_MINIMAL} karakter`);
    }

    if (dataDiri.peran === Peran.RELAWAN) {
      if (
        kosong(dataDiri.nama) ||
        kosong(dataDiri.noTelepon) ||
        kosong(dataDiri.domisili)
      ) {
        galat.push("Data diri tidak lengkap");
      }
      if (berkas === null) galat.push("Dokumen verifikasi wajib diunggah");
    } else if (dataDiri.peran === Peran.INISIATOR) {
      if (kosong(dataDiri.namaLembaga)) galat.push("Nama lembaga wajib diisi");
      if (!kosong(dataDiri.tautanSitusResmi) && !adalahUrlWeb(dataDiri.tautanSitusResmi!)) {
        galat.push("Tautan situs resmi tidak valid");
      }
    } else {
      galat.push("Peran tidak valid");
    }
    return galat;
  }

  /** Algo-C13-03. Saat registrasi email belum diverifikasi, jadi hasilnya MENUNGGU. */
  private static cekStatusVerifikasi(dataDiri: DataDiri): StatusVerifikasi {
    return dataDiri.emailTerverifikasi === true
      ? StatusVerifikasi.TERVERIFIKASI
      : StatusVerifikasi.MENUNGGU;
  }

  /** Algo-C13-04 */
  static async cekSesi(): Promise<boolean> {
    const sesi = await BetterAuth.ambilSesi();
    return sesi !== null;
  }

  /**
   * Algo-C13-05. true kalau kredensial benar dan sesi dibuat, false kalau salah.
   * Melempar GalatIPDiblokir kalau IP sedang diblokir.
   */
  static async validasiKredensial(
    email: string,
    kataSandi: string,
    ip: string,
  ): Promise<boolean> {
    if (AuthController.cekStatusBlokir(ip)) {
      throw new GalatIPDiblokir(AuthController.waktuBlokir.get(ip)!);
    }
    const idPengguna = await BetterAuth.verifikasiKredensial(email, kataSandi);
    if (idPengguna === null) {
      const jumlah = AuthController.catatPercobaanGagal(ip);
      if (jumlah >= AuthController.BATAS_PERCOBAAN) {
        AuthController.blokirIP(ip);
      }
      return false;
    }
    AuthController.resetPercobaanGagal(ip);
    await AuthController.mulaiSesi(email, kataSandi);
    return true;
  }

  /** Algo-C13-06 */
  private static cekStatusBlokir(ip: string): boolean {
    const sampai = AuthController.waktuBlokir.get(ip);
    if (sampai) {
      if (new Date() < sampai) return true;
      AuthController.waktuBlokir.delete(ip);
      AuthController.resetPercobaanGagal(ip);
    }
    return false;
  }

  /** Algo-C13-07 */
  private static catatPercobaanGagal(ip: string): number {
    const jumlah = (AuthController.percobaanGagal.get(ip) ?? 0) + 1;
    AuthController.percobaanGagal.set(ip, jumlah);
    return jumlah;
  }

  /** Algo-C13-08 */
  private static blokirIP(ip: string): void {
    const sampai = new Date(
      Date.now() + AuthController.DURASI_BLOKIR_MENIT * 60 * 1000,
    );
    AuthController.waktuBlokir.set(ip, sampai);
  }

  /** Algo-C13-09 */
  private static resetPercobaanGagal(ip: string): void {
    AuthController.percobaanGagal.delete(ip);
  }

  /**
   * Algo-C13-10. Mengembalikan token sesi.
   * Beda dari DPPL: menerima email + kata sandi (bukan idPengguna), karena sesi dan
   * cookie bertanda tangan Better Auth hanya dibuat lewat API sign-in-nya (catat di B.1).
   */
  private static async mulaiSesi(
    email: string,
    kataSandi: string,
  ): Promise<string> {
    return BetterAuth.buatSesiMasuk(email, kataSandi);
  }

  /** Algo-C13-11. Notifikasi milik pengguna, terbaru di atas (UC06). */
  static async ambilNotifikasi(idPengguna: string): Promise<Notifikasi[]> {
    const pengguna = await Pengguna.cari(idPengguna);
    if (pengguna === null) {
      throw new GalatTidakDitemukan("Pengguna tidak ditemukan");
    }
    return pengguna.lihatNotifikasi();
  }

  /**
   * Algo-C13-12. Menandai notifikasi sudah dibaca lalu mengembalikannya (UC06).
   * Beda dari DPPL: ada parameter idPengguna supaya pengguna hanya bisa membaca
   * notifikasinya sendiri. Notifikasi milik orang lain dianggap tidak ada (catat di B.1).
   */
  static async bacaNotifikasi(
    idNotifikasi: string,
    idPengguna: string,
  ): Promise<Notifikasi> {
    const baris = await db.notifikasi.findUnique({
      where: { id: idNotifikasi },
    });
    const notifikasi = baris ? Notifikasi.dariBaris(baris) : null;
    if (notifikasi === null || !notifikasi.milik(idPengguna)) {
      throw new GalatTidakDitemukan("Notifikasi tidak ditemukan");
    }
    await notifikasi.baca();
    return notifikasi;
  }
}
