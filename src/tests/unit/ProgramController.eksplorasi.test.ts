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

describe("ProgramController.cariProgram", () => {
  it("C15-UT31 cariProgram selalu membatasi pencarian ke program AKTIF", async () => {
    const { controller, findMany } = buatDb();
    await controller.cariProgram("mangrove", null, 24);
    const { where } = findMany.mock.calls[0]![0] as {
      where: { status: string };
    };
    expect(where.status).toBe("AKTIF");
  });

  it("C15-UT32 cariProgram mencocokkan kata kunci (dipangkas spasinya) ke nama dan deskripsi tanpa membedakan huruf", async () => {
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

  it("C15-UT33 cariProgram memakai kategori sebagai filter; kata kunci kosong dan tanpa kategori = semua program aktif", async () => {
    const { controller, findMany } = buatDb();
    await controller.cariProgram("", "JAGA_IKLIM", 24);
    await controller.cariProgram("   ", undefined, 24);
    const panggilan = findMany.mock.calls.map(
      (c) => (c[0] as { where: unknown }).where,
    );
    expect(panggilan[0]).toEqual({ status: "AKTIF", kategori: "JAGA_IKLIM" });
    expect(panggilan[1]).toEqual({ status: "AKTIF" });
  });

  it("C15-UT34 cariProgram mengambil satu baris lebih banyak dari batas untuk menentukan adaLagi", async () => {
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

  it("C15-UT35 cariProgram memetakan baris ke ringkasan dengan jumlah diterima dari _count (tanpa query per program)", async () => {
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

  it("C15-UT36 cariProgram tanpa hasil mengembalikan daftar kosong dan adaLagi false", async () => {
    const { controller } = buatDb({ findMany: [] });
    const hasil = await controller.cariProgram(
      "tidak-ada-program-ini",
      null,
      24,
    );
    expect(hasil).toEqual({ daftar: [], adaLagi: false });
  });

  it("C15-UT37 cariProgram menggabungkan kata kunci dan kategori dalam satu pencarian", async () => {
    const { controller, findMany } = buatDb();
    await controller.cariProgram("sungai", "JAGA_ALAM", 24);
    expect(findMany.mock.calls[0]![0]).toMatchObject({
      where: {
        status: "AKTIF",
        kategori: "JAGA_ALAM",
        OR: [
          { namaProgram: { contains: "sungai", mode: "insensitive" } },
          { deskripsi: { contains: "sungai", mode: "insensitive" } },
        ],
      },
      orderBy: { waktuMulai: "asc" },
    });
  });
});

describe("ProgramController.ambilDetailProgram", () => {
  it("C15-UT38 ambilDetailProgram melempar NOT_FOUND kalau program tidak ada", async () => {
    const { controller } = buatDb();
    const galat = await galatDari(controller.ambilDetailProgram("x"));
    expect(galat).toBeInstanceOf(GalatProgram);
    expect((galat as GalatProgram).code).toBe("NOT_FOUND");
  });

  it("C15-UT39 ambilDetailProgram menyembunyikan program MENUNGGU_VERIFIKASI dari publik (NOT_FOUND)", async () => {
    const { controller } = buatDb({
      findUnique: barisProgram({ status: "MENUNGGU_VERIFIKASI" }),
    });
    const galat = await galatDari(controller.ambilDetailProgram("prog-1"));
    expect((galat as GalatProgram).code).toBe("NOT_FOUND");
  });

  it("C15-UT40 ambilDetailProgram mengembalikan tautan https valid dan kuota tersedia mengikuti jumlah diterima", async () => {
    const { controller } = buatDb({ findUnique: barisProgram() });
    const detail = await controller.ambilDetailProgram("prog-1");
    expect(detail.tautanSitusResmi).toBe("https://hijau.example");
    expect(detail.kuotaTersedia).toBe(true);
    expect(detail.jumlahDiterima).toBe(3);
    expect(detail.lembagaTerverifikasi).toBe(true);
    expect(detail.capaian).toBeNull();
  });

  it("C15-UT41 ambilDetailProgram: kuota penuh membuat kuotaTersedia false", async () => {
    const { controller } = buatDb({
      findUnique: barisProgram({ _count: { pendaftaran: 10 } }),
    });
    expect((await controller.ambilDetailProgram("prog-1")).kuotaTersedia).toBe(
      false,
    );
  });

  it("C15-UT42 ambilDetailProgram menghitung tahap waktu dan bisaDaftar dari tanggal, kuota, dan status", async () => {
    vi.useFakeTimers();
    try {
      const detail = async (ubah: Record<string, unknown> = {}) =>
        buatDb({
          findUnique: barisProgram(ubah),
        }).controller.ambilDetailProgram("prog-1");

      vi.setSystemTime(new Date("2026-12-01T00:00:00.000Z"));
      let hasil = await detail();
      expect(hasil.tahapWaktu).toBe("BELUM_DIMULAI");
      expect(hasil.bisaDaftar).toBe(true);

      vi.setSystemTime(new Date("2026-12-05T10:00:00.000Z"));
      hasil = await detail();
      expect(hasil.tahapWaktu).toBe("BERLANGSUNG");
      expect(hasil.bisaDaftar).toBe(true);

      hasil = await detail({ _count: { pendaftaran: 10 } });
      expect(hasil.bisaDaftar).toBe(false);

      vi.setSystemTime(new Date("2026-12-06T00:00:00.000Z"));
      hasil = await detail();
      expect(hasil.tahapWaktu).toBe("SELESAI");
      expect(hasil.bisaDaftar).toBe(false);

      vi.setSystemTime(new Date("2026-12-01T00:00:00.000Z"));
      hasil = await detail({ status: "PERLU_REVISI" });
      expect(hasil.bisaDaftar).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });

  it("C15-UT43 ambilDetailProgram: tautan kosong, bukan URL, atau bukan http/https menjadi null", async () => {
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

  it("C15-UT44 ambilDetailProgram: program SELESAI menampilkan capaian dari laporan yang disetujui", async () => {
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

  it("C15-UT45 ambilDetailProgram: program AKTIF tidak mencari laporan, SELESAI tanpa laporan disetujui berisi capaian null", async () => {
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

  it("C15-UT46 ambilDetailProgram: program yang sudah diajukan konfirmasi tetap tampil tetapi tidak bisa didaftar", async () => {
    const { controller } = buatDb({
      findUnique: barisProgram({ status: "MENUNGGU_KONFIRMASI" }),
    });
    const detail = await controller.ambilDetailProgram("prog-1");
    expect(detail.status).toBe("MENUNGGU_KONFIRMASI");
    expect(detail.bisaDaftar).toBe(false);
  });
});

describe("ProgramController.validasiTautanSitus (operasi private, dipanggil lewat ambilDetailProgram)", () => {
  const { controller } = buatDb();
  const valid = (url: string) =>
    (
      controller as unknown as { validasiTautanSitus(url: string): boolean }
    ).validasiTautanSitus(url);

  it("C15-UT47 validasiTautanSitus menerima URL http dan https", () => {
    expect(valid("https://hijau.example")).toBe(true);
    expect(valid("http://hijau.example/tentang")).toBe(true);
  });

  it("C15-UT48 validasiTautanSitus menolak teks kosong, spasi saja, dan teks yang bukan URL", () => {
    expect(valid("")).toBe(false);
    expect(valid("   ")).toBe(false);
    expect(valid("hijau.example")).toBe(false);
  });

  it("C15-UT49 validasiTautanSitus menolak skema selain http dan https (javascript, ftp, data)", () => {
    expect(valid("javascript:alert(1)")).toBe(false);
    expect(valid("ftp://hijau.example")).toBe(false);
    expect(valid("data:text/html,<b>x</b>")).toBe(false);
  });

  it("C15-UT50 batas: skema huruf besar dan spasi di pinggir tetap dianggap URL http/https yang valid", () => {
    expect(valid("HTTPS://hijau.example")).toBe(true);
    expect(valid("  https://hijau.example  ")).toBe(true);
  });
});
