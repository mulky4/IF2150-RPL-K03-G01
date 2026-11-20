import { describe, expect, it } from "vitest";

import { Kehadiran } from "~/server/models/Kehadiran";
import { Program } from "~/server/models/Program";
import { Relawan } from "~/server/models/Relawan";
import { RiwayatKontribusi } from "~/server/models/RiwayatKontribusi";

function buatProgram(id: string, mulai: string, selesai: string) {
  return new Program({
    idProgram: id,
    namaProgram: `Program ${id}`,
    deskripsi: "-",
    kategori: "JAGA_ALAM",
    tempatPelaksanaan: "Pantai",
    waktuMulai: new Date(mulai),
    waktuSelesai: new Date(selesai),
    kuota: 10,
    syaratKetentuan: "-",
    status: "SELESAI",
  });
}

// 4 jam dan 2,5 jam
const PANTAI = buatProgram(
  "pantai",
  "2026-11-07T01:00:00.000Z",
  "2026-11-07T05:00:00.000Z",
);
const HUTAN = buatProgram(
  "hutan",
  "2026-11-08T01:00:00.000Z",
  "2026-11-08T03:30:00.000Z",
);

function buatRelawan(hadirDi: Program[], riwayat?: RiwayatKontribusi) {
  return new Relawan({
    idPengguna: "user-1",
    email: "relawan@rekanbumi.test",
    idRelawan: "relawan-1",
    nama: "Ayu",
    noTelepon: "0812",
    domisili: "Bandung",
    statusVerifikasi: "TERVERIFIKASI",
    kehadiran: hadirDi.map(
      (program, i) =>
        new Kehadiran({
          idKehadiran: `hadir-${i}`,
          waktuKehadiran: program.getWaktuMulai(),
          programId: program.getIdProgram(),
        }),
    ),
    riwayatKontribusi: riwayat,
  });
}

describe("RiwayatKontribusi.tambahRiwayatProgram", () => {
  it("C11-UT01 menambah jam aksi sebesar durasi program", () => {
    const riwayat = new RiwayatKontribusi({ idRiwayat: "r1", totalJamAksi: 0 });
    riwayat.tambahRiwayatProgram(PANTAI);
    expect(riwayat.getTotalJamAksi()).toBe(PANTAI.hitungDurasiJam());
    expect(riwayat.getTotalJamAksi()).toBe(4);

    riwayat.tambahRiwayatProgram(HUTAN);
    expect(riwayat.getTotalJamAksi()).toBe(6.5);
    expect(
      riwayat.getDaftarProgramSelesai().map((p) => p.getIdProgram()),
    ).toEqual(["pantai", "hutan"]);
  });

  it("C11-UT02 melanjutkan dari total jam yang sudah ada", () => {
    const riwayat = new RiwayatKontribusi({
      idRiwayat: "r1",
      totalJamAksi: 10,
    });
    riwayat.tambahRiwayatProgram(PANTAI);
    expect(riwayat.getTotalJamAksi()).toBe(14);
  });

  it("C11-UT03 menolak program yang sudah tercatat dan jam tidak bertambah", () => {
    const riwayat = new RiwayatKontribusi({ idRiwayat: "r1", totalJamAksi: 0 });
    riwayat.tambahRiwayatProgram(PANTAI);
    expect(() => riwayat.tambahRiwayatProgram(PANTAI)).toThrow(
      "Program sudah tercatat pada riwayat",
    );
    expect(riwayat.getTotalJamAksi()).toBe(4);
  });

  it("C11-UT04 menolak program dengan durasi negatif", () => {
    const riwayat = RiwayatKontribusi.kosong();
    const terbalik = buatProgram(
      "terbalik",
      "2026-11-07T05:00:00.000Z",
      "2026-11-07T01:00:00.000Z",
    );
    expect(() => riwayat.tambahRiwayatProgram(terbalik)).toThrow(
      "Jam aksi tidak valid",
    );
    expect(riwayat.getTotalJamAksi()).toBe(0);
  });

  it("C11-UT05 program berdurasi nol jam tetap tercatat tanpa menambah jam", () => {
    const riwayat = new RiwayatKontribusi({ idRiwayat: "r1", totalJamAksi: 4 });
    const sekejap = buatProgram(
      "sekejap",
      "2026-11-09T01:00:00.000Z",
      "2026-11-09T01:00:00.000Z",
    );
    riwayat.tambahRiwayatProgram(sekejap);
    expect(riwayat.getTotalJamAksi()).toBe(4);
    expect(riwayat.mencatat(sekejap)).toBe(true);
  });
});

describe("RiwayatKontribusi.getTotalJamAksi dan getDaftarProgramSelesai", () => {
  it("C11-UT06 riwayat kosong bernilai nol jam dan tanpa program", () => {
    const riwayat = RiwayatKontribusi.kosong();
    expect(riwayat.getTotalJamAksi()).toBe(0);
    expect(riwayat.getDaftarProgramSelesai()).toEqual([]);
    expect(riwayat.getIdRiwayat()).toBeNull();
  });

  it("C11-UT07 mengubah daftar yang dikembalikan tidak mengubah riwayat", () => {
    const riwayat = new RiwayatKontribusi({ idRiwayat: "r1", totalJamAksi: 0 });
    riwayat.tambahRiwayatProgram(PANTAI);
    const daftar = riwayat.getDaftarProgramSelesai();
    daftar.push(HUTAN);
    daftar.length = 0;
    expect(
      riwayat.getDaftarProgramSelesai().map((p) => p.getIdProgram()),
    ).toEqual(["pantai"]);
    expect(riwayat.getTotalJamAksi()).toBe(4);
  });

  it("C11-UT08 mencatat() hanya true untuk program yang sudah ada di riwayat", () => {
    const riwayat = RiwayatKontribusi.kosong();
    expect(riwayat.mencatat(PANTAI)).toBe(false);
    riwayat.tambahRiwayatProgram(PANTAI);
    expect(riwayat.mencatat(PANTAI)).toBe(true);
    expect(riwayat.mencatat(HUTAN)).toBe(false);
  });
});

describe("Relawan.catatKontribusi", () => {
  it("C03-UT01 relawan yang hadir dapat jam aksi", () => {
    const relawan = buatRelawan([PANTAI]);
    expect(relawan.catatKontribusi(PANTAI)).toBe(true);
    expect(relawan.getTotalJamAksi()).toBe(4);
  });

  it("C03-UT02 relawan yang tidak hadir tidak dapat jam aksi", () => {
    const relawan = buatRelawan([HUTAN]);
    expect(relawan.catatKontribusi(PANTAI)).toBe(false);
    expect(relawan.getTotalJamAksi()).toBe(0);
    expect(relawan.lihatPortofolio().getDaftarProgramSelesai()).toEqual([]);
  });

  it("C03-UT03 relawan baru tanpa riwayat mulai dari nol", () => {
    const relawan = buatRelawan([]);
    expect(relawan.lihatPortofolio().getIdRiwayat()).toBeNull();
    expect(relawan.getTotalJamAksi()).toBe(0);
  });
});

describe("Relawan.hadirPada dan lihatPortofolio", () => {
  it("C03-UT04 hadirPada() true untuk program yang pernah di-check-in", () => {
    const relawan = buatRelawan([HUTAN, PANTAI]);
    expect(relawan.hadirPada(PANTAI)).toBe(true);
    expect(relawan.hadirPada(HUTAN)).toBe(true);
  });

  it("C03-UT05 hadirPada() false kalau hanya hadir di program lain atau belum pernah hadir", () => {
    expect(buatRelawan([HUTAN]).hadirPada(PANTAI)).toBe(false);
    expect(buatRelawan([]).hadirPada(PANTAI)).toBe(false);
  });

  it("C03-UT06 lihatPortofolio() mengembalikan riwayat yang dimiliki relawan", () => {
    const riwayat = new RiwayatKontribusi({
      idRiwayat: "r1",
      totalJamAksi: 12,
    });
    const relawan = buatRelawan([], riwayat);
    expect(relawan.lihatPortofolio()).toBe(riwayat);
    expect(relawan.getTotalJamAksi()).toBe(12);
  });

  it("C03-UT07 riwayat kosong relawan baru dipakai ulang sehingga jam yang dicatat tidak hilang", () => {
    const relawan = buatRelawan([PANTAI]);
    const pertama = relawan.lihatPortofolio();
    relawan.catatKontribusi(PANTAI);
    expect(relawan.lihatPortofolio()).toBe(pertama);
    expect(relawan.lihatPortofolio().getTotalJamAksi()).toBe(4);
  });
});
