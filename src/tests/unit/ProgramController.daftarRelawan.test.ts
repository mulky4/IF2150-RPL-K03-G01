import { describe, expect, it, vi } from "vitest";
import type { PrismaClient } from "@prisma/client";

vi.mock("~/server/db", () => ({ db: {} }));

import {
  GalatProgram,
  ProgramController,
} from "~/server/controllers/ProgramController";

type Dasar = {
  relawan: unknown;
  program: unknown;
  sudahDaftar: unknown;
};

function buat({ relawan, program, sudahDaftar }: Dasar) {
  const create = vi.fn().mockResolvedValue({ id: "p1" });
  const database = {
    relawan: { findUnique: vi.fn().mockResolvedValue(relawan) },
    program: { findUnique: vi.fn().mockResolvedValue(program) },
    pendaftaran: {
      findFirst: vi.fn().mockResolvedValue(sudahDaftar),
      create,
    },
  } as unknown as PrismaClient;
  return { controller: new ProgramController(database), create };
}

const input = {
  programId: "prog1",
  keterampilan: "Menanam",
  ketersediaanWaktu: "Akhir pekan",
};
const relawanOk = { id: "rel1", statusVerifikasi: "TERVERIFIKASI" };
const programAktif = { id: "prog1", status: "AKTIF" };

describe("ProgramController.daftarRelawan", () => {
  it("berhasil dan memakai id relawan (bukan id user)", async () => {
    const { controller, create } = buat({
      relawan: relawanOk,
      program: programAktif,
      sudahDaftar: null,
    });
    await controller.daftarRelawan("user1", input);
    expect(create).toHaveBeenCalledWith({
      data: {
        programId: "prog1",
        relawanId: "rel1",
        keterampilan: "Menanam",
        ketersediaanWaktu: "Akhir pekan",
      },
    });
  });

  it("menolak relawan yang belum terverifikasi", async () => {
    const { controller } = buat({
      relawan: { id: "rel1", statusVerifikasi: "MENUNGGU" },
      program: programAktif,
      sudahDaftar: null,
    });
    await expect(
      controller.daftarRelawan("user1", input),
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("menolak program yang tidak ada", async () => {
    const { controller } = buat({
      relawan: relawanOk,
      program: null,
      sudahDaftar: null,
    });
    await expect(
      controller.daftarRelawan("user1", input),
    ).rejects.toMatchObject({ code: "NOT_FOUND" });
  });

  it("menolak program yang tidak aktif", async () => {
    const { controller } = buat({
      relawan: relawanOk,
      program: { id: "prog1", status: "SELESAI" },
      sudahDaftar: null,
    });
    await expect(
      controller.daftarRelawan("user1", input),
    ).rejects.toBeInstanceOf(GalatProgram);
  });

  it("menolak pendaftaran ganda", async () => {
    const { controller, create } = buat({
      relawan: relawanOk,
      program: programAktif,
      sudahDaftar: { id: "x" },
    });
    await expect(
      controller.daftarRelawan("user1", input),
    ).rejects.toMatchObject({ code: "CONFLICT" });
    expect(create).not.toHaveBeenCalled();
  });
});
