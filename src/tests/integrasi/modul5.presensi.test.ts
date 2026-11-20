import { randomUUID } from "node:crypto";

import { afterAll, describe, expect, it } from "vitest";

import { db } from "~/server/db";
import {
  PESAN_BELUM_DITERIMA,
  PESAN_DI_LUAR_WAKTU,
  PESAN_PROGRAM_TIDAK_AKTIF,
  PESAN_SUDAH_HADIR,
  PresensiController,
} from "~/server/controllers/PresensiController";
import { ProgramController } from "~/server/controllers/ProgramController";

// Presensi dan portofolio diuji langsung ke PostgreSQL, tanpa mock.
// Setiap test membuat fixture ber-ID/email unik dan menghapusnya kembali.

const userIds: string[] = [];
const relawanIds: string[] = [];
const inisiatorIds: string[] = [];
const programIds: string[] = [];

async function buatUser(peran: "RELAWAN" | "INISIATOR" | "VERIFIKATOR") {
  const id = randomUUID();
  await db.user.create({
    data: {
      id,
      name: "Pengguna Uji Integrasi M5",
      email: "m5-" + randomUUID() + "@rekanbumi.test",
      peran,
      emailVerified: true,
    },
  });
  userIds.push(id);
  return id;
}

async function buatRelawan() {
  const userId = await buatUser("RELAWAN");
  const relawan = await db.relawan.create({
    data: {
      userId,
      nama: "Relawan Uji Integrasi M5",
      noTelepon: "081234567890",
      domisili: "Kota Bandung",
      statusVerifikasi: "TERVERIFIKASI",
    },
  });
  relawanIds.push(relawan.id);
  return relawan.id;
}

async function buatInisiator() {
  const userId = await buatUser("INISIATOR");
  const inisiator = await db.inisiatorProgram.create({
    data: {
      userId,
      namaLembaga: "Komunitas Uji Integrasi M5",
      statusVerifikasi: "TERVERIFIKASI",
    },
  });
  inisiatorIds.push(inisiator.id);
  return inisiator.id;
}

async function buatProgram(
  options: {
    status?: "AKTIF" | "MENUNGGU_KONFIRMASI" | "SELESAI";
    waktuMulai?: Date;
    waktuSelesai?: Date;
  } = {},
) {
  const sekarang = new Date();
  const inisiatorProgramId = await buatInisiator();
  const program = await db.program.create({
    data: {
      namaProgram: "Program Uji Integrasi M5 " + randomUUID().slice(0, 8),
      deskripsi: "Data khusus untuk integration test Modul 5.",
      kategori: "JAGA_ALAM",
      tempatPelaksanaan: "Kota Bandung",
      waktuMulai:
        options.waktuMulai ?? new Date(sekarang.getTime() - 60 * 60 * 1000),
      waktuSelesai:
        options.waktuSelesai ?? new Date(sekarang.getTime() + 60 * 60 * 1000),
      kuota: 10,
      syaratKetentuan: "Tidak ada syarat khusus.",
      status: options.status ?? "AKTIF",
      inisiatorProgramId,
    },
  });
  programIds.push(program.id);
  return program.id;
}

async function buatPendaftaran(
  programId: string,
  relawanId: string,
  status: "MENUNGGU" | "DITERIMA" | "DITOLAK",
) {
  return db.pendaftaran.create({
    data: {
      programId,
      relawanId,
      status,
      keterampilan: "Dokumentasi",
      ketersediaanWaktu: "Akhir pekan",
    },
  });
}

async function buatKehadiran(programId: string, relawanId: string) {
  return db.kehadiran.create({
    data: {
      programId,
      relawanId,
      waktuKehadiran: new Date(),
    },
  });
}

async function buatLaporan(programId: string) {
  return db.laporanProgram.create({
    data: {
      programId,
      ringkasanCapaian: "Kegiatan selesai dan terdokumentasi.",
      dokumentasiAkhir: ["https://example.org/dokumentasi-uji"],
    },
  });
}

afterAll(async () => {
  if (programIds.length > 0) {
    await db.riwayatProgram.deleteMany({
      where: { programId: { in: programIds } },
    });
    await db.laporanProgram.deleteMany({
      where: { programId: { in: programIds } },
    });
    await db.kehadiran.deleteMany({
      where: { programId: { in: programIds } },
    });
    await db.pendaftaran.deleteMany({
      where: { programId: { in: programIds } },
    });
    await db.program.deleteMany({ where: { id: { in: programIds } } });
  }
  if (relawanIds.length > 0) {
    await db.riwayatKontribusi.deleteMany({
      where: { relawanId: { in: relawanIds } },
    });
    await db.relawan.deleteMany({ where: { id: { in: relawanIds } } });
  }
  if (inisiatorIds.length > 0) {
    await db.inisiatorProgram.deleteMany({
      where: { id: { in: inisiatorIds } },
    });
  }
  if (userIds.length > 0) {
    await db.user.deleteMany({ where: { id: { in: userIds } } });
  }
  await db.$disconnect();
});

describe("Integrasi Modul 5 – presensi dan portofolio", () => {
  it("INT-TC40 check-in relawan diterima saat program aktif dan berlangsung tercatat di basis data", async () => {
    const relawanId = await buatRelawan();
    const programId = await buatProgram();
    await buatPendaftaran(programId, relawanId, "DITERIMA");

    const sebelum = new Date();
    const hasil = await PresensiController.prosesCheckIn(programId, relawanId);
    const sesudah = new Date();
    const baris = await db.kehadiran.findUnique({
      where: { relawanId_programId: { relawanId, programId } },
    });

    expect(baris).not.toBeNull();
    expect(hasil.getWaktuKehadiran()).toEqual(baris!.waktuKehadiran);
    expect(baris!.waktuKehadiran.getTime()).toBeGreaterThanOrEqual(
      sebelum.getTime(),
    );
    expect(baris!.waktuKehadiran.getTime()).toBeLessThanOrEqual(
      sesudah.getTime(),
    );
  });

  it("INT-TC41 pendaftaran MENUNGGU atau DITOLAK tidak dapat check-in", async () => {
    const relawanId = await buatRelawan();

    for (const status of ["MENUNGGU", "DITOLAK"] as const) {
      const programId = await buatProgram();
      await buatPendaftaran(programId, relawanId, status);

      await expect(
        PresensiController.prosesCheckIn(programId, relawanId),
      ).rejects.toThrow(PESAN_BELUM_DITERIMA);
      expect(
        await db.kehadiran.count({ where: { relawanId, programId } }),
      ).toBe(0);
    }
  });

  it("INT-TC42 check-in di luar jadwal ditolak tanpa menulis kehadiran", async () => {
    const relawanId = await buatRelawan();
    const mulaiBesok = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const programId = await buatProgram({
      waktuMulai: mulaiBesok,
      waktuSelesai: new Date(mulaiBesok.getTime() + 2 * 60 * 60 * 1000),
    });
    await buatPendaftaran(programId, relawanId, "DITERIMA");

    await expect(
      PresensiController.prosesCheckIn(programId, relawanId),
    ).rejects.toThrow(PESAN_DI_LUAR_WAKTU);
    expect(await db.kehadiran.count({ where: { relawanId, programId } })).toBe(
      0,
    );
  });

  it("INT-TC43 check-in pada program selain AKTIF ditolak", async () => {
    const relawanId = await buatRelawan();
    const programId = await buatProgram({ status: "MENUNGGU_KONFIRMASI" });
    await buatPendaftaran(programId, relawanId, "DITERIMA");

    await expect(
      PresensiController.prosesCheckIn(programId, relawanId),
    ).rejects.toThrow(PESAN_PROGRAM_TIDAK_AKTIF);
    expect(await db.kehadiran.count({ where: { relawanId, programId } })).toBe(
      0,
    );
  });

  it("INT-TC44 dua check-in bersamaan hanya menyimpan satu kehadiran", async () => {
    const relawanId = await buatRelawan();
    const programId = await buatProgram();
    await buatPendaftaran(programId, relawanId, "DITERIMA");

    const hasil = await Promise.allSettled([
      PresensiController.prosesCheckIn(programId, relawanId),
      PresensiController.prosesCheckIn(programId, relawanId),
    ]);
    const berhasil = hasil.filter((item) => item.status === "fulfilled");
    const gagal = hasil.find((item) => item.status === "rejected");

    expect(berhasil).toHaveLength(1);
    expect(gagal?.status).toBe("rejected");
    if (gagal?.status === "rejected") {
      expect(gagal.reason.message).toBe(PESAN_SUDAH_HADIR);
    }
    expect(await db.kehadiran.count({ where: { relawanId, programId } })).toBe(
      1,
    );
  });

  it("INT-TC45 persetujuan laporan program mencatat jam relawan yang hadir", async () => {
    const relawanId = await buatRelawan();
    const mulai = new Date("2026-10-01T08:00:00.000Z");
    const selesai = new Date("2026-10-01T12:00:00.000Z");
    const programId = await buatProgram({
      status: "MENUNGGU_KONFIRMASI",
      waktuMulai: mulai,
      waktuSelesai: selesai,
    });
    await buatPendaftaran(programId, relawanId, "DITERIMA");
    await db.kehadiran.create({
      data: {
        programId,
        relawanId,
        waktuKehadiran: new Date("2026-10-01T09:00:00.000Z"),
      },
    });
    const laporan = await buatLaporan(programId);
    const verifikatorId = await buatUser("VERIFIKATOR");

    await expect(
      new ProgramController(db).konfirmasiLaporan(laporan.id, verifikatorId),
    ).resolves.toBe("SELESAI");
    await expect(PresensiController.ambilTotalJamAksi(relawanId)).resolves.toBe(
      4,
    );
    await expect(
      PresensiController.ambilRiwayatProgram(relawanId),
    ).resolves.toHaveLength(1);
    expect(
      await db.program.findUniqueOrThrow({ where: { id: programId } }),
    ).toMatchObject({ status: "SELESAI" });
  });

  it("INT-TC46 relawan diterima tanpa check-in tidak mendapat jam atau riwayat", async () => {
    const relawanId = await buatRelawan();
    const programId = await buatProgram({
      status: "MENUNGGU_KONFIRMASI",
      waktuMulai: new Date("2026-10-02T08:00:00.000Z"),
      waktuSelesai: new Date("2026-10-02T12:00:00.000Z"),
    });
    await buatPendaftaran(programId, relawanId, "DITERIMA");
    const laporan = await buatLaporan(programId);
    const verifikatorId = await buatUser("VERIFIKATOR");

    await new ProgramController(db).konfirmasiLaporan(
      laporan.id,
      verifikatorId,
    );

    await expect(PresensiController.ambilTotalJamAksi(relawanId)).resolves.toBe(
      0,
    );
    await expect(
      PresensiController.ambilRiwayatProgram(relawanId),
    ).resolves.toEqual([]);
  });

  it("INT-TC47 pendaftar yang ditolak tidak mendapat kontribusi meski ada baris kehadiran", async () => {
    const relawanId = await buatRelawan();
    const programId = await buatProgram({
      status: "MENUNGGU_KONFIRMASI",
      waktuMulai: new Date("2026-10-03T08:00:00.000Z"),
      waktuSelesai: new Date("2026-10-03T12:00:00.000Z"),
    });
    await buatPendaftaran(programId, relawanId, "DITOLAK");
    await buatKehadiran(programId, relawanId);
    const laporan = await buatLaporan(programId);
    const verifikatorId = await buatUser("VERIFIKATOR");

    await new ProgramController(db).konfirmasiLaporan(
      laporan.id,
      verifikatorId,
    );

    await expect(PresensiController.ambilTotalJamAksi(relawanId)).resolves.toBe(
      0,
    );
    await expect(
      PresensiController.ambilRiwayatProgram(relawanId),
    ).resolves.toEqual([]);
  });

  it("INT-TC48 pembaruan portofolio berulang tidak menggandakan jam atau program", async () => {
    const relawanId = await buatRelawan();
    const programId = await buatProgram({
      status: "SELESAI",
      waktuMulai: new Date("2026-10-04T08:00:00.000Z"),
      waktuSelesai: new Date("2026-10-04T12:00:00.000Z"),
    });
    await buatPendaftaran(programId, relawanId, "DITERIMA");
    await buatKehadiran(programId, relawanId);

    await PresensiController.perbaruiPortofolioRelawan(programId);
    await PresensiController.perbaruiPortofolioRelawan(programId);

    await expect(PresensiController.ambilTotalJamAksi(relawanId)).resolves.toBe(
      4,
    );
    await expect(
      PresensiController.ambilRiwayatProgram(relawanId),
    ).resolves.toHaveLength(1);
  });

  it("INT-TC49 total jam dan urutan riwayat portofolio dibaca dari basis data", async () => {
    const relawanId = await buatRelawan();
    const programLama = await buatProgram({
      status: "SELESAI",
      waktuMulai: new Date("2026-10-05T08:00:00.000Z"),
      waktuSelesai: new Date("2026-10-05T10:00:00.000Z"),
    });
    const programBaru = await buatProgram({
      status: "SELESAI",
      waktuMulai: new Date("2026-10-06T08:00:00.000Z"),
      waktuSelesai: new Date("2026-10-06T12:00:00.000Z"),
    });
    await buatPendaftaran(programLama, relawanId, "DITERIMA");
    await buatPendaftaran(programBaru, relawanId, "DITERIMA");
    await buatKehadiran(programLama, relawanId);
    await buatKehadiran(programBaru, relawanId);
    await PresensiController.perbaruiPortofolioRelawan(programLama);
    await PresensiController.perbaruiPortofolioRelawan(programBaru);

    await expect(PresensiController.ambilTotalJamAksi(relawanId)).resolves.toBe(
      6,
    );
    const riwayat = await PresensiController.ambilRiwayatProgram(relawanId);
    expect(riwayat.map((program) => program.getIdProgram())).toEqual([
      programBaru,
      programLama,
    ]);
  });
});
