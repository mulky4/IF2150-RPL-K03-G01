import type { PrismaClient } from "@prisma/client";
import { describe, expect, it, vi } from "vitest";

vi.mock("~/server/db", () => ({ db: {} }));

import { ProgramController } from "~/server/controllers/ProgramController";

function barisProgram(id: string, userId: string, namaLembaga: string) {
  return {
    id,
    namaProgram: `Program ${id}`,
    kategori: "JAGA_ALAM",
    status: "MENUNGGU_VERIFIKASI",
    kuota: 10,
    waktuMulai: new Date("2026-12-05T08:00:00.000Z"),
    waktuSelesai: new Date("2026-12-05T12:00:00.000Z"),
    inisiatorProgram: { namaLembaga, userId },
  };
}

function buatDb(
  programs: ReturnType<typeof barisProgram>[],
  dokumen: { userId: string; urlFile: string }[] = [],
) {
  const findProgram = vi.fn().mockResolvedValue(programs);
  const findDokumen = vi.fn().mockResolvedValue(dokumen);
  const database = {
    program: { findMany: findProgram },
    dokumenVerifikasi: { findMany: findDokumen },
  } as unknown as PrismaClient;
  return { database, findProgram, findDokumen };
}

describe("ProgramController.ambilProgramMenungguVerifikasi", () => {
  it("hanya mengambil program MENUNGGU_VERIFIKASI, urut waktu mulai", async () => {
    const { database, findProgram } = buatDb([]);
    await new ProgramController(database).ambilProgramMenungguVerifikasi();
    const arg = findProgram.mock.calls[0]![0];
    expect(arg.where).toEqual({ status: "MENUNGGU_VERIFIKASI" });
    expect(arg.orderBy).toEqual({ waktuMulai: "asc" });
  });

  it("mengembalikan daftar kosong tanpa query dokumen", async () => {
    const { database, findDokumen } = buatDb([]);
    const hasil = await new ProgramController(
      database,
    ).ambilProgramMenungguVerifikasi();
    expect(hasil).toEqual([]);
    expect(findDokumen).not.toHaveBeenCalled();
  });

  it("menambah nama lembaga dan dokumen legalitas terbaru per inisiator", async () => {
    const { database } = buatDb(
      [
        barisProgram("p1", "u1", "Lembaga A"),
        barisProgram("p2", "u2", "Lembaga B"),
      ],
      // urut id desc: yang pertama per userId = terbaru
      [
        { userId: "u1", urlFile: "https://contoh.id/baru.pdf" },
        { userId: "u1", urlFile: "https://contoh.id/lama.pdf" },
      ],
    );
    const hasil = await new ProgramController(
      database,
    ).ambilProgramMenungguVerifikasi();
    expect(hasil[0]).toMatchObject({
      id: "p1",
      namaLembaga: "Lembaga A",
      urlDokumenLegalitas: "https://contoh.id/baru.pdf",
    });
    expect(hasil[1]).toMatchObject({
      id: "p2",
      namaLembaga: "Lembaga B",
      urlDokumenLegalitas: null,
    });
    expect(hasil[0]).not.toHaveProperty("inisiatorProgram");
  });
});
