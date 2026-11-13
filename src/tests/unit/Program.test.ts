import { describe, expect, it } from "vitest";
import { StatusProgram } from "~/server/models/enums";
import { Pendaftaran } from "~/server/models/Pendaftaran";
import { Program } from "~/server/models/Program";

function buatProgram(
  status: StatusProgram,
  tambahan: { kuota?: number; pendaftar?: Pendaftaran[] } = {},
) {
  return new Program({
    idProgram: "p1",
    namaProgram: "Tanam Pohon",
    deskripsi: "-",
    kategori: "JAGA_ALAM",
    tempatPelaksanaan: "Bandung",
    waktuMulai: new Date("2026-12-05T08:00:00.000Z"),
    waktuSelesai: new Date("2026-12-05T12:00:00.000Z"),
    kuota: tambahan.kuota ?? 10,
    syaratKetentuan: "-",
    status,
    pendaftar: tambahan.pendaftar,
  });
}

describe("Program.aktifkan", () => {
  it("mengubah MENUNGGU_VERIFIKASI menjadi AKTIF", () => {
    const program = buatProgram(StatusProgram.MENUNGGU_VERIFIKASI);
    expect(program.aktifkan()).toBe(StatusProgram.AKTIF);
  });

  it.each([
    StatusProgram.AKTIF,
    StatusProgram.MENUNGGU_KONFIRMASI,
    StatusProgram.PERLU_REVISI,
    StatusProgram.SELESAI,
  ])("ditolak kalau status %s", (status) => {
    expect(() => buatProgram(status).aktifkan()).toThrow(
      "Program tidak sedang menunggu verifikasi",
    );
  });
});

function buatPendaftar(
  status: "MENUNGGU" | "DITERIMA" | "DITOLAK",
  id: string,
) {
  return new Pendaftaran({
    idPendaftaran: id,
    keterampilan: "-",
    ketersediaanWaktu: "-",
    status,
    waktuDaftar: new Date("2026-11-07T01:00:00.000Z"),
  });
}

describe("Program.cekKuotaTersedia", () => {
  it("true kalau yang diterima ditambah relawan baru masih di bawah kuota", () => {
    const program = buatProgram(StatusProgram.AKTIF, {
      kuota: 3,
      pendaftar: [buatPendaftar("DITERIMA", "a")],
    });
    expect(program.cekKuotaTersedia(1)).toBe(true);
  });

  it("true kalau tepat memenuhi kuota", () => {
    const program = buatProgram(StatusProgram.AKTIF, {
      kuota: 3,
      pendaftar: [buatPendaftar("DITERIMA", "a")],
    });
    expect(program.cekKuotaTersedia(2)).toBe(true);
  });

  it("false kalau melebihi kuota", () => {
    const program = buatProgram(StatusProgram.AKTIF, {
      kuota: 3,
      pendaftar: [buatPendaftar("DITERIMA", "a")],
    });
    expect(program.cekKuotaTersedia(3)).toBe(false);
  });

  it("hanya menghitung pendaftar berstatus DITERIMA", () => {
    const program = buatProgram(StatusProgram.AKTIF, {
      kuota: 2,
      pendaftar: [
        buatPendaftar("MENUNGGU", "a"),
        buatPendaftar("DITOLAK", "b"),
        buatPendaftar("DITERIMA", "c"),
      ],
    });
    expect(program.cekKuotaTersedia(1)).toBe(true);
    expect(program.cekKuotaTersedia(2)).toBe(false);
  });

  it("program tanpa pendaftar: seluruh kuota masih tersedia", () => {
    const program = buatProgram(StatusProgram.AKTIF, { kuota: 5 });
    expect(program.cekKuotaTersedia(5)).toBe(true);
    expect(program.cekKuotaTersedia(6)).toBe(false);
  });

  it("menolak jumlah tambahan negatif", () => {
    expect(() => buatProgram(StatusProgram.AKTIF).cekKuotaTersedia(-1)).toThrow(
      "Jumlah relawan tidak valid",
    );
  });
});

describe("Program.cekDalamWaktuPelaksanaan", () => {
  const program = buatProgram(StatusProgram.AKTIF);

  it("true untuk waktu di tengah rentang", () => {
    expect(
      program.cekDalamWaktuPelaksanaan(new Date("2026-12-05T10:00:00.000Z")),
    ).toBe(true);
  });

  it("true tepat di waktu mulai dan waktu selesai (batas inklusif)", () => {
    expect(
      program.cekDalamWaktuPelaksanaan(new Date("2026-12-05T08:00:00.000Z")),
    ).toBe(true);
    expect(
      program.cekDalamWaktuPelaksanaan(new Date("2026-12-05T12:00:00.000Z")),
    ).toBe(true);
  });

  it("false sebelum mulai dan sesudah selesai", () => {
    expect(
      program.cekDalamWaktuPelaksanaan(new Date("2026-12-05T07:59:59.999Z")),
    ).toBe(false);
    expect(
      program.cekDalamWaktuPelaksanaan(new Date("2026-12-05T12:00:00.001Z")),
    ).toBe(false);
  });
});

describe("Program.hitungDurasiJam", () => {
  it("menghitung selisih waktu selesai dan mulai dalam jam", () => {
    expect(buatProgram(StatusProgram.AKTIF).hitungDurasiJam()).toBe(4);
  });

  it("mendukung durasi pecahan jam dan lintas hari", () => {
    const setengahJam = new Program({
      idProgram: "p2",
      namaProgram: "-",
      deskripsi: "-",
      kategori: "JAGA_ALAM",
      tempatPelaksanaan: "-",
      waktuMulai: new Date("2026-12-05T08:00:00.000Z"),
      waktuSelesai: new Date("2026-12-05T08:30:00.000Z"),
      kuota: 1,
      syaratKetentuan: "-",
      status: StatusProgram.AKTIF,
    });
    const duaHari = new Program({
      idProgram: "p3",
      namaProgram: "-",
      deskripsi: "-",
      kategori: "JAGA_ALAM",
      tempatPelaksanaan: "-",
      waktuMulai: new Date("2026-12-05T08:00:00.000Z"),
      waktuSelesai: new Date("2026-12-07T08:00:00.000Z"),
      kuota: 1,
      syaratKetentuan: "-",
      status: StatusProgram.AKTIF,
    });
    expect(setengahJam.hitungDurasiJam()).toBe(0.5);
    expect(duaHari.hitungDurasiJam()).toBe(48);
  });
});
