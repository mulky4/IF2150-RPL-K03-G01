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
  it("menambah jam aksi sebesar durasi program", () => {
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

  it("melanjutkan dari total jam yang sudah ada", () => {
    const riwayat = new RiwayatKontribusi({
      idRiwayat: "r1",
      totalJamAksi: 10,
    });
    riwayat.tambahRiwayatProgram(PANTAI);
    expect(riwayat.getTotalJamAksi()).toBe(14);
  });

  it("menolak program yang sudah tercatat dan jam tidak bertambah", () => {
    const riwayat = new RiwayatKontribusi({ idRiwayat: "r1", totalJamAksi: 0 });
    riwayat.tambahRiwayatProgram(PANTAI);
    expect(() => riwayat.tambahRiwayatProgram(PANTAI)).toThrow(
      "Program sudah tercatat pada riwayat",
    );
    expect(riwayat.getTotalJamAksi()).toBe(4);
  });

  it("menolak program dengan durasi negatif", () => {
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
});

describe("Relawan.catatKontribusi", () => {
  it("relawan yang hadir dapat jam aksi", () => {
    const relawan = buatRelawan([PANTAI]);
    expect(relawan.catatKontribusi(PANTAI)).toBe(true);
    expect(relawan.getTotalJamAksi()).toBe(4);
  });

  it("relawan yang tidak hadir tidak dapat jam aksi", () => {
    const relawan = buatRelawan([HUTAN]);
    expect(relawan.catatKontribusi(PANTAI)).toBe(false);
    expect(relawan.getTotalJamAksi()).toBe(0);
    expect(relawan.lihatPortofolio().getDaftarProgramSelesai()).toEqual([]);
  });

  it("relawan baru tanpa riwayat mulai dari nol", () => {
    const relawan = buatRelawan([]);
    expect(relawan.lihatPortofolio().getIdRiwayat()).toBeNull();
    expect(relawan.getTotalJamAksi()).toBe(0);
  });
});
