import { Prisma } from "@prisma/client";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Database palsu di memori untuk alur pembaruan portofolio.
const { dbPalsu, tabel } = vi.hoisted(() => {
  type Baris = Record<string, unknown>;
  const tabel = {
    program: [] as Baris[],
    inisiator: [] as Baris[],
    pendaftaran: [] as {
      relawanId: string;
      programId: string;
      status: string;
    }[],
    relawan: [] as Baris[],
    kehadiran: [] as {
      id: string;
      relawanId: string;
      programId: string;
      waktuKehadiran: Date;
    }[],
    riwayat: [] as { id: string; relawanId: string; totalJamAksi: number }[],
    riwayatProgram: [] as { riwayatId: string; programId: string }[],
  };

  const programLengkap = (id: string): Baris => {
    const program = tabel.program.find((p) => p.id === id)!;
    const inisiator = tabel.inisiator.find(
      (i) => i.id === program.inisiatorProgramId,
    )!;
    return {
      ...program,
      inisiatorProgram: { ...inisiator, user: { email: "lembaga@test" } },
    };
  };

  const relawanLengkap = (id: string) => {
    const relawan = tabel.relawan.find((r) => r.id === id);
    if (!relawan) return null;
    const riwayat = tabel.riwayat.find((r) => r.relawanId === id);
    return {
      ...relawan,
      user: { email: `${id}@test`, createdAt: new Date("2026-03-01") },
      kehadiran: tabel.kehadiran.filter((k) => k.relawanId === id),
      riwayatKontribusi: riwayat
        ? {
            ...riwayat,
            programSelesai: tabel.riwayatProgram
              .filter((rp) => rp.riwayatId === riwayat.id)
              .map((rp) => ({ ...rp, program: programLengkap(rp.programId) }))
              .sort(
                (a, b) =>
                  (b.program.waktuSelesai as Date).getTime() -
                  (a.program.waktuSelesai as Date).getTime(),
              ),
          }
        : null,
    };
  };

  const dbPalsu = {
    program: {
      findUnique: async ({ where }: { where: { id: string } }) => {
        const program = tabel.program.find((p) => p.id === where.id);
        if (!program) return null;
        return {
          ...program,
          pendaftaran: tabel.pendaftaran
            .filter((p) => p.programId === where.id && p.status === "DITERIMA")
            .map((p) => ({ ...p, relawan: relawanLengkap(p.relawanId)! })),
        };
      },
    },
    relawan: {
      findUnique: async ({ where }: { where: { id: string } }) =>
        relawanLengkap(where.id),
    },
    riwayatKontribusi: {
      upsert: async ({
        where,
        create,
        update,
      }: {
        where: { relawanId: string };
        create: { relawanId: string; totalJamAksi: number };
        update: { totalJamAksi: { increment: number } };
      }) => {
        const ada = tabel.riwayat.find((r) => r.relawanId === where.relawanId);
        if (ada) {
          ada.totalJamAksi += update.totalJamAksi.increment;
          return ada;
        }
        const baru = { id: `riwayat-${tabel.riwayat.length + 1}`, ...create };
        tabel.riwayat.push(baru);
        return baru;
      },
    },
    riwayatProgram: {
      create: async ({
        data,
      }: {
        data: { riwayatId: string; programId: string };
      }) => {
        const dobel = tabel.riwayatProgram.some(
          (rp) =>
            rp.riwayatId === data.riwayatId && rp.programId === data.programId,
        );
        if (dobel) {
          throw new Prisma.PrismaClientKnownRequestError("Unique constraint", {
            code: "P2002",
            clientVersion: "6.19.3",
          });
        }
        tabel.riwayatProgram.push(data);
        return data;
      },
    },
    $transaction: async <T>(fn: (tx: unknown) => Promise<T>) => fn(dbPalsu),
  };
  return { dbPalsu, tabel };
});

vi.mock("~/server/db", () => ({ db: dbPalsu }));

import { GalatValidasi } from "~/lib/galat";
import {
  PESAN_PROGRAM_BELUM_SELESAI,
  PESAN_PROGRAM_TIDAK_ADA,
  PresensiController,
} from "~/server/controllers/PresensiController";

const PROGRAM = "program-pantai";
const HADIR = "relawan-hadir";
const ABSEN = "relawan-absen";
const BARU = "relawan-baru";

function relawan(id: string) {
  return {
    id,
    userId: `user-${id}`,
    nama: id,
    noTelepon: "0812",
    domisili: "Bandung",
    statusVerifikasi: "TERVERIFIKASI",
    totalJamAksi: 0,
  };
}

function program(id: string, status: string, mulai: string, selesai: string) {
  return {
    id,
    namaProgram: `Program ${id}`,
    deskripsi: "-",
    kategori: "JAGA_ALAM",
    tempatPelaksanaan: "Pantai",
    waktuMulai: new Date(mulai),
    waktuSelesai: new Date(selesai),
    kuota: 10,
    syaratKetentuan: "-",
    status,
    inisiatorProgramId: "lembaga-1",
  };
}

function hadir(relawanId: string, programId: string) {
  tabel.kehadiran.push({
    id: `hadir-${tabel.kehadiran.length + 1}`,
    relawanId,
    programId,
    waktuKehadiran: new Date(),
  });
}

beforeEach(() => {
  tabel.inisiator = [
    {
      id: "lembaga-1",
      userId: "user-lembaga",
      namaLembaga: "Komunitas Pantai Lestari",
      tautanSitusResmi: null,
      statusVerifikasi: "TERVERIFIKASI",
    },
  ];
  // 4 jam
  tabel.program = [
    program(
      PROGRAM,
      "SELESAI",
      "2026-11-07T01:00:00.000Z",
      "2026-11-07T05:00:00.000Z",
    ),
  ];
  tabel.relawan = [relawan(HADIR), relawan(ABSEN), relawan(BARU)];
  tabel.pendaftaran = [HADIR, ABSEN, BARU].map((relawanId) => ({
    relawanId,
    programId: PROGRAM,
    status: "DITERIMA",
  }));
  tabel.kehadiran = [];
  // HADIR dan ABSEN sudah punya riwayat dari seed, BARU belum.
  tabel.riwayat = [
    { id: "riwayat-hadir", relawanId: HADIR, totalJamAksi: 3 },
    { id: "riwayat-absen", relawanId: ABSEN, totalJamAksi: 0 },
  ];
  tabel.riwayatProgram = [];
});

describe("PresensiController.perbaruiPortofolioRelawan", () => {
  it("relawan yang hadir dapat jam aksi sesuai durasi program", async () => {
    hadir(HADIR, PROGRAM);
    await PresensiController.perbaruiPortofolioRelawan(PROGRAM);

    await expect(PresensiController.ambilTotalJamAksi(HADIR)).resolves.toBe(7);
    expect(tabel.riwayatProgram).toEqual([
      { riwayatId: "riwayat-hadir", programId: PROGRAM },
    ]);
  });

  it("relawan yang tidak hadir tidak dapat jam aksi", async () => {
    hadir(HADIR, PROGRAM);
    await PresensiController.perbaruiPortofolioRelawan(PROGRAM);

    await expect(PresensiController.ambilTotalJamAksi(ABSEN)).resolves.toBe(0);
    await expect(
      PresensiController.ambilRiwayatProgram(ABSEN),
    ).resolves.toEqual([]);
  });

  it("relawan diterima yang belum punya riwayat dibuatkan riwayat baru", async () => {
    hadir(BARU, PROGRAM);
    expect(tabel.riwayat.some((r) => r.relawanId === BARU)).toBe(false);

    await PresensiController.perbaruiPortofolioRelawan(PROGRAM);

    const riwayatBaru = tabel.riwayat.find((r) => r.relawanId === BARU);
    expect(riwayatBaru?.totalJamAksi).toBe(4);
    await expect(PresensiController.ambilTotalJamAksi(BARU)).resolves.toBe(4);
  });

  it("dipanggil dua kali tidak menambah jam dua kali", async () => {
    hadir(HADIR, PROGRAM);
    await PresensiController.perbaruiPortofolioRelawan(PROGRAM);
    await PresensiController.perbaruiPortofolioRelawan(PROGRAM);

    await expect(PresensiController.ambilTotalJamAksi(HADIR)).resolves.toBe(7);
    expect(tabel.riwayatProgram).toHaveLength(1);
  });

  it("pendaftar yang tidak diterima dilewati walaupun tercatat hadir", async () => {
    tabel.pendaftaran[0]!.status = "DITOLAK";
    hadir(HADIR, PROGRAM);
    await PresensiController.perbaruiPortofolioRelawan(PROGRAM);

    await expect(PresensiController.ambilTotalJamAksi(HADIR)).resolves.toBe(3);
  });

  it("menolak program yang belum selesai", async () => {
    tabel.program[0]!.status = "MENUNGGU_KONFIRMASI";
    hadir(HADIR, PROGRAM);

    const janji = PresensiController.perbaruiPortofolioRelawan(PROGRAM);
    await expect(janji).rejects.toBeInstanceOf(GalatValidasi);
    await expect(janji).rejects.toThrow(PESAN_PROGRAM_BELUM_SELESAI);
    expect(tabel.riwayatProgram).toEqual([]);
  });

  it("menolak program yang tidak ada", async () => {
    await expect(
      PresensiController.perbaruiPortofolioRelawan("tidak-ada"),
    ).rejects.toThrow(PESAN_PROGRAM_TIDAK_ADA);
  });

  it("memakai transaksi pemanggil kalau tx diberikan", async () => {
    hadir(HADIR, PROGRAM);
    const bukaTransaksi = vi.spyOn(dbPalsu, "$transaction");

    await PresensiController.perbaruiPortofolioRelawan(
      PROGRAM,
      dbPalsu as unknown as Prisma.TransactionClient,
    );

    expect(bukaTransaksi).not.toHaveBeenCalled();
    await expect(PresensiController.ambilTotalJamAksi(HADIR)).resolves.toBe(7);
    bukaTransaksi.mockRestore();
  });

  it("membuka transaksi sendiri kalau tx tidak diberikan", async () => {
    hadir(HADIR, PROGRAM);
    const bukaTransaksi = vi.spyOn(dbPalsu, "$transaction");

    await PresensiController.perbaruiPortofolioRelawan(PROGRAM);

    expect(bukaTransaksi).toHaveBeenCalledTimes(1);
    bukaTransaksi.mockRestore();
  });
});

describe("PresensiController.ambilRiwayatProgram", () => {
  it("berisi program yang dihadiri, paling baru di atas", async () => {
    tabel.program.push(
      program(
        "program-hutan",
        "SELESAI",
        "2026-11-08T01:00:00.000Z",
        "2026-11-08T03:30:00.000Z",
      ),
    );
    tabel.pendaftaran.push({
      relawanId: HADIR,
      programId: "program-hutan",
      status: "DITERIMA",
    });
    hadir(HADIR, PROGRAM);
    hadir(HADIR, "program-hutan");

    await PresensiController.perbaruiPortofolioRelawan(PROGRAM);
    await PresensiController.perbaruiPortofolioRelawan("program-hutan");

    const daftar = await PresensiController.ambilRiwayatProgram(HADIR);
    expect(daftar.map((p) => p.getIdProgram())).toEqual([
      "program-hutan",
      PROGRAM,
    ]);
    expect(daftar[0]!.ambilPengelola().getNamaLembaga()).toBe(
      "Komunitas Pantai Lestari",
    );
    await expect(PresensiController.ambilTotalJamAksi(HADIR)).resolves.toBe(
      9.5,
    );
  });

  it("relawan tanpa riwayat mendapat daftar kosong dan nol jam", async () => {
    await expect(PresensiController.ambilRiwayatProgram(BARU)).resolves.toEqual(
      [],
    );
    await expect(PresensiController.ambilTotalJamAksi(BARU)).resolves.toBe(0);
  });
});
