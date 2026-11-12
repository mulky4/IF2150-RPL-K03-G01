import { Prisma } from "@prisma/client";

import { belumDiimplementasi } from "~/lib/belumDiimplementasi";
import { GalatValidasi } from "~/lib/galat";
import { db } from "~/server/db";
import { Kehadiran } from "~/server/models/Kehadiran";
import { Pendaftaran } from "~/server/models/Pendaftaran";
import { Program } from "~/server/models/Program";
import { Relawan } from "~/server/models/Relawan";

export const PESAN_BELUM_DITERIMA =
  "Relawan tidak terdaftar atau belum diterima pada program ini";
export const PESAN_DI_LUAR_WAKTU =
  "Check-in hanya dapat dilakukan selama waktu pelaksanaan program";
export const PESAN_SUDAH_HADIR = "Kehadiran sudah tercatat sebelumnya";

/**
 * Mengatur presensi (check-in) dan portofolio relawan.
 * Keputusan diserahkan ke model: Pendaftaran menilai status diterima,
 * Program menilai waktu pelaksanaan, Relawan menilai sudah hadir atau belum.
 */
export class PresensiController {
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

  static async perbaruiPortofolioRelawan(idProgram: string): Promise<void> {
    return belumDiimplementasi(
      "PresensiController.perbaruiPortofolioRelawan",
      idProgram,
    );
  }

  /** Teks status waktu program, misalnya "Belum dimulai" atau "Sudah selesai". */
  static async ambilKeteranganWaktu(idProgram: string): Promise<string> {
    const program = await PresensiController.cariProgram(idProgram);
    if (program === null) return "Program tidak ditemukan";
    return program.keteranganWaktu();
  }

  static async ambilTotalJamAksi(idRelawan: string): Promise<number> {
    return belumDiimplementasi(
      "PresensiController.ambilTotalJamAksi",
      idRelawan,
    );
  }

  static async ambilRiwayatProgram(idRelawan: string): Promise<Program[]> {
    return belumDiimplementasi(
      "PresensiController.ambilRiwayatProgram",
      idRelawan,
    );
  }

  private static async cariProgram(idProgram: string): Promise<Program | null> {
    const baris = await db.program.findUnique({ where: { id: idProgram } });
    if (baris === null) return null;
    return new Program({
      idProgram: baris.id,
      namaProgram: baris.namaProgram,
      deskripsi: baris.deskripsi,
      kategori: baris.kategori,
      tempatPelaksanaan: baris.tempatPelaksanaan,
      waktuMulai: baris.waktuMulai,
      waktuSelesai: baris.waktuSelesai,
      kuota: baris.kuota,
      syaratKetentuan: baris.syaratKetentuan,
      status: baris.status,
    });
  }
}
