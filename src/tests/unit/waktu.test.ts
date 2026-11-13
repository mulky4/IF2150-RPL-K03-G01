import { describe, expect, it } from "vitest";

import {
  jam,
  rentangWaktu,
  tanggalJam,
  waktuLengkap,
  waktuRelatif,
} from "~/lib/waktu";

describe("format waktu WIB", () => {
  const mulai = new Date("2026-11-14T00:00:00.000Z"); // 07.00 WIB
  const selesai = new Date("2026-11-14T05:00:00.000Z"); // 12.00 WIB

  it("tanggal dan jam pakai format Indonesia", () => {
    expect(tanggalJam(mulai)).toBe("Sab, 14 Nov 2026 · 07.00");
    expect(jam(new Date("2026-11-14T00:12:00.000Z"))).toBe("07.12");
  });

  it("rentang di hari yang sama cukup satu tanggal", () => {
    expect(rentangWaktu(mulai, selesai)).toBe(
      "Sab, 14 Nov 2026 · 07.00–12.00 WIB",
    );
  });

  it("rentang beda hari menulis dua tanggal", () => {
    const besok = new Date("2026-11-15T05:00:00.000Z");
    expect(rentangWaktu(mulai, besok)).toBe(
      "Sab, 14 Nov 2026 · 07.00 – Min, 15 Nov 2026 · 12.00 WIB",
    );
  });
});

const SEKARANG = new Date("2026-11-11T03:00:00Z"); // 10.00 WIB

const lalu = (menit: number) => new Date(SEKARANG.getTime() - menit * 60_000);

describe("waktuRelatif (I-03)", () => {
  it("kurang dari semenit atau waktu di masa depan → Baru saja", () => {
    expect(waktuRelatif(lalu(0), SEKARANG)).toBe("Baru saja");
    expect(waktuRelatif(lalu(-5), SEKARANG)).toBe("Baru saja");
  });

  it("menit dan jam", () => {
    expect(waktuRelatif(lalu(5), SEKARANG)).toBe("5 menit lalu");
    expect(waktuRelatif(lalu(59), SEKARANG)).toBe("59 menit lalu");
    expect(waktuRelatif(lalu(60), SEKARANG)).toBe("1 jam lalu");
    expect(waktuRelatif(lalu(23 * 60), SEKARANG)).toBe("23 jam lalu");
  });

  it("kemarin dan beberapa hari lalu", () => {
    expect(waktuRelatif(lalu(24 * 60), SEKARANG)).toBe("Kemarin");
    expect(waktuRelatif(lalu(3 * 24 * 60), SEKARANG)).toBe("3 hari lalu");
  });

  it("lebih dari seminggu → tanggal lengkap", () => {
    expect(waktuRelatif(lalu(10 * 24 * 60), SEKARANG)).toBe("1 November 2026");
  });
});

describe("waktuLengkap (I03-LBL-Detail)", () => {
  it("hari yang sama (WIB) → Hari ini, jam WIB", () => {
    expect(waktuLengkap(new Date("2026-11-11T02:12:00Z"), SEKARANG)).toBe(
      "Hari ini, 09.12 WIB",
    );
  });

  it("memakai tanggal WIB, bukan UTC", () => {
    // 20.00 UTC tanggal 10 = 03.00 WIB tanggal 11 → masih hari ini
    expect(waktuLengkap(new Date("2026-11-10T20:00:00Z"), SEKARANG)).toBe(
      "Hari ini, 03.00 WIB",
    );
  });

  it("hari lain → tanggal panjang", () => {
    expect(waktuLengkap(new Date("2026-11-07T00:30:00Z"), SEKARANG)).toBe(
      "7 November 2026, 07.30 WIB",
    );
  });
});
