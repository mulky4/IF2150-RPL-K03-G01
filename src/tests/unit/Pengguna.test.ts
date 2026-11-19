import { beforeEach, describe, expect, it, vi } from "vitest";

// Database palsu: tabel user dan tbl_notifikasi di memori.
const { tabel } = vi.hoisted(() => {
  const tabel = {
    user: [] as { id: string; email: string }[],
    notifikasi: [] as {
      id: string;
      pesan: string;
      waktuKirim: Date;
      statusDibaca: boolean;
      userId: string;
    }[],
  };
  return { tabel };
});

vi.mock("~/server/db", () => ({
  db: {
    user: {
      findUnique: async ({ where }: { where: { id: string } }) =>
        tabel.user.find((u) => u.id === where.id) ?? null,
    },
    notifikasi: {
      findMany: async ({ where }: { where: { userId: string } }) =>
        tabel.notifikasi
          .filter((n) => n.userId === where.userId)
          .sort((a, b) => b.waktuKirim.getTime() - a.waktuKirim.getTime()),
    },
  },
}));

import { Pengguna } from "~/server/models/Pengguna";

beforeEach(() => {
  tabel.user = [{ id: "id-ayu", email: "ayu@rekanbumi.test" }];
  tabel.notifikasi = [
    {
      id: "n-1",
      pesan: "Lama",
      waktuKirim: new Date("2026-11-10T08:00:00+07:00"),
      statusDibaca: true,
      userId: "id-ayu",
    },
    {
      id: "n-2",
      pesan: "Baru",
      waktuKirim: new Date("2026-11-10T10:00:00+07:00"),
      statusDibaca: false,
      userId: "id-ayu",
    },
    {
      id: "n-3",
      pesan: "Punya orang lain",
      waktuKirim: new Date("2026-11-10T11:00:00+07:00"),
      statusDibaca: false,
      userId: "id-bima",
    },
  ];
});

describe("Pengguna (C04)", () => {
  it("C04-UT01 cari() lalu lihatNotifikasi(): hanya milik pengguna itu, terbaru di atas (Algo-C04-01)", async () => {
    const pengguna = await Pengguna.cari("id-ayu");
    expect(pengguna).not.toBeNull();
    const daftar = await pengguna!.lihatNotifikasi();
    expect(daftar.map((n) => n.showDetail())).toEqual(["Baru", "Lama"]);
  });

  it("C04-UT02 cari(): id tidak terdaftar → null", async () => {
    await expect(Pengguna.cari("id-tidak-ada")).resolves.toBeNull();
  });

  it("C04-UT03 lihatNotifikasi(): pengguna tanpa notifikasi → daftar kosong", async () => {
    tabel.user.push({ id: "id-baru", email: "baru@rekanbumi.test" });
    const pengguna = await Pengguna.cari("id-baru");
    await expect(pengguna!.lihatNotifikasi()).resolves.toEqual([]);
  });
});
