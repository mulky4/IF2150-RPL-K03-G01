import type { PrismaClient } from "@prisma/client";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("~/server/db", () => ({ db: {} }));
vi.mock("~/server/controllers/PresensiController", () => ({
  PresensiController: { perbaruiPortofolioRelawan: vi.fn() },
}));

import { GalatValidasi } from "~/lib/galat";
import {
  GalatProgram,
  ProgramController,
} from "~/server/controllers/ProgramController";
import { PresensiController } from "~/server/controllers/PresensiController";

const perbarui = vi.mocked(PresensiController.perbaruiPortofolioRelawan);

function buatDb() {
  const urutan: string[] = [];
  const tx = {
    laporanProgram: {
      findUnique: vi.fn().mockResolvedValue({
        id: "l1",
        programId: "p1",
        ringkasanCapaian: "Ringkasan capaian program yang cukup panjang.",
        dokumentasiAkhir: "https://contoh.id/dok",
        program: { inisiatorProgram: { userId: "user-inisiator" } },
      }),
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
    },
    program: {
      update: vi.fn().mockImplementation(async () => {
        urutan.push("program.update");
      }),
    },
    notifikasi: { create: vi.fn().mockResolvedValue({}) },
  };
  const database = {
    $transaction: async (fn: (t: typeof tx) => Promise<unknown>) => fn(tx),
  } as unknown as PrismaClient;
  return { database, tx, urutan };
}

describe("ProgramController.konfirmasiLaporan / tolakLaporan", () => {
  beforeEach(() => {
    perbarui.mockReset();
  });

  it("DISETUJUI: memperbarui portofolio dengan tx yang sama, setelah status SELESAI", async () => {
    const { database, tx, urutan } = buatDb();
    perbarui.mockImplementation(async () => {
      urutan.push("perbarui");
    });
    const status = await new ProgramController(database).konfirmasiLaporan(
      "l1",
      "verifikator-1",
    );
    expect(status).toBe("SELESAI");
    expect(perbarui).toHaveBeenCalledOnce();
    expect(perbarui).toHaveBeenCalledWith("p1", tx);
    expect(urutan).toEqual(["program.update", "perbarui"]);
  });

  it("DITOLAK: tidak memperbarui portofolio", async () => {
    const { database } = buatDb();
    const status = await new ProgramController(database).tolakLaporan(
      "l1",
      "verifikator-1",
      "Dokumentasi kurang lengkap",
    );
    expect(status).toBe("PERLU_REVISI");
    expect(perbarui).not.toHaveBeenCalled();
  });

  it("DISETUJUI: GalatValidasi dari portofolio dibungkus jadi CONFLICT", async () => {
    const { database } = buatDb();
    perbarui.mockRejectedValue(new GalatValidasi(["Program tidak ditemukan"]));
    const galat = await new ProgramController(database)
      .konfirmasiLaporan("l1", "verifikator-1")
      .catch((e: unknown) => e);
    expect(galat).toBeInstanceOf(GalatProgram);
    expect((galat as GalatProgram).code).toBe("CONFLICT");
    expect((galat as GalatProgram).message).toContain(
      "Program tidak ditemukan",
    );
  });

  it("DISETUJUI: galat tak terduga dilempar ulang apa adanya", async () => {
    const { database } = buatDb();
    const boom = new Error("koneksi putus");
    perbarui.mockRejectedValue(boom);
    const galat = await new ProgramController(database)
      .konfirmasiLaporan("l1", "verifikator-1")
      .catch((e: unknown) => e);
    expect(galat).toBe(boom);
  });
});
