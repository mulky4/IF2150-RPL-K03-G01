import { randomUUID } from "node:crypto";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import {
  GalatProgram,
  ProgramController,
} from "~/server/controllers/ProgramController";
import { db } from "~/server/db";

// Uji integrasi Modul 2, eksplorasi program (HIUPL 4.3): ProgramController (C15) memakai
// Program (C01), InisiatorProgram (C05), dan LaporanProgram (C09) dengan PostgreSQL sungguhan,
// tanpa mock. INT-TC19 juga lewat HTTP, jadi butuh `pnpm dev` di NEXT_PUBLIC_APP_URL.
// Setiap test memakai kata kunci acak di nama program supaya hasil pencarian tidak
// tercampur data seed, dan semua data uji dihapus di akhir.

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const kontroler = new ProgramController();
const awalan = `m2${randomUUID().slice(0, 8)}`;
const idPenggunaDibuat: string[] = [];

type StatusProgram =
  | "MENUNGGU_VERIFIKASI"
  | "AKTIF"
  | "MENUNGGU_KONFIRMASI"
  | "PERLU_REVISI"
  | "SELESAI";

async function buatInisiator(
  opsi: {
    terverifikasi?: boolean;
    tautan?: string | null;
  } = {},
) {
  const id = randomUUID();
  await db.user.create({
    data: {
      id,
      name: `${awalan} inisiator`,
      email: `${awalan}-${id.slice(0, 6)}@rekanbumi.test`,
      peran: "INISIATOR",
    },
  });
  idPenggunaDibuat.push(id);
  return db.inisiatorProgram.create({
    data: {
      namaLembaga: `Lembaga ${awalan}`,
      tautanSitusResmi:
        opsi.tautan === undefined ? "https://hijau.example" : opsi.tautan,
      statusVerifikasi:
        opsi.terverifikasi === false ? "MENUNGGU" : "TERVERIFIKASI",
      userId: id,
    },
  });
}

async function buatProgram(
  idInisiator: string,
  ubah: {
    nama?: string;
    deskripsi?: string;
    kategori?: "JAGA_ALAM" | "JAGA_IKLIM";
    status?: StatusProgram;
    kuota?: number;
    waktuMulai?: Date;
    waktuSelesai?: Date;
  } = {},
) {
  return db.program.create({
    data: {
      namaProgram: ubah.nama ?? `Program ${awalan}`,
      deskripsi: ubah.deskripsi ?? "Program uji integrasi eksplorasi.",
      kategori: ubah.kategori ?? "JAGA_ALAM",
      tempatPelaksanaan: "Bandung",
      waktuMulai: ubah.waktuMulai ?? new Date("2030-01-10T08:00:00Z"),
      waktuSelesai: ubah.waktuSelesai ?? new Date("2030-01-10T12:00:00Z"),
      kuota: ubah.kuota ?? 10,
      syaratKetentuan: "Tidak ada syarat khusus.",
      status: ubah.status ?? "AKTIF",
      inisiatorProgramId: idInisiator,
    },
  });
}

async function buatRelawanDiterima(
  idProgram: string,
  status: "DITERIMA" | "MENUNGGU" | "DITOLAK",
) {
  const id = randomUUID();
  await db.user.create({
    data: {
      id,
      name: `${awalan} relawan`,
      email: `${awalan}-r-${id.slice(0, 6)}@rekanbumi.test`,
      peran: "RELAWAN",
    },
  });
  idPenggunaDibuat.push(id);
  const relawan = await db.relawan.create({
    data: {
      nama: `Relawan ${awalan}`,
      userId: id,
      statusVerifikasi: "TERVERIFIKASI",
    },
  });
  await db.pendaftaran.create({
    data: {
      keterampilan: "P3K",
      ketersediaanWaktu: "Penuh",
      status,
      relawanId: relawan.id,
      programId: idProgram,
    },
  });
}

async function galatDari(janji: Promise<unknown>): Promise<unknown> {
  try {
    await janji;
  } catch (galat) {
    return galat;
  }
  throw new Error("Seharusnya melempar galat");
}

beforeAll(async () => {
  // Pastikan basis data terhubung dan terisi migrasi sebelum test pertama berjalan.
  await db.program.count();
});

afterAll(async () => {
  const inisiator = await db.inisiatorProgram.findMany({
    where: { userId: { in: idPenggunaDibuat } },
    select: { id: true },
  });
  const programs = await db.program.findMany({
    where: { inisiatorProgramId: { in: inisiator.map((i) => i.id) } },
    select: { id: true },
  });
  const idProgram = programs.map((p) => p.id);
  await db.pendaftaran.deleteMany({ where: { programId: { in: idProgram } } });
  await db.program.deleteMany({ where: { id: { in: idProgram } } });
  await db.user.deleteMany({ where: { id: { in: idPenggunaDibuat } } });
  await db.$disconnect();
});

describe("Integrasi Modul 2 – pencarian program (C15 → DB)", () => {
  it("INT-TC10 cariProgram hanya mengembalikan program AKTIF", async () => {
    const ini = await buatInisiator();
    const kata = `${awalan}aktif`;
    const aktif = await buatProgram(ini.id, {
      nama: `Tanam ${kata}`,
      status: "AKTIF",
    });
    await buatProgram(ini.id, {
      nama: `Tanam ${kata} menunggu`,
      status: "MENUNGGU_VERIFIKASI",
    });
    await buatProgram(ini.id, {
      nama: `Tanam ${kata} selesai`,
      status: "SELESAI",
    });
    await buatProgram(ini.id, {
      nama: `Tanam ${kata} revisi`,
      status: "PERLU_REVISI",
    });

    const hasil = await kontroler.cariProgram(kata, null, 24);

    expect(hasil.daftar.map((p) => p.idProgram)).toEqual([aktif.id]);
    expect(hasil.adaLagi).toBe(false);
  });

  it("INT-TC11 kata kunci dicocokkan ke nama dan deskripsi tanpa membedakan huruf", async () => {
    const ini = await buatInisiator();
    const kata = `${awalan}Mangrove`;
    const lewatNama = await buatProgram(ini.id, { nama: `Tanam ${kata}` });
    const lewatDeskripsi = await buatProgram(ini.id, {
      nama: `Program lain ${awalan}`,
      deskripsi: `Kegiatan menanam ${kata.toUpperCase()} di pesisir.`,
    });
    await buatProgram(ini.id, { nama: `Program tanpa kata kunci ${awalan}` });

    const hasil = await kontroler.cariProgram(
      `  ${kata.toLowerCase()}  `,
      null,
      24,
    );

    expect(hasil.daftar.map((p) => p.idProgram).sort()).toEqual(
      [lewatNama.id, lewatDeskripsi.id].sort(),
    );
  });

  it("INT-TC12 filter kategori dan gabungan kata kunci dengan kategori", async () => {
    const ini = await buatInisiator();
    const kata = `${awalan}kategori`;
    const alam = await buatProgram(ini.id, {
      nama: `Alam ${kata}`,
      kategori: "JAGA_ALAM",
    });
    const iklim = await buatProgram(ini.id, {
      nama: `Iklim ${kata}`,
      kategori: "JAGA_IKLIM",
    });

    const semua = await kontroler.cariProgram(kata, null, 24);
    const hanyaIklim = await kontroler.cariProgram(kata, "JAGA_IKLIM", 24);
    const hanyaAlam = await kontroler.cariProgram(kata, "JAGA_ALAM", 24);

    expect(semua.daftar.map((p) => p.idProgram).sort()).toEqual(
      [alam.id, iklim.id].sort(),
    );
    expect(hanyaIklim.daftar.map((p) => p.idProgram)).toEqual([iklim.id]);
    expect(hanyaAlam.daftar.map((p) => p.idProgram)).toEqual([alam.id]);
  });

  it("INT-TC13 kata kunci yang tidak cocok mengembalikan daftar kosong", async () => {
    const hasil = await kontroler.cariProgram(
      `${awalan}tidak-ada-yang-cocok`,
      null,
      24,
    );
    expect(hasil).toEqual({ daftar: [], adaLagi: false });
  });

  it("INT-TC14 batas hasil, penanda adaLagi, dan urutan waktu mulai", async () => {
    const ini = await buatInisiator();
    const kata = `${awalan}batas`;
    const kedua = await buatProgram(ini.id, {
      nama: `B kedua ${kata}`,
      waktuMulai: new Date("2030-03-02T08:00:00Z"),
      waktuSelesai: new Date("2030-03-02T12:00:00Z"),
    });
    const pertama = await buatProgram(ini.id, {
      nama: `A pertama ${kata}`,
      waktuMulai: new Date("2030-03-01T08:00:00Z"),
      waktuSelesai: new Date("2030-03-01T12:00:00Z"),
    });
    await buatProgram(ini.id, {
      nama: `C ketiga ${kata}`,
      waktuMulai: new Date("2030-03-03T08:00:00Z"),
      waktuSelesai: new Date("2030-03-03T12:00:00Z"),
    });

    const duaPertama = await kontroler.cariProgram(kata, null, 2);
    const semua = await kontroler.cariProgram(kata, null, 3);

    expect(duaPertama.daftar.map((p) => p.idProgram)).toEqual([
      pertama.id,
      kedua.id,
    ]);
    expect(duaPertama.adaLagi).toBe(true);
    expect(semua.daftar).toHaveLength(3);
    expect(semua.adaLagi).toBe(false);
  });
});

describe("Integrasi Modul 2 – detail program (C15 → C01 → C05 → DB)", () => {
  it("INT-TC15 ambilDetailProgram menggabungkan program, lembaga, dan jumlah relawan diterima", async () => {
    const ini = await buatInisiator({
      tautan: "https://hijau.example/tentang",
    });
    const program = await buatProgram(ini.id, {
      nama: `Detail ${awalan}`,
      kuota: 3,
      waktuMulai: new Date("2030-02-10T08:00:00Z"),
      waktuSelesai: new Date("2030-02-10T12:00:00Z"),
    });
    await buatRelawanDiterima(program.id, "DITERIMA");
    await buatRelawanDiterima(program.id, "DITERIMA");
    await buatRelawanDiterima(program.id, "MENUNGGU");
    await buatRelawanDiterima(program.id, "DITOLAK");

    const detail = await kontroler.ambilDetailProgram(program.id);

    expect(detail).toMatchObject({
      idProgram: program.id,
      namaProgram: `Detail ${awalan}`,
      namaLembaga: `Lembaga ${awalan}`,
      lembagaTerverifikasi: true,
      status: "AKTIF",
      kuota: 3,
      jumlahDiterima: 2,
      kuotaTersedia: true,
      tahapWaktu: "BELUM_DIMULAI",
      keteranganWaktu: "Belum dimulai",
      bisaDaftar: true,
      tautanSitusResmi: "https://hijau.example/tentang",
      capaian: null,
    });
  });

  it("INT-TC16 ambilDetailProgram menolak program yang tidak ada dan program MENUNGGU_VERIFIKASI", async () => {
    const ini = await buatInisiator();
    const menunggu = await buatProgram(ini.id, {
      status: "MENUNGGU_VERIFIKASI",
    });

    const tidakAda = await galatDari(
      kontroler.ambilDetailProgram(`tidak-ada-${awalan}`),
    );
    const belumDisetujui = await galatDari(
      kontroler.ambilDetailProgram(menunggu.id),
    );

    expect(tidakAda).toBeInstanceOf(GalatProgram);
    expect((tidakAda as GalatProgram).code).toBe("NOT_FOUND");
    expect(belumDisetujui).toBeInstanceOf(GalatProgram);
    expect((belumDisetujui as GalatProgram).code).toBe("NOT_FOUND");
  });

  it("INT-TC17 tautan situs resmi kosong atau bukan http/https dikembalikan sebagai null", async () => {
    const tanpaSitus = await buatInisiator({ tautan: null });
    const berbahaya = await buatInisiator({ tautan: "javascript:alert(1)" });
    const programTanpaSitus = await buatProgram(tanpaSitus.id);
    const programBerbahaya = await buatProgram(berbahaya.id);

    const detailTanpaSitus = await kontroler.ambilDetailProgram(
      programTanpaSitus.id,
    );
    const detailBerbahaya = await kontroler.ambilDetailProgram(
      programBerbahaya.id,
    );

    expect(detailTanpaSitus.tautanSitusResmi).toBeNull();
    expect(detailBerbahaya.tautanSitusResmi).toBeNull();
  });

  it("INT-TC18 program SELESAI menampilkan capaian dari laporan yang disetujui", async () => {
    const ini = await buatInisiator();
    const selesai = await buatProgram(ini.id, {
      nama: `Selesai ${awalan}`,
      status: "SELESAI",
      waktuMulai: new Date("2026-01-10T08:00:00Z"),
      waktuSelesai: new Date("2026-01-10T12:00:00Z"),
    });
    const tanpaLaporan = await buatProgram(ini.id, { status: "SELESAI" });
    await db.laporanProgram.create({
      data: {
        programId: selesai.id,
        ringkasanCapaian: "Seribu bibit mangrove ditanam.",
        dokumentasiAkhir: ["https://contoh.id/foto-1.jpg"],
        statusPeninjauan: "DITOLAK",
        catatanRevisi: "Lengkapi foto.",
      },
    });
    await db.laporanProgram.create({
      data: {
        programId: selesai.id,
        ringkasanCapaian: "Seribu bibit mangrove ditanam.",
        dokumentasiAkhir: [
          "https://contoh.id/foto-1.jpg",
          "https://contoh.id/foto-2.jpg",
        ],
        statusPeninjauan: "DISETUJUI",
      },
    });

    const detail = await kontroler.ambilDetailProgram(selesai.id);
    const detailTanpaLaporan = await kontroler.ambilDetailProgram(
      tanpaLaporan.id,
    );

    expect(detail.tahapWaktu).toBe("SELESAI");
    expect(detail.bisaDaftar).toBe(false);
    expect(detail.capaian).toEqual({
      ringkasan: "Seribu bibit mangrove ditanam.",
      dokumentasi: [
        "https://contoh.id/foto-1.jpg",
        "https://contoh.id/foto-2.jpg",
      ],
    });
    expect(detailTanpaLaporan.capaian).toBeNull();
  });
});

describe("Integrasi Modul 2 – HTTP (C16 → tRPC → C15 → DB)", () => {
  beforeAll(async () => {
    const cek = await fetch(`${BASE_URL}/api/auth/ok`).catch(() => null);
    if (!cek?.ok) {
      throw new Error(
        `Server tidak berjalan di ${BASE_URL}. Jalankan \`pnpm dev\` dulu.`,
      );
    }
  });

  const kueri = (prosedur: string, masukan: unknown) =>
    fetch(
      `${BASE_URL}/api/trpc/${prosedur}?input=${encodeURIComponent(JSON.stringify({ json: masukan }))}`,
    );

  it("INT-TC19 program.cari dan program.detail bisa dipanggil tanpa login, program.createProgram ditolak tanpa login", async () => {
    const ini = await buatInisiator();
    const kata = `${awalan}http`;
    const program = await buatProgram(ini.id, { nama: `Tanam ${kata}` });

    const cari = await kueri("program.cari", {
      kataKunci: kata,
      kategori: null,
      batas: 24,
    });
    const isiCari = (await cari.json()) as {
      result: {
        data: { json: { daftar: { idProgram: string }[]; adaLagi: boolean } };
      };
    };
    const detail = await kueri("program.detail", { idProgram: program.id });
    const isiDetail = (await detail.json()) as {
      result: {
        data: { json: { namaProgram: string; tautanSitusResmi: string } };
      };
    };
    const tidakAda = await kueri("program.detail", {
      idProgram: `tidak-ada-${awalan}`,
    });
    const buat = await fetch(`${BASE_URL}/api/trpc/program.createProgram`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ json: {} }),
    });

    expect(cari.status).toBe(200);
    expect(isiCari.result.data.json.daftar.map((p) => p.idProgram)).toEqual([
      program.id,
    ]);
    expect(detail.status).toBe(200);
    expect(isiDetail.result.data.json.namaProgram).toBe(`Tanam ${kata}`);
    expect(isiDetail.result.data.json.tautanSitusResmi).toBe(
      "https://hijau.example",
    );
    expect(tidakAda.status).toBe(404);
    expect(buat.status).toBe(401);
  });
});
