import { randomUUID } from "node:crypto";

import { afterAll, describe, expect, it } from "vitest";

import {
  ProgramController,
  type DataProgramBaru,
} from "~/server/controllers/ProgramController";
import { db } from "~/server/db";

// Uji integrasi Modul 4 (HIUPL 4.3): ProgramController (C15), LaporanProgram (C09),
// Notifikasi (C10), dan PresensiController (C20) dengan PostgreSQL sungguhan. Tanpa mock.

const kontroler = new ProgramController();
const awalan = `int-m4-${randomUUID().slice(0, 8)}`;
const idPenggunaDibuat: string[] = [];
const namaProgramDibuat: string[] = [];

async function buatAkun(
  peran: "INISIATOR" | "VERIFIKATOR",
  terverifikasi = true,
): Promise<string> {
  const id = randomUUID();
  await db.user.create({
    data: {
      id,
      name: `${awalan} ${peran}`,
      email: `${awalan}-${id.slice(0, 6)}@rekanbumi.test`,
      peran,
    },
  });
  idPenggunaDibuat.push(id);
  if (peran === "INISIATOR") {
    await db.inisiatorProgram.create({
      data: {
        namaLembaga: `Lembaga ${awalan}`,
        statusVerifikasi: terverifikasi ? "TERVERIFIKASI" : "MENUNGGU",
        userId: id,
      },
    });
  }
  return id;
}

function dataProgram(namaProgram: string): DataProgramBaru {
  return {
    namaProgram,
    deskripsi: "Program uji integrasi Modul 4.",
    kategori: "JAGA_ALAM",
    tempatPelaksanaan: "Bandung",
    waktuMulai: new Date("2026-11-01T08:00:00Z"),
    waktuSelesai: new Date("2026-11-01T12:00:00Z"),
    kuota: 10,
    syaratKetentuan: "Tidak ada syarat khusus.",
    urlDokumenLegalitas: "https://contoh.id/legalitas.pdf",
  };
}

async function buatProgram(
  idInisiator: string,
  status: "AKTIF" | "MENUNGGU_VERIFIKASI",
) {
  const inisiator = await db.inisiatorProgram.findUniqueOrThrow({
    where: { userId: idInisiator },
  });
  const nama = `Program ${awalan} ${randomUUID().slice(0, 6)}`;
  namaProgramDibuat.push(nama);
  const { urlDokumenLegalitas, ...kolomProgram } = dataProgram(nama);
  void urlDokumenLegalitas;
  return db.program.create({
    data: { ...kolomProgram, status, inisiatorProgramId: inisiator.id },
  });
}

async function ajukan(idInisiator: string, idProgram: string) {
  await kontroler.ajukanLaporanAkhir(idInisiator, {
    programId: idProgram,
    dokumentasi: ["https://contoh.id/foto-kegiatan.jpg"],
    ringkasanCapaian: "Seratus bibit ditanam di lokasi.",
  });
  return db.laporanProgram.findFirstOrThrow({
    where: { programId: idProgram },
  });
}

afterAll(async () => {
  for (const nama of namaProgramDibuat) {
    await db.notifikasi.deleteMany({ where: { pesan: { contains: nama } } });
  }
  const inisiator = await db.inisiatorProgram.findMany({
    where: { userId: { in: idPenggunaDibuat } },
    select: { id: true },
  });
  await db.program.deleteMany({
    where: { inisiatorProgramId: { in: inisiator.map((i) => i.id) } },
  });
  await db.user.deleteMany({ where: { id: { in: idPenggunaDibuat } } });
  await db.$disconnect();
});

describe("Integrasi Modul 4 – pendaftaran dan verifikasi program (C15 → DB)", () => {
  it("INT-TC30 simpanProgramBaru menyimpan program MENUNGGU_VERIFIKASI dan dokumen legalitas", async () => {
    const idInisiator = await buatAkun("INISIATOR");
    const nama = `Program ${awalan} baru`;
    namaProgramDibuat.push(nama);

    const program = await kontroler.simpanProgramBaru(
      idInisiator,
      dataProgram(nama),
    );

    const tersimpan = await db.program.findUnique({
      where: { id: program.id },
    });
    const dokumen = await db.dokumenVerifikasi.findMany({
      where: { userId: idInisiator },
    });
    expect(tersimpan?.status).toBe("MENUNGGU_VERIFIKASI");
    expect(tersimpan?.namaProgram).toBe(nama);
    expect(dokumen).toHaveLength(1);
    expect(dokumen[0]?.urlFile).toBe("https://contoh.id/legalitas.pdf");
  });

  it("INT-TC31 lembaga belum terverifikasi ditolak dan tidak ada program atau dokumen tersimpan", async () => {
    const idInisiator = await buatAkun("INISIATOR", false);
    const nama = `Program ${awalan} ditolak`;
    namaProgramDibuat.push(nama);

    await expect(
      kontroler.simpanProgramBaru(idInisiator, dataProgram(nama)),
    ).rejects.toMatchObject({ code: "FORBIDDEN" });

    expect(await db.program.count({ where: { namaProgram: nama } })).toBe(0);
    expect(
      await db.dokumenVerifikasi.count({ where: { userId: idInisiator } }),
    ).toBe(0);
  });

  it("INT-TC32 setujuiProgram mengaktifkan program dan memberi notifikasi ke inisiator", async () => {
    const idInisiator = await buatAkun("INISIATOR");
    const program = await buatProgram(idInisiator, "MENUNGGU_VERIFIKASI");

    const status = await kontroler.setujuiProgram(program.id);

    const tersimpan = await db.program.findUnique({
      where: { id: program.id },
    });
    const notifikasi = await db.notifikasi.count({
      where: { userId: idInisiator },
    });
    expect(status).toBe("AKTIF");
    expect(tersimpan?.status).toBe("AKTIF");
    expect(notifikasi).toBeGreaterThan(0);
  });

  it("INT-TC33 setujuiProgram pada program yang sudah AKTIF ditolak (CONFLICT), status tetap AKTIF", async () => {
    const idInisiator = await buatAkun("INISIATOR");
    const program = await buatProgram(idInisiator, "AKTIF");

    await expect(kontroler.setujuiProgram(program.id)).rejects.toMatchObject({
      code: "CONFLICT",
    });

    const tersimpan = await db.program.findUnique({
      where: { id: program.id },
    });
    expect(tersimpan?.status).toBe("AKTIF");
  });
});

describe("Integrasi Modul 4 – pengajuan laporan (C15 → C09, C10, DB)", () => {
  it("INT-TC34 ajukanLaporanAkhir menyimpan laporan MENUNGGU, program MENUNGGU_KONFIRMASI, dan notifikasi ke verifikator", async () => {
    const idInisiator = await buatAkun("INISIATOR");
    const idVerifikator = await buatAkun("VERIFIKATOR");
    const program = await buatProgram(idInisiator, "AKTIF");

    const status = await kontroler.ajukanLaporanAkhir(idInisiator, {
      programId: program.id,
      dokumentasi: ["https://contoh.id/foto-kegiatan.jpg"],
      ringkasanCapaian: "Seratus bibit ditanam di lokasi.",
    });

    const laporan = await db.laporanProgram.findMany({
      where: { programId: program.id },
    });
    const tersimpan = await db.program.findUnique({
      where: { id: program.id },
    });
    const notifikasi = await db.notifikasi.findMany({
      where: {
        userId: idVerifikator,
        pesan: { contains: program.namaProgram },
      },
    });
    expect(status).toBe("MENUNGGU_KONFIRMASI");
    expect(laporan).toHaveLength(1);
    expect(laporan[0]?.statusPeninjauan).toBe("MENUNGGU");
    expect(laporan[0]?.dokumentasiAkhir).toEqual([
      "https://contoh.id/foto-kegiatan.jpg",
    ]);
    expect(tersimpan?.status).toBe("MENUNGGU_KONFIRMASI");
    expect(notifikasi).toHaveLength(1);
  });

  it("INT-TC35 program milik akun lain ditolak (FORBIDDEN), tidak ada laporan, status tetap AKTIF", async () => {
    const idPemilik = await buatAkun("INISIATOR");
    const idLain = await buatAkun("INISIATOR");
    const program = await buatProgram(idPemilik, "AKTIF");

    await expect(
      kontroler.ajukanLaporanAkhir(idLain, {
        programId: program.id,
        dokumentasi: ["https://contoh.id/foto-kegiatan.jpg"],
        ringkasanCapaian: "Ringkasan.",
      }),
    ).rejects.toMatchObject({ code: "FORBIDDEN" });

    expect(
      await db.laporanProgram.count({ where: { programId: program.id } }),
    ).toBe(0);
    const tersimpan = await db.program.findUnique({
      where: { id: program.id },
    });
    expect(tersimpan?.status).toBe("AKTIF");
  });

  it("INT-TC36 dokumentasi kosong ditolak (BAD_REQUEST), tidak ada laporan, status tetap AKTIF", async () => {
    const idInisiator = await buatAkun("INISIATOR");
    const program = await buatProgram(idInisiator, "AKTIF");

    await expect(
      kontroler.ajukanLaporanAkhir(idInisiator, {
        programId: program.id,
        dokumentasi: [],
        ringkasanCapaian: "Ringkasan.",
      }),
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });

    expect(
      await db.laporanProgram.count({ where: { programId: program.id } }),
    ).toBe(0);
    const tersimpan = await db.program.findUnique({
      where: { id: program.id },
    });
    expect(tersimpan?.status).toBe("AKTIF");
  });
});

describe("Integrasi Modul 4 – peninjauan laporan (C15 → C09, C10, C20, DB)", () => {
  it("INT-TC37 konfirmasiLaporan: laporan DISETUJUI, program SELESAI, notifikasi ke inisiator", async () => {
    const idInisiator = await buatAkun("INISIATOR");
    const idVerifikator = await buatAkun("VERIFIKATOR");
    const program = await buatProgram(idInisiator, "AKTIF");
    const laporan = await ajukan(idInisiator, program.id);

    const status = await kontroler.konfirmasiLaporan(laporan.id, idVerifikator);

    const baru = await db.laporanProgram.findUnique({
      where: { id: laporan.id },
    });
    const tersimpan = await db.program.findUnique({
      where: { id: program.id },
    });
    const notifikasi = await db.notifikasi.findMany({
      where: { userId: idInisiator, pesan: "Laporan akhir disetujui." },
    });
    expect(status).toBe("SELESAI");
    expect(baru?.statusPeninjauan).toBe("DISETUJUI");
    expect(baru?.verifikatorId).toBe(idVerifikator);
    expect(tersimpan?.status).toBe("SELESAI");
    expect(notifikasi).toHaveLength(1);
  });

  it("INT-TC38 tolakLaporan: laporan DITOLAK dengan catatan revisi, program PERLU_REVISI, notifikasi memuat catatan", async () => {
    const idInisiator = await buatAkun("INISIATOR");
    const idVerifikator = await buatAkun("VERIFIKATOR");
    const program = await buatProgram(idInisiator, "AKTIF");
    const laporan = await ajukan(idInisiator, program.id);

    const status = await kontroler.tolakLaporan(
      laporan.id,
      idVerifikator,
      "Lengkapi foto kegiatan",
    );

    const baru = await db.laporanProgram.findUnique({
      where: { id: laporan.id },
    });
    const tersimpan = await db.program.findUnique({
      where: { id: program.id },
    });
    const notifikasi = await db.notifikasi.findMany({
      where: {
        userId: idInisiator,
        pesan: { contains: "Lengkapi foto kegiatan" },
      },
    });
    expect(status).toBe("PERLU_REVISI");
    expect(baru?.statusPeninjauan).toBe("DITOLAK");
    expect(baru?.catatanRevisi).toBe("Lengkapi foto kegiatan");
    expect(baru?.verifikatorId).toBe(idVerifikator);
    expect(tersimpan?.status).toBe("PERLU_REVISI");
    expect(notifikasi).toHaveLength(1);
  });

  it("INT-TC39 laporan yang sudah ditinjau tidak bisa ditinjau lagi (CONFLICT), status tetap DITOLAK", async () => {
    const idInisiator = await buatAkun("INISIATOR");
    const idVerifikator = await buatAkun("VERIFIKATOR");
    const program = await buatProgram(idInisiator, "AKTIF");
    const laporan = await ajukan(idInisiator, program.id);
    await kontroler.tolakLaporan(laporan.id, idVerifikator, "Perlu revisi");

    await expect(
      kontroler.konfirmasiLaporan(laporan.id, idVerifikator),
    ).rejects.toMatchObject({ code: "CONFLICT" });

    const baru = await db.laporanProgram.findUnique({
      where: { id: laporan.id },
    });
    const tersimpan = await db.program.findUnique({
      where: { id: program.id },
    });
    expect(baru?.statusPeninjauan).toBe("DITOLAK");
    expect(tersimpan?.status).toBe("PERLU_REVISI");
  });
});
