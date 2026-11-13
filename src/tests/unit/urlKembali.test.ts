import { describe, expect, it } from "vitest";

import { urlKembaliAman } from "~/lib/urlKembali";

describe("urlKembaliAman (I-02, mencegah open redirect)", () => {
  it("menerima path internal beserta query dan hash", () => {
    expect(urlKembaliAman("/program/abc")).toBe("/program/abc");
    expect(urlKembaliAman("/program?kategori=JAGA_ALAM#atas")).toBe(
      "/program?kategori=JAGA_ALAM#atas",
    );
  });

  it("menolak kosong, null, dan yang bukan diawali /", () => {
    for (const u of [null, undefined, "", "program", "https://evil.example"]) {
      expect(urlKembaliAman(u)).toBeNull();
    }
  });

  it("menolak varian protocol-relative dan backslash", () => {
    for (const u of ["//evil.example", "/\\evil.example", "/\\/evil.example"]) {
      expect(urlKembaliAman(u)).toBeNull();
    }
  });

  it("menolak karakter kontrol (tab/newline disisipkan untuk mengelabui parser)", () => {
    for (const u of ["/\t/evil.example", "/\n/evil.example", "/a\r\nb"]) {
      expect(urlKembaliAman(u)).toBeNull();
    }
  });
});
