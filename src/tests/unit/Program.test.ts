import { describe, expect, it } from "vitest";
import { StatusProgram } from "~/server/models/enums";
import { Program } from "~/server/models/Program";

function buatProgram(status: StatusProgram) {
  return new Program({
    idProgram: "p1",
    namaProgram: "Tanam Pohon",
    deskripsi: "-",
    kategori: "JAGA_ALAM",
    tempatPelaksanaan: "Bandung",
    waktuMulai: new Date("2026-12-05T08:00:00.000Z"),
    waktuSelesai: new Date("2026-12-05T12:00:00.000Z"),
    kuota: 10,
    syaratKetentuan: "-",
    status,
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
