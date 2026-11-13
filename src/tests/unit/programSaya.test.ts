import { describe, expect, it } from "vitest";

import {
  aksiProgram,
  hitungStatistik,
  labelStatus,
  nadaStatus,
  persenKuota,
  saringProgram,
} from "~/lib/programSaya";

describe("pemetaan status program (I-07)", () => {
  it("label dan nada badge", () => {
    expect(labelStatus("MENUNGGU_KONFIRMASI")).toBe("Menunggu Konfirmasi");
    expect(nadaStatus("AKTIF")).toBe("sukses");
    expect(nadaStatus("PERLU_REVISI")).toBe("error");
  });
});

describe("aksiProgram (navigasi pengelolaan program)", () => {
  it("Menunggu Verifikasi: kelola pendaftar nonaktif, tanpa tombol laporan", () => {
    expect(aksiProgram("MENUNGGU_VERIFIKASI")).toEqual({
      kelolaPendaftarAktif: false,
      laporan: null,
    });
  });

  it("Aktif: Unggah Laporan aktif", () => {
    expect(aksiProgram("AKTIF").laporan).toEqual({
      teks: "Unggah Laporan",
      aktif: true,
    });
  });

  it("Menunggu Konfirmasi: Laporan Dikirim dan dinonaktifkan", () => {
    expect(aksiProgram("MENUNGGU_KONFIRMASI").laporan).toEqual({
      teks: "Laporan Dikirim",
      aktif: false,
    });
  });

  it("Perlu Revisi: Unggah Ulang aktif", () => {
    expect(aksiProgram("PERLU_REVISI").laporan).toEqual({
      teks: "Unggah Ulang",
      aktif: true,
    });
  });

  it("Selesai: tanpa tombol laporan", () => {
    expect(aksiProgram("SELESAI").laporan).toBeNull();
  });
});

describe("hitungStatistik, saringProgram, persenKuota", () => {
  const daftar = [
    { status: "AKTIF" as const, menunggu: 2 },
    { status: "PERLU_REVISI" as const, menunggu: 0 },
    { status: "AKTIF" as const, menunggu: 3 },
    { status: "SELESAI" as const, menunggu: 0 },
  ];

  it("menghitung statistik", () => {
    expect(hitungStatistik(daftar)).toEqual({
      programAktif: 2,
      pendaftarMenunggu: 5,
      laporanPerluRevisi: 1,
    });
  });

  it("menyaring berdasarkan status", () => {
    expect(saringProgram(daftar, "SEMUA")).toHaveLength(4);
    expect(saringProgram(daftar, "AKTIF")).toHaveLength(2);
    expect(saringProgram(daftar, "SELESAI")).toHaveLength(1);
  });

  it("persen kuota dibatasi 0 sampai 100", () => {
    expect(persenKuota(18, 30)).toBe(60);
    expect(persenKuota(40, 30)).toBe(100);
    expect(persenKuota(5, 0)).toBe(0);
  });
});