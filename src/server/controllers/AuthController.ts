import { belumDiimplementasi } from "~/lib/belumDiimplementasi";
import { BetterAuth } from "~/server/adapters/BetterAuth";
import type { StatusVerifikasi, Peran } from "~/server/models/enums";
import type { Notifikasi } from "~/server/models/Notifikasi";
import type { Pengguna } from "~/server/models/Pengguna";

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
};

/** Berkas unggahan (tipe File pada DPPL). */
export type BerkasUnggahan = File | null;

/** Dilempar validasiKredensial() saat IP sedang diblokir (UC02 alt. 2, KNF06). */
export class GalatIPDiblokir extends Error {
  constructor(public readonly sampai: Date) {
    super("IP diblokir sementara selama 5 menit");
    this.name = "GalatIPDiblokir";
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

  /** Algo-C13-01 */
  static async buatAkunBaru(
    dataDiri: DataDiri,
    berkas: BerkasUnggahan,
  ): Promise<Pengguna> {
    return belumDiimplementasi("AuthController.buatAkunBaru", dataDiri, berkas);
  }

  /** Algo-C13-02. Mengembalikan daftar pesan galat (kosong kalau valid). */
  private static validasiKelengkapanData(
    dataDiri: DataDiri,
    berkas: BerkasUnggahan,
  ): string[] {
    return belumDiimplementasi(
      "AuthController.validasiKelengkapanData",
      dataDiri,
      berkas,
    );
  }

  /** Algo-C13-03 */
  private static cekStatusVerifikasi(dataDiri: DataDiri): StatusVerifikasi {
    return belumDiimplementasi("AuthController.cekStatusVerifikasi", dataDiri);
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

  /** Algo-C13-11 */
  static async ambilNotifikasi(idPengguna: string): Promise<Notifikasi[]> {
    return belumDiimplementasi("AuthController.ambilNotifikasi", idPengguna);
  }

  /** Algo-C13-12 */
  static async bacaNotifikasi(idNotifikasi: string): Promise<Notifikasi> {
    return belumDiimplementasi("AuthController.bacaNotifikasi", idNotifikasi);
  }
}
