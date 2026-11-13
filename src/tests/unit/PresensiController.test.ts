import { Prisma } from "@prisma/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Database palsu di memori: cukup untuk alur check-in.
const { dbPalsu, tabel } = vi.hoisted(() => {
  type BarisKehadiran = {
    id: string;
    waktuKehadiran: Date;
    relawanId: string;
    programId: string;
  };
  const tabel = {
    program: [] as Record<string, unknown>[],
    pendaftaran: [] as {
      programId: string;
      relawanId: string;
      status: string;
    }[],
    relawan: [] as Record<string, unknown>[],
    kehadiran: [] as BarisKehadiran[],
    tabrakanUnik: false,
  };
  const dbPalsu = {
    program: {
      findUnique: async ({ where }: { where: { id: string } }) =>
        tabel.program.find((p) => p.id === where.id) ?? null,
    },
    pendaftaran: {
      findFirst: async ({
        where,
      }: {
        where: { programId: string; relawanId: string };
      }) => {
        const baris = tabel.pendaftaran.find(
          (p) =>
            p.programId === where.programId && p.relawanId === where.relawanId,
        );
        return baris
          ? {
              id: "daftar-1",
              keterampilan: "-",
              ketersediaanWaktu: "-",
              waktuDaftar: new Date(),
              ...baris,
            }
          : null;
      },
    },
    relawan: {
      findUnique: async ({ where }: { where: { id: string } }) => {
        const baris = tabel.relawan.find((r) => r.id === where.id);
        if (!baris) return null;
        return {
          ...baris,
          user: { email: "relawan@rekanbumi.test" },
          kehadiran: tabel.kehadiran.filter((k) => k.relawanId === where.id),
        };
      },
    },
    kehadiran: {
      create: async ({
        data,
      }: {
        data: { relawanId: string; programId: string };
      }) => {
        if (tabel.tabrakanUnik) {
          throw new Prisma.PrismaClientKnownRequestError("Unique constraint", {
            code: "P2002",
            clientVersion: "6.19.3",
          });
        }
        const baris = {
          id: `hadir-${tabel.kehadiran.length + 1}`,
          waktuKehadiran: new Date(),
          ...data,
        };
        tabel.kehadiran.push(baris);
        return baris;
      },
    },
  };
  return { dbPalsu, tabel };
});

vi.mock("~/server/db", () => ({ db: dbPalsu }));

import { GalatValidasi } from "~/lib/galat";
import {
  PESAN_BELUM_DITERIMA,
  PESAN_DI_LUAR_WAKTU,
  PESAN_SUDAH_HADIR,
  PresensiController,
} from "~/server/controllers/PresensiController";

const PROGRAM = "program-1";
const RELAWAN = "relawan-1";
const MULAI = new Date("2026-12-05T08:00:00.000Z");
const SELESAI = new Date("2026-12-05T12:00:00.000Z");
const SAAT_KEGIATAN = new Date("2026-12-05T09:30:00.000Z");

function aturStatusPendaftaran(status: string) {
  tabel.pendaftaran = [{ programId: PROGRAM, relawanId: RELAWAN, status }];
}

async function harapGalat(janji: Promise<unknown>, pesan: string) {
  const galat = await janji.catch((e: unknown) => e);
  expect(galat).toBeInstanceOf(GalatValidasi);
  expect((galat as GalatValidasi).daftarGalat).toEqual([pesan]);
}

beforeEach(() => {
  tabel.program = [
    {
      id: PROGRAM,
      namaProgram: "Tanam Mangrove",
      deskripsi: "-",
      kategori: "JAGA_ALAM",
      tempatPelaksanaan: "Muara Angke",
      waktuMulai: MULAI,
      waktuSelesai: SELESAI,
      kuota: 10,
      syaratKetentuan: "-",
      status: "AKTIF",
    },
  ];
  tabel.relawan = [
    {
      id: RELAWAN,
      userId: "user-1",
      nama: "Ayu",
      noTelepon: "0812",
      domisili: "Bandung",
      statusVerifikasi: "TERVERIFIKASI",
      totalJamAksi: 0,
    },
  ];
  tabel.kehadiran = [];
  tabel.tabrakanUnik = false;
  aturStatusPendaftaran("DITERIMA");
});

afterEach(() => {
  vi.useRealTimers();
});

describe("PresensiController.validasiStatusRelawan", () => {
  it("true kalau pendaftaran sudah diterima", async () => {
    await expect(
      PresensiController.validasiStatusRelawan(PROGRAM, RELAWAN),
    ).resolves.toBe(true);
  });

  it("false kalau pendaftaran masih menunggu atau ditolak", async () => {
    aturStatusPendaftaran("MENUNGGU");
    await expect(
      PresensiController.validasiStatusRelawan(PROGRAM, RELAWAN),
    ).resolves.toBe(false);
    aturStatusPendaftaran("DITOLAK");
    await expect(
      PresensiController.validasiStatusRelawan(PROGRAM, RELAWAN),
    ).resolves.toBe(false);
  });

  it("false kalau relawan tidak mendaftar di program itu", async () => {
    tabel.pendaftaran = [];
    await expect(
      PresensiController.validasiStatusRelawan(PROGRAM, RELAWAN),
    ).resolves.toBe(false);
  });
});

describe("PresensiController.validasiWaktuPelaksanaan", () => {
  it("true tepat di waktu mulai dan waktu selesai", async () => {
    await expect(
      PresensiController.validasiWaktuPelaksanaan(PROGRAM, MULAI),
    ).resolves.toBe(true);
    await expect(
      PresensiController.validasiWaktuPelaksanaan(PROGRAM, SELESAI),
    ).resolves.toBe(true);
  });

  it("false sedetik sebelum mulai dan sedetik sesudah selesai", async () => {
    await expect(
      PresensiController.validasiWaktuPelaksanaan(
        PROGRAM,
        new Date(MULAI.getTime() - 1000),
      ),
    ).resolves.toBe(false);
    await expect(
      PresensiController.validasiWaktuPelaksanaan(
        PROGRAM,
        new Date(SELESAI.getTime() + 1000),
      ),
    ).resolves.toBe(false);
  });

  it("false kalau program tidak ada", async () => {
    await expect(
      PresensiController.validasiWaktuPelaksanaan("tidak-ada", SAAT_KEGIATAN),
    ).resolves.toBe(false);
  });
});

describe("PresensiController.ambilKeteranganWaktu", () => {
  it("menyesuaikan dengan waktu sekarang", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(MULAI.getTime() - 60_000));
    await expect(
      PresensiController.ambilKeteranganWaktu(PROGRAM),
    ).resolves.toBe("Belum dimulai");
    vi.setSystemTime(new Date(SELESAI.getTime() + 60_000));
    await expect(
      PresensiController.ambilKeteranganWaktu(PROGRAM),
    ).resolves.toBe("Sudah selesai");
  });
});

describe("PresensiController.prosesCheckIn", () => {
  it("mencatat kehadiran kalau diterima dan masih dalam waktu kegiatan", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(SAAT_KEGIATAN);
    const kehadiran = await PresensiController.prosesCheckIn(PROGRAM, RELAWAN);
    expect(tabel.kehadiran).toHaveLength(1);
    expect(tabel.kehadiran[0]).toMatchObject({
      relawanId: RELAWAN,
      programId: PROGRAM,
    });
    expect(kehadiran.getIdKehadiran()).toBe("hadir-1");
  });

  it("ditolak kalau relawan belum diterima", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(SAAT_KEGIATAN);
    aturStatusPendaftaran("MENUNGGU");
    await harapGalat(
      PresensiController.prosesCheckIn(PROGRAM, RELAWAN),
      PESAN_BELUM_DITERIMA,
    );
    expect(tabel.kehadiran).toHaveLength(0);
  });

  it("ditolak kalau di luar waktu pelaksanaan", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(SELESAI.getTime() + 60_000));
    await harapGalat(
      PresensiController.prosesCheckIn(PROGRAM, RELAWAN),
      PESAN_DI_LUAR_WAKTU,
    );
    expect(tabel.kehadiran).toHaveLength(0);
  });

  it("ditolak kalau sudah pernah check-in di program yang sama", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(SAAT_KEGIATAN);
    await PresensiController.prosesCheckIn(PROGRAM, RELAWAN);
    await harapGalat(
      PresensiController.prosesCheckIn(PROGRAM, RELAWAN),
      PESAN_SUDAH_HADIR,
    );
    expect(tabel.kehadiran).toHaveLength(1);
  });

  it("check-in yang bertabrakan di database tetap dianggap sudah hadir", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(SAAT_KEGIATAN);
    tabel.tabrakanUnik = true;
    await harapGalat(
      PresensiController.prosesCheckIn(PROGRAM, RELAWAN),
      PESAN_SUDAH_HADIR,
    );
  });
});
