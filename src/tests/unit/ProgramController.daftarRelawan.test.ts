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
  jumlahDiterima?: number;
};

function buat({ relawan, program, sudahDaftar, jumlahDiterima = 0 }: Dasar) {
  const create = vi.fn().mockResolvedValue({ id: "p1" });
  const count = vi.fn().mockResolvedValue(jumlahDiterima);
  const database = {
    relawan: { findUnique: vi.fn().mockResolvedValue(relawan) },
    program: { findUnique: vi.fn().mockResolvedValue(program) },
    pendaftaran: {
      findFirst: vi.fn().mockResolvedValue(sudahDaftar),
      count,
      create,
    },
  } as unknown as PrismaClient;
  return { controller: new ProgramController(database), create, count };
}

const input = {
  programId: "prog1",
  keterampilan: "Menanam",
  ketersediaanWaktu: "Akhir pekan",
};
const relawanOk = {
  id: "rel1",
  nama: "Ayu",
  noTelepon: "081200000001",
  domisili: "Bandung",
  statusVerifikasi: "TERVERIFIKASI",
};
const programAktif = { id: "prog1", status: "AKTIF", kuota: 2 };

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
      relawan: { ...relawanOk, statusVerifikasi: "MENUNGGU" },
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
      program: { ...programAktif, status: "SELESAI" },
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

  it.each([
    ["nomor telepon", { noTelepon: null }],
    ["domisili", { domisili: "   " }],
  ])("menolak relawan yang %s-nya kosong", async (_, kosong) => {
    const { controller, create } = buat({
      relawan: { ...relawanOk, ...kosong },
      program: programAktif,
      sudahDaftar: null,
    });
    await expect(
      controller.daftarRelawan("user1", input),
    ).rejects.toMatchObject({
      code: "BAD_REQUEST",
      message: expect.stringContaining("belum lengkap") as string,
    });
    expect(create).not.toHaveBeenCalled();
  });

  it("menolak pendaftaran kalau kuota program sudah penuh", async () => {
    const { controller, create, count } = buat({
      relawan: relawanOk,
      program: programAktif,
      sudahDaftar: null,
      jumlahDiterima: 2,
    });
    await expect(
      controller.daftarRelawan("user1", input),
    ).rejects.toMatchObject({
      code: "CONFLICT",
      message: "Kuota program sudah penuh.",
    });
    expect(count).toHaveBeenCalledWith({
      where: { programId: "prog1", status: "DITERIMA" },
    });
    expect(create).not.toHaveBeenCalled();
  });

  it("relawan yang sudah terdaftar di program penuh mendapat pesan sudah mendaftar", async () => {
    const { controller } = buat({
      relawan: relawanOk,
      program: programAktif,
      sudahDaftar: { id: "x" },
      jumlahDiterima: 2,
    });
    await expect(
      controller.daftarRelawan("user1", input),
    ).rejects.toMatchObject({
      code: "CONFLICT",
      message: "Kamu sudah mendaftar di program ini.",
    });
  });

  it("masih menerima pendaftaran selama kuota belum penuh", async () => {
    const { controller, create } = buat({
      relawan: relawanOk,
      program: programAktif,
      sudahDaftar: null,
      jumlahDiterima: 1,
    });
    await controller.daftarRelawan("user1", input);
    expect(create).toHaveBeenCalledOnce();
  });
});
