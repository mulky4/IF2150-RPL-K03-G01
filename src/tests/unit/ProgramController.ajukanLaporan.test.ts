import type { PrismaClient } from "@prisma/client";
import { describe, expect, it, vi } from "vitest";

vi.mock("~/server/db", () => ({ db: {} }));
vi.mock("~/server/controllers/PresensiController", () => ({
  PresensiController: { perbaruiPortofolioRelawan: vi.fn() },
}));

import {
  GalatProgram,
  ProgramController,
} from "~/server/controllers/ProgramController";

const INPUT = {
  programId: "p1",
  dokumentasi: ["https://contoh.id/dok"],
  ringkasanCapaian: "Ringkasan capaian program yang cukup panjang.",
};

function buatDb(verifikator: { id: string }[]) {
  const tx = {
    laporanProgram: { create: vi.fn().mockResolvedValue({}) },
    program: {
      update: vi.fn().mockResolvedValue({ status: "MENUNGGU_KONFIRMASI" }),
    },
    user: { findMany: vi.fn().mockResolvedValue(verifikator) },
    notifikasi: { createMany: vi.fn().mockResolvedValue({ count: 0 }) },
  };
  const transaksi = vi.fn(async (fn: (t: typeof tx) => Promise<unknown>) =>
    fn(tx),
  );
  const database = {
    program: {
      findUnique: vi.fn().mockResolvedValue({
        id: "p1",
        namaProgram: "Program Uji",
        status: "AKTIF",
        inisiatorProgram: { userId: "user-inisiator" },
      }),
    },
    $transaction: transaksi,
  } as unknown as PrismaClient;
  return { database, tx, transaksi };
}

describe("ProgramController.ajukanLaporanAkhir: notifikasi verifikator", () => {
  it("mengirim satu notifikasi ke setiap verifikator", async () => {
    const { database, tx } = buatDb([{ id: "v1" }, { id: "v2" }]);
    const status = await new ProgramController(database).ajukanLaporanAkhir(
      "user-inisiator",
      INPUT,
    );
    expect(status).toBe("MENUNGGU_KONFIRMASI");
    expect(tx.user.findMany).toHaveBeenCalledWith({
      where: { peran: "VERIFIKATOR" },
      select: { id: true },
    });
    expect(tx.notifikasi.createMany).toHaveBeenCalledOnce();
    const { data } = tx.notifikasi.createMany.mock.calls[0]![0] as {
      data: { userId: string; pesan: string }[];
    };
    expect(data.map((d) => d.userId)).toEqual(["v1", "v2"]);
    expect(data[0]!.pesan).toContain("Program Uji");
  });

  it("tidak membuat notifikasi kalau belum ada verifikator", async () => {
    const { database, tx } = buatDb([]);
    await new ProgramController(database).ajukanLaporanAkhir(
      "user-inisiator",
      INPUT,
    );
    expect(tx.notifikasi.createMany).not.toHaveBeenCalled();
  });

  it("program milik akun lain ditolak dan tidak ada transaksi", async () => {
    const { database, transaksi } = buatDb([{ id: "v1" }]);
    await expect(
      new ProgramController(database).ajukanLaporanAkhir("user-lain", INPUT),
    ).rejects.toBeInstanceOf(GalatProgram);
    expect(transaksi).not.toHaveBeenCalled();
  });
});
