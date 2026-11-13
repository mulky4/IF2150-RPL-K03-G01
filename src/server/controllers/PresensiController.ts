import { Prisma } from "@prisma/client";

import { GalatValidasi } from "~/lib/galat";
import { db } from "~/server/db";
import {
  StatusPendaftaran,
  StatusProgram,
  StatusVerifikasi,
  type KategoriProgram,
} from "~/server/models/enums";
import { Kehadiran } from "~/server/models/Kehadiran";
import { Pendaftaran } from "~/server/models/Pendaftaran";
import { Program } from "~/server/models/Program";
import { Relawan, SERTAKAN_RELAWAN } from "~/server/models/Relawan";

export const PESAN_BELUM_DITERIMA =
  "Relawan tidak terdaftar atau belum diterima pada program ini";
export const PESAN_DI_LUAR_WAKTU =
  "Check-in hanya dapat dilakukan selama waktu pelaksanaan program";
export const PESAN_SUDAH_HADIR = "Kehadiran sudah tercatat sebelumnya";
export const PESAN_PROGRAM_TIDAK_ADA = "Program tidak ditemukan";
export const PESAN_PROGRAM_BELUM_SELESAI =
  "Portofolio hanya diperbarui untuk program yang sudah selesai";
export const PESAN_RELAWAN_TIDAK_ADA = "Relawan tidak ditemukan";

/** Satu baris di daftar Kegiatan Saya, dikirim apa adanya ke halaman. */
export type KegiatanRelawan = {
  idProgram: string;
  namaProgram: string;
  kategori: KategoriProgram;
  tempatPelaksanaan: string;
  waktuMulai: Date;
  waktuSelesai: Date;
  statusPendaftaran: StatusPendaftaran;
  /** Waktu check-in, null kalau belum check-in. */
  waktuKehadiran: Date | null;
};

/** Identitas relawan di bagian atas halaman Portofolio. */
export type ProfilRelawan = {
  nama: string;
  domisili: string | null;
  terverifikasi: boolean;
  /** Waktu akun dibuat. */
  relawanSejak: Date;
};

/**
 * Mengatur presensi (check-in) dan portofolio relawan.
 * Keputusan diserahkan ke model: Pendaftaran menilai status diterima,
 * Program menilai waktu pelaksanaan, Relawan menilai sudah hadir atau belum.
 */
export class PresensiController {
  /** id relawan milik akun yang sedang login, null kalau akun ini bukan relawan. */
  static async cariIdRelawan(idPengguna: string): Promise<string | null> {
    const baris = await db.relawan.findUnique({
      where: { userId: idPengguna },
      select: { id: true },
    });
    return baris?.id ?? null;
  }

  /**
   * Semua program yang didaftari relawan, diurutkan dari yang paling dekat
   * waktunya. Program yang sudah lewat ditaruh di akhir.
   */
  static async ambilDaftarKegiatan(
    idRelawan: string,
  ): Promise<KegiatanRelawan[]> {
    const daftar = await db.pendaftaran.findMany({
      where: { relawanId: idRelawan },
      include: { program: true },
      orderBy: { program: { waktuMulai: "asc" } },
    });
    const kehadiran = await db.kehadiran.findMany({
      where: { relawanId: idRelawan },
      select: { programId: true, waktuKehadiran: true },
    });
    const sekarang = new Date();
    const kegiatan = daftar.map(({ program, status }): KegiatanRelawan => ({
      idProgram: program.id,
      namaProgram: program.namaProgram,
      kategori: program.kategori,
      tempatPelaksanaan: program.tempatPelaksanaan,
      waktuMulai: program.waktuMulai,
      waktuSelesai: program.waktuSelesai,
      statusPendaftaran: status,
      waktuKehadiran:
        kehadiran.find((k) => k.programId === program.id)?.waktuKehadiran ??
        null,
    }));
    const sudahLewat = (k: KegiatanRelawan) => k.waktuSelesai < sekarang;
    return [
      ...kegiatan.filter((k) => !sudahLewat(k)),
      ...kegiatan.filter(sudahLewat),
    ];
  }

  /** Relawan dianggap valid kalau pendaftarannya di program ini sudah diterima. */
  static async validasiStatusRelawan(
    idProgram: string,
    idRelawan: string,
  ): Promise<boolean> {
    const baris = await db.pendaftaran.findFirst({
      where: { programId: idProgram, relawanId: idRelawan },
    });
    if (baris === null) return false;
    const pendaftaran = new Pendaftaran({
      idPendaftaran: baris.id,
      keterampilan: baris.keterampilan,
      ketersediaanWaktu: baris.ketersediaanWaktu,
      status: baris.status,
      waktuDaftar: baris.waktuDaftar,
    });
    return pendaftaran.isDiterima();
  }

  /** true kalau waktu yang diberikan ada di antara waktu mulai dan selesai program. */
  static async validasiWaktuPelaksanaan(
    idProgram: string,
    waktu: Date,
  ): Promise<boolean> {
    const program = await PresensiController.cariProgram(idProgram);
    if (program === null) return false;
    return program.cekDalamWaktuPelaksanaan(waktu);
  }

  /**
   * Mencatat kehadiran relawan. Ditolak kalau relawan belum diterima,
   * di luar waktu pelaksanaan, atau sudah pernah check-in di program ini.
   */
  static async prosesCheckIn(
    idProgram: string,
    idRelawan: string,
  ): Promise<Kehadiran> {
    if (
      !(await PresensiController.validasiStatusRelawan(idProgram, idRelawan))
    ) {
      throw new GalatValidasi([PESAN_BELUM_DITERIMA]);
    }
    if (
      !(await PresensiController.validasiWaktuPelaksanaan(
        idProgram,
        new Date(),
      ))
    ) {
      throw new GalatValidasi([PESAN_DI_LUAR_WAKTU]);
    }

    const program = await PresensiController.cariProgram(idProgram);
    const relawan = await Relawan.cari(idRelawan);
    if (program === null || relawan === null) {
      throw new GalatValidasi([PESAN_BELUM_DITERIMA]);
    }
    if (relawan.hadirPada(program)) {
      throw new GalatValidasi([PESAN_SUDAH_HADIR]);
    }

    try {
      const baris = await db.kehadiran.create({
        data: { relawanId: idRelawan, programId: idProgram },
      });
      return Kehadiran.dariBaris(baris);
    } catch (galat) {
      // Dua check-in yang masuk hampir bersamaan: yang kedua ditolak oleh
      // aturan unik (relawanId, programId) di database.
      if (
        galat instanceof Prisma.PrismaClientKnownRequestError &&
        galat.code === "P2002"
      ) {
        throw new GalatValidasi([PESAN_SUDAH_HADIR]);
      }
      throw galat;
    }
  }

  /**
   * Menambah jam aksi setiap relawan diterima yang hadir di program ini.
   * Dipanggil setelah laporan akhir disetujui dan program berstatus SELESAI.
   * Aman dipanggil ulang: relawan yang programnya sudah tercatat dilewati.
   *
   * Kalau `tx` diberikan, semua baca dan tulis ikut transaksi pemanggil, jadi
   * status SELESAI yang belum di-commit sudah terbaca dan semuanya batal
   * bersama kalau ada yang gagal. Tanpa `tx`, fungsi ini membuka transaksinya
   * sendiri.
   */
  static async perbaruiPortofolioRelawan(
    idProgram: string,
    tx?: Prisma.TransactionClient,
  ): Promise<void> {
    if (tx) return PresensiController.catatJamAksiProgram(idProgram, tx);
    return db.$transaction((klien) =>
      PresensiController.catatJamAksiProgram(idProgram, klien),
    );
  }

  private static async catatJamAksiProgram(
    idProgram: string,
    klien: Prisma.TransactionClient,
  ): Promise<void> {
    const baris = await klien.program.findUnique({
      where: { id: idProgram },
      include: {
        pendaftaran: {
          where: { status: StatusPendaftaran.DITERIMA },
          include: { relawan: { include: SERTAKAN_RELAWAN } },
        },
      },
    });
    if (baris === null) throw new GalatValidasi([PESAN_PROGRAM_TIDAK_ADA]);
    const program = Program.dariBaris(baris, {
      relawanDiterima: baris.pendaftaran.map((p) =>
        Relawan.dariBaris(p.relawan),
      ),
    });
    if (program.getStatus() !== StatusProgram.SELESAI) {
      throw new GalatValidasi([PESAN_PROGRAM_BELUM_SELESAI]);
    }

    const tambahan: { idRelawan: string; jamAksi: number }[] = [];
    for (const relawan of program.daftarRelawanDiterima()) {
      if (!relawan.hadirPada(program)) continue;
      if (relawan.lihatPortofolio().mencatat(program)) continue;
      const sebelum = relawan.getTotalJamAksi();
      relawan.catatKontribusi(program);
      tambahan.push({
        idRelawan: relawan.getIdRelawan(),
        jamAksi: relawan.getTotalJamAksi() - sebelum,
      });
    }
    for (const { idRelawan, jamAksi } of tambahan) {
      const riwayat = await klien.riwayatKontribusi.upsert({
        where: { relawanId: idRelawan },
        create: { relawanId: idRelawan, totalJamAksi: jamAksi },
        update: { totalJamAksi: { increment: jamAksi } },
      });
      await klien.riwayatProgram.create({
        data: { riwayatId: riwayat.id, programId: idProgram },
      });
    }
  }

  /** Teks status waktu program, misalnya "Belum dimulai" atau "Sudah selesai". */
  static async ambilKeteranganWaktu(idProgram: string): Promise<string> {
    const program = await PresensiController.cariProgram(idProgram);
    if (program === null) return "Program tidak ditemukan";
    return program.keteranganWaktu();
  }

  static async ambilTotalJamAksi(idRelawan: string): Promise<number> {
    const relawan = await PresensiController.cariRelawan(idRelawan);
    return relawan.lihatPortofolio().getTotalJamAksi();
  }

  /** Program selesai yang dihadiri relawan, yang paling baru di atas. */
  static async ambilRiwayatProgram(idRelawan: string): Promise<Program[]> {
    const relawan = await PresensiController.cariRelawan(idRelawan);
    return relawan.lihatPortofolio().getDaftarProgramSelesai();
  }

  static async ambilProfilRelawan(idRelawan: string): Promise<ProfilRelawan> {
    const baris = await db.relawan.findUnique({
      where: { id: idRelawan },
      select: {
        nama: true,
        domisili: true,
        statusVerifikasi: true,
        user: { select: { createdAt: true } },
      },
    });
    if (baris === null) throw new GalatValidasi([PESAN_RELAWAN_TIDAK_ADA]);
    return {
      nama: baris.nama,
      domisili: baris.domisili,
      terverifikasi: baris.statusVerifikasi === StatusVerifikasi.TERVERIFIKASI,
      relawanSejak: baris.user.createdAt,
    };
  }

  private static async cariRelawan(idRelawan: string): Promise<Relawan> {
    const relawan = await Relawan.cari(idRelawan);
    if (relawan === null) throw new GalatValidasi([PESAN_RELAWAN_TIDAK_ADA]);
    return relawan;
  }

  private static async cariProgram(idProgram: string): Promise<Program | null> {
    const baris = await db.program.findUnique({ where: { id: idProgram } });
    return baris === null ? null : Program.dariBaris(baris);
  }
}
