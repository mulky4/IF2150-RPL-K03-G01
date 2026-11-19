import { beforeEach, describe, expect, it, vi } from "vitest";

// Pustaka Better Auth, header request Next.js, dan DB diganti tiruan supaya
// operasi C22 bisa diuji tanpa server dan database (uji dengan DB asli ada di tests/integrasi).
const { api, akun, kepala } = vi.hoisted(() => ({
  kepala: { nilai: new Headers({ "x-forwarded-for": "10.1.1.1" }) },
  api: {
    signUpEmail: vi.fn(),
    signInEmail: vi.fn(),
    getSession: vi.fn(),
  },
  akun: {
    baris: null as null | {
      id: string;
      accounts: { password: string | null }[];
    },
  },
}));

vi.mock("~/server/auth", () => ({ auth: { api } }));
vi.mock("next/headers", () => ({
  headers: async () => kepala.nilai,
}));
vi.mock("~/server/db", () => ({
  db: { user: { findUnique: async () => akun.baris } },
}));

import { BetterAuth } from "~/server/adapters/BetterAuth";

beforeEach(() => {
  vi.clearAllMocks();
  akun.baris = null;
  kepala.nilai = new Headers({ "x-forwarded-for": "10.1.1.1" });
});

describe("BetterAuth (C22) – hashing bcrypt, KNF02", () => {
  it("C22-UT01 hashKataSandi menghasilkan hash berformat bcrypt", async () => {
    const hash = await BetterAuth.hashKataSandi("Password123!");
    expect(hash).toMatch(/^\$2[ab]\$10\$/);
    expect(hash).not.toContain("Password123!");
  });

  it("C22-UT02 cocokkanHash true untuk kata sandi yang benar, false untuk yang salah", async () => {
    const hash = await BetterAuth.hashKataSandi("Password123!");
    expect(await BetterAuth.cocokkanHash("Password123!", hash)).toBe(true);
    expect(await BetterAuth.cocokkanHash("salah", hash)).toBe(false);
  });
});

describe("BetterAuth (C22) – kredensial dan sesi", () => {
  it("C22-UT03 daftarkanKredensial meneruskan nama dan peran, mengembalikan id akun (Algo-C22-01)", async () => {
    api.signUpEmail.mockResolvedValue({ user: { id: "u-baru" } });
    await expect(
      BetterAuth.daftarkanKredensial("ayu@rekanbumi.test", "Rahasia123", {
        nama: "Ayu",
        peran: "INISIATOR",
      }),
    ).resolves.toBe("u-baru");
    expect(api.signUpEmail).toHaveBeenCalledWith({
      body: {
        email: "ayu@rekanbumi.test",
        password: "Rahasia123",
        name: "Ayu",
        peran: "INISIATOR",
      },
    });
  });

  it("C22-UT04 batas: tanpa opsi, nama diisi email dan peran tidak dikirim", async () => {
    api.signUpEmail.mockResolvedValue({ user: { id: "u-2" } });
    await BetterAuth.daftarkanKredensial("bima@rekanbumi.test", "Rahasia123");
    expect(api.signUpEmail).toHaveBeenCalledWith({
      body: {
        email: "bima@rekanbumi.test",
        password: "Rahasia123",
        name: "bima@rekanbumi.test",
      },
    });
  });

  it("C22-UT05 verifikasiKredensial: kata sandi cocok dengan hash → idPengguna (Algo-C22-03)", async () => {
    akun.baris = {
      id: "u-ayu",
      accounts: [{ password: await BetterAuth.hashKataSandi("Rahasia123") }],
    };
    await expect(
      BetterAuth.verifikasiKredensial("ayu@rekanbumi.test", "Rahasia123"),
    ).resolves.toBe("u-ayu");
  });

  it("C22-UT06 verifikasiKredensial: kata sandi salah → null", async () => {
    akun.baris = {
      id: "u-ayu",
      accounts: [{ password: await BetterAuth.hashKataSandi("Rahasia123") }],
    };
    await expect(
      BetterAuth.verifikasiKredensial("ayu@rekanbumi.test", "Salah12345"),
    ).resolves.toBeNull();
  });

  it("C22-UT07 verifikasiKredensial: email tidak terdaftar → null", async () => {
    await expect(
      BetterAuth.verifikasiKredensial("siapa@rekanbumi.test", "Rahasia123"),
    ).resolves.toBeNull();
  });

  it("C22-UT08 batas: akun tanpa kredensial kata sandi → null", async () => {
    akun.baris = { id: "u-tanpa", accounts: [] };
    await expect(
      BetterAuth.verifikasiKredensial("tanpa@rekanbumi.test", "Rahasia123"),
    ).resolves.toBeNull();
  });

  it("C22-UT09 buatSesiMasuk meneruskan header request dan mengembalikan token (Algo-C22-05)", async () => {
    api.signInEmail.mockResolvedValue({ token: "token-baru" });
    await expect(
      BetterAuth.buatSesiMasuk("ayu@rekanbumi.test", "Rahasia123"),
    ).resolves.toBe("token-baru");
    const argumen = api.signInEmail.mock.calls[0]![0] as {
      body: unknown;
      headers: Headers;
    };
    expect(argumen.body).toEqual({
      email: "ayu@rekanbumi.test",
      password: "Rahasia123",
    });
    expect(argumen.headers.get("x-forwarded-for")).toBe("10.1.1.1");
  });

  it("C22-UT10 ambilSesi: ada sesi → token sesi (Algo-C22-06)", async () => {
    api.getSession.mockResolvedValue({ session: { token: "token-aktif" } });
    await expect(BetterAuth.ambilSesi()).resolves.toBe("token-aktif");
  });

  it("C22-UT11 ambilSesi: batas tidak ada sesi → null", async () => {
    api.getSession.mockResolvedValue(null);
    await expect(BetterAuth.ambilSesi()).resolves.toBeNull();
  });

  it("C22-UT12 daftarkanKredensial: Better Auth menolak (email sudah ada) → galat diteruskan", async () => {
    api.signUpEmail.mockRejectedValue(new Error("User already exists"));
    await expect(
      BetterAuth.daftarkanKredensial("ayu@rekanbumi.test", "Rahasia123"),
    ).rejects.toThrow("User already exists");
  });

  it("C22-UT13 buatSesiMasuk: Better Auth menolak kredensial → galat diteruskan, tanpa token", async () => {
    api.signInEmail.mockRejectedValue(new Error("Invalid email or password"));
    await expect(
      BetterAuth.buatSesiMasuk("ayu@rekanbumi.test", "Salah12345"),
    ).rejects.toThrow("Invalid email or password");
  });

  it("C22-UT14 buatSesiMasuk: batas request tanpa header IP tetap membuat sesi", async () => {
    kepala.nilai = new Headers();
    api.signInEmail.mockResolvedValue({ token: "token-tanpa-ip" });
    await expect(
      BetterAuth.buatSesiMasuk("ayu@rekanbumi.test", "Rahasia123"),
    ).resolves.toBe("token-tanpa-ip");
    const argumen = api.signInEmail.mock.calls[0]![0] as { headers: Headers };
    expect(argumen.headers.get("x-forwarded-for")).toBeNull();
  });

  it("C22-UT15 ambilSesi: Better Auth gagal membaca sesi → galat diteruskan", async () => {
    api.getSession.mockRejectedValue(new Error("Sesi rusak"));
    await expect(BetterAuth.ambilSesi()).rejects.toThrow("Sesi rusak");
  });
});
