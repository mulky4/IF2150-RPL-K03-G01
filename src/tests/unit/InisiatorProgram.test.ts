import { describe, expect, it, vi } from "vitest";

vi.mock("~/server/db", () => ({ db: {} }));

import { StatusVerifikasi } from "~/server/models/enums";
import { InisiatorProgram } from "~/server/models/InisiatorProgram";

// Unit test kelas InisiatorProgram (C05), HIUPL 4.2. Objek dibentuk langsung dari data,
// tanpa basis data. ID test case mengikuti Tabel 4.2.x.

function buatInisiator(
  statusVerifikasi: StatusVerifikasi,
  tautanSitusResmi: string | null = "https://hijau.example",
) {
  return new InisiatorProgram({
    idPengguna: "user-ini",
    email: "hijau@rekanbumi.test",
    idInisiator: "ini-1",
    namaLembaga: "Komunitas Hijau",
    tautanSitusResmi,
    statusVerifikasi,
  });
}

describe("InisiatorProgram.cekStatusVerifikasi (Algo-C05-01)", () => {
  it("C05-UT01 lembaga TERVERIFIKASI dinyatakan terverifikasi", () => {
    expect(
      buatInisiator(StatusVerifikasi.TERVERIFIKASI).cekStatusVerifikasi(),
    ).toBe(true);
  });

  it("C05-UT02 lembaga yang masih MENUNGGU verifikasi dinyatakan belum terverifikasi", () => {
    expect(buatInisiator(StatusVerifikasi.MENUNGGU).cekStatusVerifikasi()).toBe(
      false,
    );
  });

  it("C05-UT03 lembaga yang DITOLAK verifikasinya dinyatakan belum terverifikasi", () => {
    expect(buatInisiator(StatusVerifikasi.DITOLAK).cekStatusVerifikasi()).toBe(
      false,
    );
  });
});

describe("InisiatorProgram.getTautan (Algo-C05-02)", () => {
  it("C05-UT04 mengembalikan tautan situs resmi lembaga", () => {
    expect(buatInisiator(StatusVerifikasi.TERVERIFIKASI).getTautan()).toBe(
      "https://hijau.example",
    );
  });

  it("C05-UT05 batas: lembaga tanpa situs resmi (null) menghasilkan string kosong", () => {
    expect(
      buatInisiator(StatusVerifikasi.TERVERIFIKASI, null).getTautan(),
    ).toBe("");
  });

  it("C05-UT06 tautan yang berisi spasi dikembalikan apa adanya (pemeriksaan keabsahan dilakukan C15)", () => {
    expect(
      buatInisiator(StatusVerifikasi.TERVERIFIKASI, "   ").getTautan(),
    ).toBe("   ");
  });
});

describe("InisiatorProgram.getNamaLembaga (operasi tambahan)", () => {
  it("C05-UT07 mengembalikan nama lembaga yang diberikan saat objek dibentuk", () => {
    expect(buatInisiator(StatusVerifikasi.MENUNGGU).getNamaLembaga()).toBe(
      "Komunitas Hijau",
    );
  });
});
