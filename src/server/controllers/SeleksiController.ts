import { Prisma, type PrismaClient } from "@prisma/client";

import { db } from "~/server/db";
import { Notifikasi } from "~/server/models/Notifikasi";
import { Pendaftaran } from "~/server/models/Pendaftaran";

export type KeputusanSeleksi = {
  idPendaftaran: string;
  status: "DITERIMA" | "DITOLAK";
};

export type KodeGalatSeleksi =
  | "BAD_REQUEST"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT";

export class GalatSeleksi extends Error {
  constructor(
    message: string,
    public readonly code: KodeGalatSeleksi,
  ) {
    super(message);
    this.name = "GalatSeleksi";
  }
}

export class SeleksiController {
  constructor(private readonly database: PrismaClient = db) {}

  async lihatDaftarRelawan(idPengguna: string, idProgram: string) {
    const program = await this.ambilProgramMilikDatabase(idPengguna, idProgram);
    const pendaftar = await this.database.pendaftaran.findMany({
      where: { programId: idProgram },
      orderBy: { waktuDaftar: "asc" },
      select: {
        id: true,
        keterampilan: true,
        ketersediaanWaktu: true,
        status: true,
        waktuDaftar: true,
        relawan: {
          select: {
            nama: true,
            domisili: true,
            user: { select: { name: true } },
          },
        },
      },
    });
    return {
      program: {
        id: program.id,
        namaProgram: program.namaProgram,
        status: program.status,
        kuota: program.kuota,
        hasilSeleksiDiumumkanAt: program.hasilSeleksiDiumumkanAt,
      },
      pendaftar,
    };
  }

  async simpanHasilSeleksi(
    idPengguna: string,
    idProgram: string,
    keputusan: KeputusanSeleksi[],
  ): Promise<boolean> {
    if (keputusan.length === 0) {
      throw new GalatSeleksi("Pilih setidaknya satu pendaftar.", "BAD_REQUEST");
    }
    if (
      new Set(keputusan.map((item) => item.idPendaftaran)).size !==
      keputusan.length
    ) {
      throw new GalatSeleksi(
        "Pendaftar yang sama dipilih lebih dari sekali.",
        "BAD_REQUEST",
      );
    }

    try {
      // Cegah keputusan bersamaan memakai sisa kuota yang sama.
      return await this.database.$transaction(
        async (tx) => {
          const program = await this.ambilProgramMilik(
            tx,
            idPengguna,
            idProgram,
          );
          if (program.status !== "AKTIF") {
            throw new GalatSeleksi(
              "Seleksi hanya dapat dilakukan pada program aktif.",
              "CONFLICT",
            );
          }
          if (program.hasilSeleksiDiumumkanAt) {
            throw new GalatSeleksi("Hasil seleksi sudah diumumkan.", "CONFLICT");
          }

          const barisPendaftaran = await tx.pendaftaran.findMany({
            where: {
              programId: idProgram,
              id: { in: keputusan.map((item) => item.idPendaftaran) },
            },
            select: {
              id: true,
              status: true,
              keterampilan: true,
              ketersediaanWaktu: true,
              waktuDaftar: true,
            },
          });
          if (barisPendaftaran.length !== keputusan.length) {
            throw new GalatSeleksi(
              "Satu atau lebih pendaftar bukan bagian dari program ini.",
              "BAD_REQUEST",
            );
          }

          const statusPerId = new Map(
            keputusan.map((item) => [item.idPendaftaran, item.status]),
          );
          const diterimaBaru = barisPendaftaran.filter(
            (baris) =>
              baris.status === "MENUNGGU" &&
              statusPerId.get(baris.id) === "DITERIMA",
          ).length;
          await this.validasiKuota(tx, idProgram, program.kuota, diterimaBaru);

          for (const baris of barisPendaftaran) {
            const statusBaru = statusPerId.get(baris.id);
            if (!statusBaru) {
              throw new GalatSeleksi(
                "Keputusan untuk pendaftar tidak ditemukan.",
                "BAD_REQUEST",
              );
            }
            if (baris.status !== "MENUNGGU") {
              if (baris.status !== statusBaru) {
                throw new GalatSeleksi(
                  "Keputusan pendaftar yang sudah diputuskan tidak dapat diubah.",
                  "CONFLICT",
                );
              }
              continue;
            }

            const pendaftaran = new Pendaftaran({
              idPendaftaran: baris.id,
              keterampilan: baris.keterampilan,
              ketersediaanWaktu: baris.ketersediaanWaktu,
              status: baris.status,
              waktuDaftar: baris.waktuDaftar,
            });
            if (statusBaru === "DITERIMA") pendaftaran.terima();
            else pendaftaran.tolak();

            const pembaruan = await tx.pendaftaran.updateMany({
              where: { id: baris.id, status: "MENUNGGU" },
              data: { status: statusBaru },
            });
            if (pembaruan.count !== 1) {
              throw new GalatSeleksi(
                "Status pendaftar berubah. Muat ulang daftar dan coba lagi.",
                "CONFLICT",
              );
            }
          }
          return true;
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
      );
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2034"
      ) {
        throw new GalatSeleksi(
          "Data seleksi berubah bersamaan. Muat ulang daftar dan coba lagi.",
          "CONFLICT",
        );
      }
      throw error;
    }
  }

  async konfirmasiHasilSeleksi(
    idPengguna: string,
    idProgram: string,
  ): Promise<boolean> {
    try {
      return await this.database.$transaction(
        async (tx) => {
          const program = await this.ambilProgramMilik(
            tx,
            idPengguna,
            idProgram,
          );
          if (program.status !== "AKTIF") {
            throw new GalatSeleksi(
              "Hasil hanya dapat diumumkan untuk program aktif.",
              "CONFLICT",
            );
          }
          if (program.hasilSeleksiDiumumkanAt) {
            throw new GalatSeleksi("Hasil seleksi sudah diumumkan.", "CONFLICT");
          }

          const daftar = await tx.pendaftaran.findMany({
            where: { programId: idProgram },
            select: { status: true, relawan: { select: { userId: true } } },
          });
          if (
            daftar.length === 0 ||
            daftar.some((item) => item.status === "MENUNGGU")
          ) {
            throw new GalatSeleksi(
              "Putuskan semua pendaftar sebelum mengumumkan hasil.",
              "CONFLICT",
            );
          }
          const jumlahDiterima = daftar.filter(
            (item) => item.status === "DITERIMA",
          ).length;
          if (jumlahDiterima > program.kuota) {
            throw new GalatSeleksi(
              "Jumlah relawan diterima melebihi kuota program.",
              "CONFLICT",
            );
          }

          const diumumkan = await tx.program.updateMany({
            where: { id: idProgram, hasilSeleksiDiumumkanAt: null },
            data: { hasilSeleksiDiumumkanAt: new Date() },
          });
          if (diumumkan.count !== 1) {
            throw new GalatSeleksi("Hasil seleksi sudah diumumkan.", "CONFLICT");
          }

          for (const { status, relawan } of daftar) {
            await this.triggerNotifikasi(
              tx,
              relawan.userId,
              status === "DITERIMA"
                ? `Selamat, pendaftaranmu pada program ${program.namaProgram} diterima.`
                : `Pendaftaranmu pada program ${program.namaProgram} belum dapat diterima.`,
            );
          }
          return true;
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
      );
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2034"
      ) {
        throw new GalatSeleksi(
          "Data seleksi berubah bersamaan. Muat ulang daftar dan coba lagi.",
          "CONFLICT",
        );
      }
      throw error;
    }
  }

  private async ambilProgramMilikDatabase(
    idPengguna: string,
    idProgram: string,
  ) {
    const program = await this.database.program.findUnique({
      where: { id: idProgram },
      select: {
        id: true,
        namaProgram: true,
        status: true,
        kuota: true,
        hasilSeleksiDiumumkanAt: true,
        inisiatorProgram: { select: { userId: true } },
      },
    });
    if (!program) {
      throw new GalatSeleksi("Program tidak ditemukan.", "NOT_FOUND");
    }
    if (program.inisiatorProgram.userId !== idPengguna) {
      throw new GalatSeleksi("Program ini bukan milik akun Anda.", "FORBIDDEN");
    }
  }

  private async ambilProgramMilik(
    tx: Prisma.TransactionClient,
    idPengguna: string,
    idProgram: string,
  ) {
    const program = await tx.program.findUnique({
      where: { id: idProgram },
      select: {
        id: true,
        namaProgram: true,
        status: true,
        kuota: true,
        hasilSeleksiDiumumkanAt: true,
        inisiatorProgram: { select: { userId: true } },
      },
    });
    if (!program) {
      throw new GalatSeleksi("Program tidak ditemukan.", "NOT_FOUND");
    }
    if (program.inisiatorProgram.userId !== idPengguna) {
      throw new GalatSeleksi("Program ini bukan milik akun Anda.", "FORBIDDEN");
    }
    return program;
  }

  private async validasiKuota(
    tx: Prisma.TransactionClient,
    idProgram: string,
    kuota: number,
    jumlahDiterimaBaru: number,
  ): Promise<boolean> {
    const jumlahDiterima = await tx.pendaftaran.count({
      where: { programId: idProgram, status: "DITERIMA" },
    });
    if (jumlahDiterima + jumlahDiterimaBaru > kuota) {
      throw new GalatSeleksi(
        `Kuota program hanya ${kuota}; pendaftar yang diterima akan melebihi kuota.`,
        "CONFLICT",
      );
    }
    return true;
  }

  private async triggerNotifikasi(
    tx: Prisma.TransactionClient,
    userId: string,
    pesan: string,
  ): Promise<void> {
    const notifikasi = Notifikasi.baru(userId, pesan);
    await tx.notifikasi.create({ data: notifikasi.keDataUntukPenyimpanan() });
  }
}
