import { beforeEach, describe, expect, it, vi } from "vitest";

// Tabel relawan palsu di memori, mengikuti perilaku updateMany Prisma.
const { dbPalsu, relawan } = vi.hoisted(() => {
  const relawan: { userId: string; statusVerifikasi: string }[] = [];
  const dbPalsu = {
    relawan: {
      updateMany: async ({
        where,
        data,
      }: {
        where: { userId: string; statusVerifikasi: string };
        data: { statusVerifikasi: string };
      }) => {
        const cocok = relawan.filter(
          (r) =>
            r.userId === where.userId &&
            r.statusVerifikasi === where.statusVerifikasi,
        );
        cocok.forEach((r) => (r.statusVerifikasi = data.statusVerifikasi));
        return { count: cocok.length };
      },
    },
  };
  return { dbPalsu, relawan };
});

vi.mock("~/server/db", () => ({ db: dbPalsu }));

import { AuthController } from "~/server/controllers/AuthController";

beforeEach(() => {
  relawan.length = 0;
  relawan.push(
    { userId: "u-menunggu", statusVerifikasi: "MENUNGGU" },
    { userId: "u-ditolak", statusVerifikasi: "DITOLAK" },
    { userId: "u-lain", statusVerifikasi: "MENUNGGU" },
  );
});

describe("AuthController.sinkronStatusVerifikasi (issue #8)", () => {
  it("relawan MENUNGGU menjadi TERVERIFIKASI setelah email terverifikasi", async () => {
    await expect(
      AuthController.sinkronStatusVerifikasi("u-menunggu"),
    ).resolves.toBe(true);
    expect(relawan[0]?.statusVerifikasi).toBe("TERVERIFIKASI");
  });

  it("tidak mengubah relawan lain", async () => {
    await AuthController.sinkronStatusVerifikasi("u-menunggu");
    expect(relawan[2]?.statusVerifikasi).toBe("MENUNGGU");
  });

  it("status DITOLAK tidak ditimpa", async () => {
    await expect(
      AuthController.sinkronStatusVerifikasi("u-ditolak"),
    ).resolves.toBe(false);
    expect(relawan[1]?.statusVerifikasi).toBe("DITOLAK");
  });

  it("aman dipanggil dua kali dan untuk pengguna tanpa profil relawan (Inisiator)", async () => {
    await AuthController.sinkronStatusVerifikasi("u-menunggu");
    await expect(
      AuthController.sinkronStatusVerifikasi("u-menunggu"),
    ).resolves.toBe(false);
    await expect(
      AuthController.sinkronStatusVerifikasi("u-inisiator"),
    ).resolves.toBe(false);
  });
});
