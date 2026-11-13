import type { PrismaClient } from "@prisma/client";
import { describe, expect, it, vi } from "vitest";

vi.mock("~/server/db", () => ({ db: {} }));

import {
  GalatProgram,
  ProgramController,
} from "~/server/controllers/ProgramController";

const MULAI = new Date("2026-12-05T08:00:00.000Z");
const SELESAI = new Date("2026-12-05T12:00:00.000Z");

function barisProgram(ubah: Record<string, unknown> = {}) {
  return {
    id: "prog-1",
    namaProgram: "Tanam Mangrove",
    deskripsi: "Menanam 500 bibit mangrove",
    kategori: "JAGA_ALAM",
    tempatPelaksanaan: "Pantai Indah",
    waktuMulai: MULAI,
    waktuSelesai: SELESAI,
    kuota: 10,
    syaratKetentuan: "Membawa botol minum",
    status: "AKTIF",
    inisiatorProgramId: "ini-1",
    inisiatorProgram: {
      id: "ini-1",
      userId: "user-ini",
      namaLembaga: "Komunitas Hijau",
      tautanSitusResmi: "https://hijau.example",
      statusVerifikasi: "TERVERIFIKASI",
      user: { email: "hijau@rekanbumi.test" },
    },
    _count: { pendaftaran: 3 },
    ...ubah,
  };
}

function buatDb(
  opsi: {
    findMany?: unknown[];
    findUnique?: unknown;
    laporan?: unknown;
  } = {},
) {
  const findMany = vi.fn().mockResolvedValue(opsi.findMany ?? []);
  const findUnique = vi.fn().mockResolvedValue(opsi.findUnique ?? null);
  const findFirst = vi.fn().mockResolvedValue(opsi.laporan ?? null);
  const database = {
    program: { findMany, findUnique },
    laporanProgram: { findFirst },
  } as unknown as PrismaClient;
  return { controller: new ProgramController(database), findMany, findFirst };
}

async function galatDari(janji: Promise<unknown>): Promise<unknown> {
  try {
    await janji;
  } catch (galat) {
    return galat;
  }
  throw new Error("Seharusnya melempar galat");
}

describe("ProgramController.cariProgram (UC03, KF03/KF04, KNF01)", () => {
  it("selalu membatasi ke program AKTIF", async () => {
    const { controller, findMany } = buatDb();
    await controller.cariProgram("mangrove", null, 24);
    const { where } = findMany.mock.calls[0]![0] as {
      where: { status: string };
    };
    expect(where.status).toBe("AKTIF");
  });

  it("kata kunci dicocokkan ke nama dan deskripsi tanpa membedakan huruf", async () => {
    const { controller, findMany } = buatDb();
    await controller.cariProgram("  Mangrove ", null, 24);
    const { where } = findMany.mock.calls[0]![0] as {
      where: { OR: unknown[] };
    };
    expect(where.OR).toEqual([
      { namaProgram: { contains: "Mangrove", mode: "insensitive" } },
      { deskripsi: { contains: "Mangrove", mode: "insensitive" } },
    ]);
  });

  it("kategori dipakai sebagai filter; kosong dan tanpa kategori = semua yang aktif", async () => {
    const { controller, findMany } = buatDb();
    await controller.cariProgram("", "JAGA_IKLIM", 24);
    await controller.cariProgram("   ", undefined, 24);
    const panggilan = findMany.mock.calls.map(
      (c) => (c[0] as { where: unknown }).where,
    );
    expect(panggilan[0]).toEqual({ status: "AKTIF", kategori: "JAGA_IKLIM" });
    expect(panggilan[1]).toEqual({ status: "AKTIF" });
  });

  it("mengambil satu baris lebih banyak dari batas untuk menentukan adaLagi", async () => {
    const tiga = [
      barisProgram({ id: "a" }),
      barisProgram({ id: "b" }),
      barisProgram({ id: "c" }),
    ];
    const { controller, findMany } = buatDb({ findMany: tiga });
    const hasil = await controller.cariProgram("", null, 2);
    expect(findMany.mock.calls[0]![0]).toMatchObject({ take: 3 });
    expect(hasil.daftar.map((p) => p.idProgram)).toEqual(["a", "b"]);
    expect(hasil.adaLagi).toBe(true);

    const { controller: c2 } = buatDb({ findMany: tiga.slice(0, 2) });
    expect((await c2.cariProgram("", null, 2)).adaLagi).toBe(false);
  });

  it("memetakan baris ke ringkasan, jumlah diterima dari _count (tanpa query per program)", async () => {
    const { controller } = buatDb({ findMany: [barisProgram()] });
    const { daftar } = await controller.cariProgram("", null, 24);
    expect(daftar).toEqual([
      {
        idProgram: "prog-1",
        namaProgram: "Tanam Mangrove",
        kategori: "JAGA_ALAM",
        tempatPelaksanaan: "Pantai Indah",
        waktuMulai: MULAI,
        waktuSelesai: SELESAI,
        kuota: 10,
        jumlahDiterima: 3,
        namaLembaga: "Komunitas Hijau",
        lembagaTerverifikasi: true,
      },
    ]);
  });
});

describe("ProgramController.ambilDetailProgram (UC04, KF02)", () => {
  it("NOT_FOUND kalau program tidak ada", async () => {
    const { controller } = buatDb();
    const galat = await galatDari(controller.ambilDetailProgram("x"));
    expect(galat).toBeInstanceOf(GalatProgram);
    expect((galat as GalatProgram).code).toBe("NOT_FOUND");
  });

  it("program MENUNGGU_VERIFIKASI tidak boleh tampil ke publik", async () => {
    const { controller } = buatDb({
      findUnique: barisProgram({ status: "MENUNGGU_VERIFIKASI" }),
    });
    const galat = await galatDari(controller.ambilDetailProgram("prog-1"));
    expect((galat as GalatProgram).code).toBe("NOT_FOUND");
  });

  it("tautan https valid dikembalikan; kuota tersedia mengikuti jumlah diterima", async () => {
    const { controller } = buatDb({ findUnique: barisProgram() });
    const detail = await controller.ambilDetailProgram("prog-1");
    expect(detail.tautanSitusResmi).toBe("https://hijau.example");
    expect(detail.kuotaTersedia).toBe(true);
    expect(detail.jumlahDiterima).toBe(3);
    expect(detail.lembagaTerverifikasi).toBe(true);
    expect(detail.capaian).toBeNull();
  });

  it("kuota penuh → kuotaTersedia false", async () => {
    const { controller } = buatDb({
      findUnique: barisProgram({ _count: { pendaftaran: 10 } }),
    });
    expect((await controller.ambilDetailProgram("prog-1")).kuotaTersedia).toBe(
      false,
    );
  });

  it("tautan kosong, bukan URL, atau bukan http/https → null (UC04 alt. 1)", async () => {
    for (const tautan of [
      null,
      "   ",
      "hijau.example",
      "javascript:alert(1)",
      "ftp://hijau.example",
    ]) {
      const { controller } = buatDb({
        findUnique: barisProgram({
          inisiatorProgram: {
            ...barisProgram().inisiatorProgram,
            tautanSitusResmi: tautan,
          },
        }),
      });
      expect(
        (await controller.ambilDetailProgram("prog-1")).tautanSitusResmi,
      ).toBeNull();
    }
  });

  it("program SELESAI menampilkan capaian dari laporan yang disetujui", async () => {
    const { controller, findFirst } = buatDb({
      findUnique: barisProgram({ status: "SELESAI" }),
      laporan: {
        ringkasanCapaian: "Menanam 500 bibit",
        dokumentasiAkhir: ["/api/uploads/a.jpg"],
      },
    });
    const detail = await controller.ambilDetailProgram("prog-1");
    expect(findFirst.mock.calls[0]![0]).toMatchObject({
      where: { programId: "prog-1", statusPeninjauan: "DISETUJUI" },
    });
    expect(detail.capaian).toEqual({
      ringkasan: "Menanam 500 bibit",
      dokumentasi: ["/api/uploads/a.jpg"],
    });
  });

  it("program AKTIF tidak mencari laporan; SELESAI tanpa laporan disetujui → capaian null", async () => {
    const aktif = buatDb({ findUnique: barisProgram() });
    await aktif.controller.ambilDetailProgram("prog-1");
    expect(aktif.findFirst).not.toHaveBeenCalled();

    const selesai = buatDb({
      findUnique: barisProgram({ status: "SELESAI" }),
    });
    expect(
      (await selesai.controller.ambilDetailProgram("prog-1")).capaian,
    ).toBeNull();
  });
});
