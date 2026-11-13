import type { PrismaClient } from "@prisma/client";
import { describe, expect, it, vi } from "vitest";

vi.mock("~/server/db", () => ({ db: {} }));

import {
  GalatProgram,
  ProgramController,
} from "~/server/controllers/ProgramController";

function barisProgram(status: string) {
  return {
    id: "p1",
    namaProgram: "Tanam Pohon",
    deskripsi: "-",
    kategori: "JAGA_ALAM",
    tempatPelaksanaan: "Bandung",
    waktuMulai: new Date("2026-12-05T08:00:00.000Z"),
    waktuSelesai: new Date("2026-12-05T12:00:00.000Z"),
    kuota: 10,
    syaratKetentuan: "-",
    status,
    inisiatorProgram: { userId: "user-inisiator" },
  };
}

function buatDb(
  program: ReturnType<typeof barisProgram> | null,
  jumlahUpdate = 1,
) {
  const updateMany = vi.fn().mockResolvedValue({ count: jumlahUpdate });
  const buatNotifikasi = vi.fn().mockResolvedValue({});
  const tx = {
    program: {
      findUnique: vi.fn().mockResolvedValue(program),
      updateMany,
    },
    notifikasi: { create: buatNotifikasi },
  };
  const database = {
    $transaction: async (fn: (t: typeof tx) => Promise<unknown>) => fn(tx),
  } as unknown as PrismaClient;
  return { database, updateMany, buatNotifikasi };
}

describe("ProgramController.setujuiProgram", () => {
  it("mengaktifkan program dan memberi notifikasi ke inisiator", async () => {
    const { database, updateMany, buatNotifikasi } = buatDb(
      barisProgram("MENUNGGU_VERIFIKASI"),
    );
    const status = await new ProgramController(database).setujuiProgram("p1");
    expect(status).toBe("AKTIF");
    expect(updateMany).toHaveBeenCalledWith({
      where: { id: "p1", status: "MENUNGGU_VERIFIKASI" },
      data: { status: "AKTIF" },
    });
    expect(buatNotifikasi).toHaveBeenCalledOnce();
    expect(buatNotifikasi.mock.calls[0]![0].data.userId).toBe(
      "user-inisiator",
    );
  });

  it("NOT_FOUND kalau program tidak ada", async () => {
    const { database } = buatDb(null);
    const galat = await new ProgramController(database)
      .setujuiProgram("x")
      .catch((e: unknown) => e);
    expect(galat).toBeInstanceOf(GalatProgram);
    expect((galat as GalatProgram).code).toBe("NOT_FOUND");
  });

  it("CONFLICT kalau program sudah AKTIF, tanpa notifikasi", async () => {
    const { database, buatNotifikasi } = buatDb(barisProgram("AKTIF"));
    const galat = await new ProgramController(database)
      .setujuiProgram("p1")
      .catch((e: unknown) => e);
    expect((galat as GalatProgram).code).toBe("CONFLICT");
    expect(buatNotifikasi).not.toHaveBeenCalled();
  });

  it("CONFLICT kalau program keburu diproses verifikator lain", async () => {
    const { database, buatNotifikasi } = buatDb(
      barisProgram("MENUNGGU_VERIFIKASI"),
      0,
    );
    const galat = await new ProgramController(database)
      .setujuiProgram("p1")
      .catch((e: unknown) => e);
    expect((galat as GalatProgram).code).toBe("CONFLICT");
    expect(buatNotifikasi).not.toHaveBeenCalled();
  });
});
