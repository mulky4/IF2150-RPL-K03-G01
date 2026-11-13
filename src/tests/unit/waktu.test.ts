import { describe, expect, it } from "vitest";

import { waktuLengkap, waktuRelatif } from "~/lib/waktu";

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
