import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { BetterAuth } from "~/server/adapters/BetterAuth";
import {
  AuthController,
  GalatIPDiblokir,
} from "~/server/controllers/AuthController";

// Kredensial benar hanya untuk pasangan ini. DB dan Better Auth tidak dipanggil sungguhan.
const EMAIL = "relawan@rekanbumi.test";
const SANDI = "Rahasia123";

let ipKe = 0;
/** IP berbeda per test, karena data blokir disimpan statis di AuthController. */
const ipBaru = () => `10.0.0.${++ipKe}`;

describe("AuthController (C13) – login dan blokir IP, UC02 & KNF06", () => {
  beforeEach(() => {
    vi.spyOn(BetterAuth, "verifikasiKredensial").mockImplementation(
      async (email, kataSandi) =>
        email === EMAIL && kataSandi === SANDI ? "id-relawan" : null,
    );
    vi.spyOn(BetterAuth, "buatSesiMasuk").mockResolvedValue("token-sesi");
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("C13-UT24 kredensial benar → true dan sesi dibuat", async () => {
    const ip = ipBaru();
    await expect(
      AuthController.validasiKredensial(EMAIL, SANDI, ip),
    ).resolves.toBe(true);
    expect(BetterAuth.buatSesiMasuk).toHaveBeenCalledWith(EMAIL, SANDI);
  });

  it("C13-UT25 kredensial salah → false dan sesi tidak dibuat (UC02 alt. 1)", async () => {
    const ip = ipBaru();
    await expect(
      AuthController.validasiKredensial(EMAIL, "salah", ip),
    ).resolves.toBe(false);
    expect(BetterAuth.buatSesiMasuk).not.toHaveBeenCalled();
  });

  it("C13-UT26 5x gagal → percobaan ke-6 diblokir, walau kata sandi benar (UC02 alt. 2)", async () => {
    const ip = ipBaru();
    for (let i = 0; i < 5; i++) {
      await expect(
        AuthController.validasiKredensial(EMAIL, "salah", ip),
      ).resolves.toBe(false);
    }
    await expect(
      AuthController.validasiKredensial(EMAIL, SANDI, ip),
    ).rejects.toBeInstanceOf(GalatIPDiblokir);
    expect(BetterAuth.buatSesiMasuk).not.toHaveBeenCalled();
  });

  it("C13-UT27 blokir hanya berlaku untuk IP itu", async () => {
    const ipDiblokir = ipBaru();
    for (let i = 0; i < 5; i++) {
      await AuthController.validasiKredensial(EMAIL, "salah", ipDiblokir);
    }
    await expect(
      AuthController.validasiKredensial(EMAIL, SANDI, ipBaru()),
    ).resolves.toBe(true);
  });

  it("C13-UT28 blokir selesai setelah 5 menit dan hitungan gagal mulai dari nol", async () => {
    vi.useFakeTimers();
    const ip = ipBaru();
    for (let i = 0; i < 5; i++) {
      await AuthController.validasiKredensial(EMAIL, "salah", ip);
    }
    vi.advanceTimersByTime(4 * 60 * 1000);
    await expect(
      AuthController.validasiKredensial(EMAIL, SANDI, ip),
    ).rejects.toBeInstanceOf(GalatIPDiblokir);

    vi.advanceTimersByTime(60 * 1000 + 1);
    // Hitungan direset: 4x gagal lagi belum memblokir.
    for (let i = 0; i < 4; i++) {
      await AuthController.validasiKredensial(EMAIL, "salah", ip);
    }
    await expect(
      AuthController.validasiKredensial(EMAIL, SANDI, ip),
    ).resolves.toBe(true);
  });

  it("C13-UT29 login berhasil mereset hitungan gagal", async () => {
    const ip = ipBaru();
    for (let i = 0; i < 4; i++) {
      await AuthController.validasiKredensial(EMAIL, "salah", ip);
    }
    await AuthController.validasiKredensial(EMAIL, SANDI, ip);
    for (let i = 0; i < 4; i++) {
      await AuthController.validasiKredensial(EMAIL, "salah", ip);
    }
    await expect(
      AuthController.validasiKredensial(EMAIL, SANDI, ip),
    ).resolves.toBe(true);
  });

  it("C13-UT36 cekSesi: ada sesi aktif → true (Algo-C13-04)", async () => {
    vi.spyOn(BetterAuth, "ambilSesi").mockResolvedValue("token-sesi");
    await expect(AuthController.cekSesi()).resolves.toBe(true);
  });

  it("C13-UT37 cekSesi: batas belum login (sesi null) → false", async () => {
    vi.spyOn(BetterAuth, "ambilSesi").mockResolvedValue(null);
    await expect(AuthController.cekSesi()).resolves.toBe(false);
  });

  it("C13-UT40 cekSesi: Better Auth gagal membaca sesi → galat diteruskan", async () => {
    vi.spyOn(BetterAuth, "ambilSesi").mockRejectedValue(
      new Error("Sesi rusak"),
    );
    await expect(AuthController.cekSesi()).rejects.toThrow("Sesi rusak");
  });

  it("C13-UT38 batas: 4x gagal belum diblokir, percobaan ke-5 masih diperiksa", async () => {
    const ip = ipBaru();
    for (let i = 0; i < 4; i++) {
      await AuthController.validasiKredensial(EMAIL, "salah", ip);
    }
    await expect(
      AuthController.validasiKredensial(EMAIL, "salah", ip),
    ).resolves.toBe(false);
    expect(BetterAuth.verifikasiKredensial).toHaveBeenCalledTimes(5);
    // Baru setelah gagal ke-5 IP diblokir.
    await expect(
      AuthController.validasiKredensial(EMAIL, SANDI, ip),
    ).rejects.toBeInstanceOf(GalatIPDiblokir);
  });
});
