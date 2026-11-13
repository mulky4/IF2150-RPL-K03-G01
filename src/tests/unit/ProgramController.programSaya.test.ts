import type { PrismaClient } from "@prisma/client";
import { describe, expect, it, vi } from "vitest";

vi.mock("~/server/db", () => ({ db: {} }));

import {
  GalatProgram,
  ProgramController,
} from "~/server/controllers/ProgramController";

const WAKTU = new Date("2026-12-05T08:00:00.000Z");

function barisProgram(
  id: string,
  inisiatorProgramId: string,
  status: string,
  pendaftaran: string[],
) {
  return {
    id,
    namaProgram: `Program ${id}`,
    kategori: "JAGA_ALAM",
    waktuMulai: WAKTU,
    kuota: 10,
    status,
    inisiatorProgramId,
    pendaftaran: pendaftaran.map((s) => ({ status: s })),
  };
}

function buatDb(
  inisiator: Record<string, unknown> | null,
  semuaProgram: ReturnType<typeof barisProgram>[],
) {
  const findUnique = vi.fn().mockResolvedValue(inisiator);
  const findMany = vi.fn(
    async ({ where }: { where: { inisiatorProgramId: string } }) =>
      semuaProgram.filter(
        (p) => p.inisiatorProgramId === where.inisiatorProgramId,
      ),
  );
  const database = {
    inisiatorProgram: { findUnique },
    program: { findMany },
  } as unknown as PrismaClient;
  return { database, findUnique, findMany };
}

describe("ProgramController.ambilProgramSaya", () => {
  it("NOT_FOUND kalau akun bukan inisiator", async () => {
    const { database, findMany } = buatDb(null, []);
    const galat = await new ProgramController(database)
      .ambilProgramSaya("user-x")
      .catch((e: unknown) => e);
    expect(galat).toBeInstanceOf(GalatProgram);
    expect((galat as GalatProgram).code).toBe("NOT_FOUND");
    expect(findMany).not.toHaveBeenCalled();
  });

  it("hanya mengembalikan program milik inisiator itu, dengan hitungan diterima dan menunggu", async () => {
    const { database, findUnique } = buatDb(
      {
        id: "ins-1",
        namaLembaga: "Komunitas Hijau",
        statusVerifikasi: "TERVERIFIKASI",
      },
      [
        barisProgram("p1", "ins-1", "AKTIF", [
          "DITERIMA",
          "DITERIMA",
          "MENUNGGU",
          "DITOLAK",
        ]),
        barisProgram("p2", "ins-1", "PERLU_REVISI", []),
        barisProgram("p-lain", "ins-2", "AKTIF", ["MENUNGGU", "MENUNGGU"]),
      ],
    );

    const hasil = await new ProgramController(database).ambilProgramSaya(
      "user-1",
    );

    expect(findUnique).toHaveBeenCalledWith({ where: { userId: "user-1" } });
    expect(hasil.lembaga.namaLembaga).toBe("Komunitas Hijau");
    expect(hasil.program.map((p) => p.id)).toEqual(["p1", "p2"]);
    expect(hasil.program[0]).toMatchObject({ diterima: 2, menunggu: 1 });
    expect(hasil.program[1]).toMatchObject({ diterima: 0, menunggu: 0 });
    expect(hasil.statistik).toEqual({
      programAktif: 1,
      pendaftarMenunggu: 1,
      laporanPerluRevisi: 1,
    });
  });
});
