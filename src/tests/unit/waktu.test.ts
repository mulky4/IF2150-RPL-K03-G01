import { describe, expect, it } from "vitest";

import { jam, rentangWaktu, tanggalJam } from "~/lib/waktu";

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
