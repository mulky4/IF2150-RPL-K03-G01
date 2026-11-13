import type { PrismaClient, StatusProgram } from "@prisma/client";
import { db } from "~/server/db";
import { LaporanProgram } from "~/server/models/LaporanProgram";
import { hitungStatistik } from "~/lib/programSaya";

export type KodeGalatProgram =
  "BAD_REQUEST" | "FORBIDDEN" | "NOT_FOUND" | "CONFLICT";

export class GalatProgram extends Error {
  constructor(
    message: string,
    public readonly code: KodeGalatProgram,
  ) {
    super(message);
    this.name = "GalatProgram";
  }
}

export type DataProgramBaru = {
  namaProgram: string;
  deskripsi: string;
  kategori: "JAGA_ALAM" | "JAGA_IKLIM";
  tempatPelaksanaan: string;
  waktuMulai: Date;
  waktuSelesai: Date;
  kuota: number;
  syaratKetentuan: string;
  urlDokumenLegalitas: string;
};

export class ProgramController {
  constructor(private readonly database: PrismaClient = db) {}

  async simpanProgramBaru(idPengguna: string, data: DataProgramBaru) {
    const galat = this.validasiDataProgram(data);
    if (galat.length > 0) {
      throw new GalatProgram(galat.join(" "), "BAD_REQUEST");
    }

    const inisiator = await this.database.inisiatorProgram.findUnique({
      where: { userId: idPengguna },
    });
    if (!inisiator || inisiator.statusVerifikasi !== "TERVERIFIKASI") {
      throw new GalatProgram("Lembaga belum terverifikasi.", "FORBIDDEN");
    }

    const { urlDokumenLegalitas, ...dataProgram } = data;
    return this.database.$transaction(async (tx) => {
      await tx.dokumenVerifikasi.create({
        data: {
          userId: idPengguna,
          jenisDokumen: "Legalitas lembaga",
          urlFile: urlDokumenLegalitas,
          statusVerifikasi: "MENUNGGU",
        },
      });

      return tx.program.create({
        data: {
          ...dataProgram,
          status: "MENUNGGU_VERIFIKASI",
          inisiatorProgramId: inisiator.id,
        },
      });
    });
  }

  async daftarRelawan(
    idPengguna: string,
    data: {
      programId: string;
      keterampilan: string;
      ketersediaanWaktu: string;
    },
  ) {
    const relawan = await this.database.relawan.findUnique({
      where: { userId: idPengguna },
    });
    if (!relawan) {
      throw new GalatProgram("Profil relawan tidak ditemukan.", "NOT_FOUND");
    }
    if (relawan.statusVerifikasi !== "TERVERIFIKASI") {
      throw new GalatProgram("Akunmu belum terverifikasi.", "FORBIDDEN");
    }

    const program = await this.database.program.findUnique({
      where: { id: data.programId },
    });
    if (!program) {
      throw new GalatProgram("Program tidak ditemukan.", "NOT_FOUND");
    }
    if (program.status !== "AKTIF") {
      throw new GalatProgram(
        "Program tidak menerima pendaftaran.",
        "BAD_REQUEST",
      );
    }

    const sudahDaftar = await this.database.pendaftaran.findFirst({
      where: { programId: program.id, relawanId: relawan.id },
    });
    if (sudahDaftar) {
      throw new GalatProgram(
        "Kamu sudah mendaftar di program ini.",
        "CONFLICT",
      );
    }

    return this.database.pendaftaran.create({
      data: {
        programId: program.id,
        relawanId: relawan.id,
        keterampilan: data.keterampilan,
        ketersediaanWaktu: data.ketersediaanWaktu,
      },
    });
  }

  async ambilProgramUntukLaporan(idPengguna: string) {
    return this.database.program.findMany({
      where: {
        inisiatorProgram: { userId: idPengguna },
        status: { in: ["AKTIF", "PERLU_REVISI"] },
      },
      orderBy: { waktuMulai: "desc" },
      select: {
        id: true,
        namaProgram: true,
        status: true,
        waktuMulai: true,
      },
    });
  }

  async ajukanLaporanAkhir(
    idPengguna: string,
    input: {
      programId: string;
      dokumentasi: string[];
      ringkasanCapaian: string;
    },
  ): Promise<StatusProgram> {
    this.validasiLaporan(input.dokumentasi, input.ringkasanCapaian);
    const program = await this.database.program.findUnique({
      where: { id: input.programId },
      include: { inisiatorProgram: true },
    });
    if (!program) {
      throw new GalatProgram("Program tidak ditemukan.", "NOT_FOUND");
    }
    if (program.inisiatorProgram.userId !== idPengguna) {
      throw new GalatProgram("Program ini bukan milik akun Anda.", "FORBIDDEN");
    }
    if (program.status !== "AKTIF" && program.status !== "PERLU_REVISI") {
      throw new GalatProgram(
        "Program belum dapat mengajukan laporan akhir.",
        "CONFLICT",
      );
    }

    const laporan = new LaporanProgram(input.ringkasanCapaian);
    for (const url of input.dokumentasi) {
      laporan.uploadDokumentasi(url);
    }

    return this.database.$transaction(async (tx) => {
      await tx.laporanProgram.create({
        data: {
          programId: program.id,
          dokumentasiAkhir: laporan.showDokumentasi(),
          ringkasanCapaian: laporan.showSummary(),
        },
      });
      const updatedProgram = await tx.program.update({
        where: { id: program.id },
        data: { status: "MENUNGGU_KONFIRMASI" },
        select: { status: true },
      });
      return updatedProgram.status;
    });
  }

  async ambilDaftarLaporan() {
    return this.database.laporanProgram.findMany({
      include: {
        program: {
          include: {
            inisiatorProgram: { select: { namaLembaga: true } },
          },
        },
      },
      orderBy: { waktuPengajuan: "asc" },
    });
  }

  async tinjauLaporan(idLaporan: string) {
    const laporan = await this.database.laporanProgram.findUnique({
      where: { id: idLaporan },
      include: {
        program: {
          include: {
            inisiatorProgram: { select: { namaLembaga: true, userId: true } },
          },
        },
        verifikator: { select: { name: true } },
      },
    });
    if (!laporan) {
      throw new GalatProgram("Laporan tidak ditemukan.", "NOT_FOUND");
    }
    return laporan;
  }

  async konfirmasiLaporan(
    idLaporan: string,
    idVerifikator: string,
  ): Promise<StatusProgram> {
    return this.selesaikanPeninjauan(idLaporan, idVerifikator, "DISETUJUI");
  }

  async tolakLaporan(
    idLaporan: string,
    idVerifikator: string,
    catatanRevisi: string,
  ): Promise<StatusProgram> {
    if (!catatanRevisi.trim()) {
      throw new GalatProgram("Catatan revisi wajib diisi.", "BAD_REQUEST");
    }
    return this.selesaikanPeninjauan(
      idLaporan,
      idVerifikator,
      "DITOLAK",
      catatanRevisi,
    );
  }

    async ambilProgramSaya(idPengguna: string) {
    const inisiator = await this.database.inisiatorProgram.findUnique({
      where: { userId: idPengguna },
    });
    if (!inisiator) {
      throw new GalatProgram("Akun inisiator tidak ditemukan.", "NOT_FOUND");
    }

    const daftar = await this.database.program.findMany({
      where: { inisiatorProgramId: inisiator.id },
      orderBy: { waktuMulai: "desc" },
      include: { pendaftaran: { select: { status: true } } },
    });

    const program = daftar.map((p) => ({
      id: p.id,
      namaProgram: p.namaProgram,
      kategori: p.kategori,
      waktuMulai: p.waktuMulai,
      kuota: p.kuota,
      status: p.status,
      diterima: p.pendaftaran.filter((x) => x.status === "DITERIMA").length,
      menunggu: p.pendaftaran.filter((x) => x.status === "MENUNGGU").length,
    }));

    return {
      lembaga: {
        namaLembaga: inisiator.namaLembaga,
        statusVerifikasi: inisiator.statusVerifikasi,
      },
      statistik: hitungStatistik(program),
      program,
    };
  }

  private validasiDataProgram(data: DataProgramBaru): string[] {
    const galat: string[] = [];
    if (
      !data.namaProgram.trim() ||
      !data.deskripsi.trim() ||
      !data.tempatPelaksanaan.trim() ||
      !data.syaratKetentuan.trim()
    ) {
      galat.push("Data program tidak lengkap.");
    }
    if (data.waktuSelesai.getTime() <= data.waktuMulai.getTime()) {
      galat.push("Rentang waktu tidak valid.");
    }
    if (!Number.isInteger(data.kuota) || data.kuota <= 0) {
      galat.push("Kuota harus lebih dari 0.");
    }
    if (!this.isHttpUrl(data.urlDokumenLegalitas)) {
      galat.push("Dokumen legalitas harus berupa tautan HTTP atau HTTPS.");
    }
    return galat;
  }

  private validasiLaporan(
    dokumentasi: string[],
    ringkasanCapaian: string,
  ): void {
    if (dokumentasi.length === 0) {
      throw new GalatProgram(
        "Dokumentasi akhir wajib diunggah.",
        "BAD_REQUEST",
      );
    }
    if (!ringkasanCapaian.trim()) {
      throw new GalatProgram("Ringkasan capaian wajib diisi.", "BAD_REQUEST");
    }
    if (dokumentasi.some((url) => !this.isHttpUrl(url))) {
      throw new GalatProgram(
        "Setiap dokumentasi harus berupa tautan HTTP atau HTTPS.",
        "BAD_REQUEST",
      );
    }
  }

  private async selesaikanPeninjauan(
    idLaporan: string,
    idVerifikator: string,
    keputusan: "DISETUJUI" | "DITOLAK",
    catatanRevisi?: string,
  ): Promise<StatusProgram> {
    return this.database.$transaction(async (tx) => {
      const laporan = await tx.laporanProgram.findUnique({
        where: { id: idLaporan },
        include: { program: { include: { inisiatorProgram: true } } },
      });
      if (!laporan) {
        throw new GalatProgram("Laporan tidak ditemukan.", "NOT_FOUND");
      }

      const entitas = new LaporanProgram(
        laporan.ringkasanCapaian,
        laporan.dokumentasiAkhir,
      );
      if (keputusan === "DISETUJUI") {
        entitas.setujui(idVerifikator);
      } else {
        entitas.tolak(idVerifikator, catatanRevisi ?? "");
      }

      const statusProgram: StatusProgram =
        keputusan === "DISETUJUI" ? "SELESAI" : "PERLU_REVISI";
      const pembaruanLaporan = await tx.laporanProgram.updateMany({
        where: { id: idLaporan, statusPeninjauan: "MENUNGGU" },
        data: {
          statusPeninjauan: entitas.getStatusPeninjauan(),
          catatanRevisi: entitas.getCatatanRevisi(),
          verifikatorId: entitas.getVerifikatorId(),
        },
      });
      if (pembaruanLaporan.count !== 1) {
        throw new GalatProgram("Laporan sudah ditinjau.", "CONFLICT");
      }
      await tx.program.update({
        where: { id: laporan.programId },
        data: { status: statusProgram },
      });
      await tx.notifikasi.create({
        data: {
          userId: laporan.program.inisiatorProgram.userId,
          pesan:
            keputusan === "DISETUJUI"
              ? "Laporan akhir disetujui."
              : `Laporan perlu revisi: ${catatanRevisi!.trim()}`,
        },
      });
      return statusProgram;
    });
  }

  private isHttpUrl(value: string): boolean {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }
}
