import type { PrismaClient } from "@prisma/client";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("~/server/db", () => ({ db: {} }));

import {
  GalatSeleksi,
  SeleksiController,
} from "~/server/controllers/SeleksiController";

const program = {
  id: "program-1",
  namaProgram: "Penanaman Pohon",
  status: "AKTIF",
  kuota: 2,
  hasilSeleksiDiumumkanAt: null,
  inisiatorProgram: { userId: "inisiator-1" },
};

function buatController({
  programBaris = program,
  pendaftar = [],
  jumlahDiterima = 0,
}: {
  programBaris?: typeof program | null;
  pendaftar?: Array<{
    id?: string;
    status: "MENUNGGU" | "DITERIMA" | "DITOLAK";
    keterampilan?: string;
    ketersediaanWaktu?: string;
    waktuDaftar?: Date;
    relawan?: { userId: string };
  }>;
  jumlahDiterima?: number;
} = {}) {
  const pendaftaranFindMany = vi.fn().mockResolvedValue(
    pendaftar.map((baris, index) => ({
      id: baris.id ?? `pendaftaran-${index + 1}`,
      keterampilan: baris.keterampilan ?? "Menanam",
      ketersediaanWaktu: baris.ketersediaanWaktu ?? "Akhir pekan",
      waktuDaftar: baris.waktuDaftar ?? new Date("2026-11-13T10:00:00Z"),
      status: baris.status,
      relawan: baris.relawan ?? { userId: `relawan-${index + 1}` },
    })),
  );
  const pendaftaranUpdateMany = vi.fn().mockResolvedValue({ count: 1 });
  const pendaftaranCount = vi.fn().mockResolvedValue(jumlahDiterima);
  const programUpdateMany = vi.fn().mockResolvedValue({ count: 1 });
  const notifikasiCreate = vi.fn().mockResolvedValue({});
  const tx = {
    program: {
      findUnique: vi.fn().mockResolvedValue(programBaris),
      updateMany: programUpdateMany,
    },
    pendaftaran: {
      findMany: pendaftaranFindMany,
      count: pendaftaranCount,
      updateMany: pendaftaranUpdateMany,
    },
    notifikasi: { create: notifikasiCreate },
  };
  const database = {
    program: { findUnique: vi.fn().mockResolvedValue(programBaris) },
    pendaftaran: { findMany: pendaftaranFindMany },
    $transaction: vi.fn(
      async (callback: (client: typeof tx) => Promise<unknown>) => callback(tx),
    ),
  } as unknown as PrismaClient;

  return {
    controller: new SeleksiController(database),
    pendaftaranFindMany,
    pendaftaranUpdateMany,
    pendaftaranCount,
    programUpdateMany,
    notifikasiCreate,
  };
}

describe("SeleksiController (C18)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("hanya menampilkan daftar pendaftar kepada pemilik program", async () => {
    const { controller, pendaftaranFindMany } = buatController({
      programBaris: {
        ...program,
        inisiatorProgram: { userId: "pemilik-lain" },
      },
    });

    await expect(
      controller.lihatDaftarRelawan("inisiator-1", "program-1"),
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(pendaftaranFindMany).not.toHaveBeenCalled();
  });

  it("menolak keputusan yang akan melampaui kuota", async () => {
    const { controller, pendaftaranUpdateMany, pendaftaranCount } =
      buatController({
        jumlahDiterima: 1,
        pendaftar: [{ status: "MENUNGGU" }],
      });

    await expect(
      controller.simpanHasilSeleksi("inisiator-1", "program-1", [
        { idPendaftaran: "pendaftaran-1", status: "DITERIMA" },
      ]),
    ).rejects.toMatchObject({ code: "CONFLICT" });
    expect(pendaftaranCount).toHaveBeenCalled();
    expect(pendaftaranUpdateMany).not.toHaveBeenCalled();
  });

  it("menolak perubahan seleksi oleh pengguna yang bukan pemilik program", async () => {
    const { controller, pendaftaranUpdateMany } = buatController({
      programBaris: {
        ...program,
        inisiatorProgram: { userId: "pemilik-lain" },
      },
      pendaftar: [{ status: "MENUNGGU" }],
    });

    await expect(
      controller.simpanHasilSeleksi("inisiator-1", "program-1", [
        { idPendaftaran: "pendaftaran-1", status: "DITOLAK" },
      ]),
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
    expect(pendaftaranUpdateMany).not.toHaveBeenCalled();
  });

  it("menyimpan keputusan pendaftar yang masih menunggu", async () => {
    const { controller, pendaftaranUpdateMany } = buatController({
      pendaftar: [{ status: "MENUNGGU" }],
    });

    await expect(
      controller.simpanHasilSeleksi("inisiator-1", "program-1", [
        { idPendaftaran: "pendaftaran-1", status: "DITERIMA" },
      ]),
    ).resolves.toBe(true);
    expect(pendaftaranUpdateMany).toHaveBeenCalledWith({
      where: { id: "pendaftaran-1", status: "MENUNGGU" },
      data: { status: "DITERIMA" },
    });
  });

  it("mengumumkan hasil satu kali dan mengirim notifikasi ke tiap pendaftar", async () => {
    const { controller, programUpdateMany, notifikasiCreate } =
      buatController({
        pendaftar: [
          { status: "DITERIMA", relawan: { userId: "relawan-1" } },
          { status: "DITOLAK", relawan: { userId: "relawan-2" } },
        ],
      });

    await expect(
      controller.konfirmasiHasilSeleksi("inisiator-1", "program-1"),
    ).resolves.toBe(true);
    expect(programUpdateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "program-1", hasilSeleksiDiumumkanAt: null },
      }),
    );
    expect(notifikasiCreate).toHaveBeenCalledTimes(2);
    expect(notifikasiCreate).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        data: expect.objectContaining({
          userId: "relawan-1",
          pesan: expect.stringContaining("diterima"),
        }),
      }),
    );
    expect(notifikasiCreate).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        data: expect.objectContaining({
          userId: "relawan-2",
          pesan: expect.stringContaining("belum dapat diterima"),
        }),
      }),
    );
  });

  it("belum mengirim hasil jika masih ada pendaftar yang menunggu", async () => {
    const { controller, programUpdateMany, notifikasiCreate } = buatController({
      pendaftar: [{ status: "MENUNGGU" }],
    });

    await expect(
      controller.konfirmasiHasilSeleksi("inisiator-1", "program-1"),
    ).rejects.toMatchObject({ code: "CONFLICT" });
    expect(programUpdateMany).not.toHaveBeenCalled();
    expect(notifikasiCreate).not.toHaveBeenCalled();
  });

  it("tidak mengirim notifikasi ulang setelah hasil pernah diumumkan", async () => {
    const { controller, programUpdateMany, notifikasiCreate } = buatController({
      programBaris: {
        ...program,
        hasilSeleksiDiumumkanAt: new Date("2026-11-13T11:00:00Z"),
      },
      pendaftar: [{ status: "DITERIMA" }],
    });

    await expect(
      controller.konfirmasiHasilSeleksi("inisiator-1", "program-1"),
    ).rejects.toMatchObject({ code: "CONFLICT" });
    expect(programUpdateMany).not.toHaveBeenCalled();
    expect(notifikasiCreate).not.toHaveBeenCalled();
  });

  it("menolak keputusan untuk pendaftar dari program lain", async () => {
    const { controller, pendaftaranUpdateMany } = buatController();

    await expect(
      controller.simpanHasilSeleksi("inisiator-1", "program-1", [
        { idPendaftaran: "pendaftar-asing", status: "DITOLAK" },
      ]),
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(pendaftaranUpdateMany).not.toHaveBeenCalled();
  });

  it("menolak ID pendaftaran duplikat dalam satu permintaan", async () => {
    const { controller } = buatController();

    await expect(
      controller.simpanHasilSeleksi("inisiator-1", "program-1", [
        { idPendaftaran: "pendaftaran-1", status: "DITERIMA" },
        { idPendaftaran: "pendaftaran-1", status: "DITOLAK" },
      ]),
    ).rejects.toBeInstanceOf(GalatSeleksi);
  });
});
