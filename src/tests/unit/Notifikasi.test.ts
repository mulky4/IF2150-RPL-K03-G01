import { beforeEach, describe, expect, it, vi } from "vitest";

// Database palsu: tabel user dan tbl_notifikasi di memori.
const { dbPalsu, tabel } = vi.hoisted(() => {
  type Baris = {
    id: string;
    pesan: string;
    waktuKirim: Date;
    statusDibaca: boolean;
    userId: string;
  };
  const tabel = {
    user: [] as { id: string; email: string }[],
    notifikasi: [] as Baris[],
  };
  const dbPalsu = {
    user: {
      findUnique: async ({ where }: { where: { id: string } }) =>
        tabel.user.find((u) => u.id === where.id) ?? null,
    },
    notifikasi: {
      create: async ({ data }: { data: Baris }) => {
        tabel.notifikasi.push({ ...data });
        return data;
      },
      findUnique: async ({ where }: { where: { id: string } }) => {
        const baris = tabel.notifikasi.find((n) => n.id === where.id);
        return baris ? { ...baris } : null;
      },
      findMany: async ({ where }: { where: { userId: string } }) =>
        tabel.notifikasi
          .filter((n) => n.userId === where.userId)
          .sort((a, b) => b.waktuKirim.getTime() - a.waktuKirim.getTime())
          .map((n) => ({ ...n })),
      update: vi.fn(
        async ({
          where,
          data,
        }: {
          where: { id: string };
          data: { statusDibaca: boolean };
        }) => {
          const baris = tabel.notifikasi.find((n) => n.id === where.id);
          // Seperti Prisma: update baris yang tidak ada melempar galat (P2025).
          if (!baris) throw new Error("Record to update not found");
          baris.statusDibaca = data.statusDibaca;
          return baris;
        },
      ),
    },
  };
  return { dbPalsu, tabel };
});

vi.mock("~/server/db", () => ({ db: dbPalsu }));

import {
  AuthController,
  GalatTidakDitemukan,
} from "~/server/controllers/AuthController";
import { Notifikasi } from "~/server/models/Notifikasi";

const AYU = "id-ayu";
const BIMA = "id-bima";

beforeEach(() => {
  tabel.user = [
    { id: AYU, email: "ayu@rekanbumi.test" },
    { id: BIMA, email: "bima@rekanbumi.test" },
  ];
  tabel.notifikasi = [];
  dbPalsu.notifikasi.update.mockClear();
  vi.useRealTimers();
});

/** Kirim notifikasi dengan jam tertentu supaya urutan waktunya pasti. */
async function kirimPada(jam: string, idPenerima: string, pesan: string) {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(`2026-11-10T${jam}:00+07:00`));
  const notifikasi = Notifikasi.baru(idPenerima, pesan);
  await notifikasi.kirim();
  vi.useRealTimers();
  return notifikasi;
}

describe("Notifikasi (C10)", () => {
  it("C10-UT01 kirim() menyimpan notifikasi belum dibaca untuk penerimanya (Algo-C10-01)", async () => {
    await kirimPada("09:00", AYU, "Kamu diterima di Penanaman Pohon");
    expect(tabel.notifikasi).toHaveLength(1);
    expect(tabel.notifikasi[0]).toMatchObject({
      userId: AYU,
      pesan: "Kamu diterima di Penanaman Pohon",
      statusDibaca: false,
    });
  });

  it("C10-UT02 kirim() menolak pesan yang hanya berisi spasi", async () => {
    await expect(Notifikasi.baru(AYU, "   ").kirim()).rejects.toThrow(
      "Pesan notifikasi tidak boleh kosong",
    );
    expect(tabel.notifikasi).toHaveLength(0);
  });

  it("C10-UT03 kirim() menolak pesan string kosong", async () => {
    await expect(Notifikasi.baru(AYU, "").kirim()).rejects.toThrow(
      "Pesan notifikasi tidak boleh kosong",
    );
    expect(tabel.notifikasi).toHaveLength(0);
  });

  it("C10-UT04 baca() hanya menulis ke DB sekali (Algo-C10-02)", async () => {
    const notifikasi = await kirimPada("09:00", AYU, "Halo");
    await notifikasi.baca();
    await notifikasi.baca();
    expect(dbPalsu.notifikasi.update).toHaveBeenCalledTimes(1);
    expect(notifikasi.keData().statusDibaca).toBe(true);
  });

  it("C10-UT05 showDetail() mengembalikan isi pesan (Algo-C10-03)", () => {
    expect(Notifikasi.baru(AYU, "Isi lengkap").showDetail()).toBe(
      "Isi lengkap",
    );
  });

  it("C10-UT08 baca(): notifikasi belum dibaca menjadi sudah dibaca di objek dan tabel", async () => {
    const notifikasi = await kirimPada("09:00", AYU, "Halo");
    await notifikasi.baca();
    expect(dbPalsu.notifikasi.update).toHaveBeenCalledWith({
      where: { id: notifikasi.keData().idNotifikasi },
      data: { statusDibaca: true },
    });
    expect(tabel.notifikasi[0]!.statusDibaca).toBe(true);
  });

  it("C10-UT09 baca(): notifikasi yang belum tersimpan di DB → galat diteruskan", async () => {
    await expect(Notifikasi.baru(AYU, "Belum dikirim").baca()).rejects.toThrow(
      "Record to update not found",
    );
  });

  it("C10-UT10 showDetail(): batas pesan satu karakter dan pesan panjang dikembalikan utuh", () => {
    const panjang = "Selamat! ".repeat(100).trim();
    expect(Notifikasi.baru(AYU, "!").showDetail()).toBe("!");
    expect(Notifikasi.baru(AYU, panjang).showDetail()).toBe(panjang);
  });

  it("C10-UT11 showDetail(): baris lama berpesan kosong mengembalikan string kosong tanpa galat", () => {
    const notifikasi = Notifikasi.dariBaris({
      id: "n-kosong",
      userId: AYU,
      pesan: "",
      waktuKirim: new Date(),
      statusDibaca: false,
    });
    expect(notifikasi.showDetail()).toBe("");
  });

  it("C10-UT06 milik() true hanya untuk penerimanya", () => {
    const notifikasi = Notifikasi.baru(AYU, "Untuk Ayu");
    expect(notifikasi.milik(AYU)).toBe(true);
    expect(notifikasi.milik(BIMA)).toBe(false);
    expect(notifikasi.milik("")).toBe(false);
  });

  it("C10-UT07 dariBaris() lalu keData() dan keDataUntukPenyimpanan() mempertahankan isi baris", () => {
    const baris = {
      id: "n-1",
      userId: AYU,
      pesan: "Hasil seleksi: Diterima",
      waktuKirim: new Date("2026-11-10T09:00:00+07:00"),
      statusDibaca: true,
    };
    const notifikasi = Notifikasi.dariBaris(baris);
    expect(notifikasi.keData()).toEqual({
      idNotifikasi: "n-1",
      pesan: "Hasil seleksi: Diterima",
      waktuKirim: baris.waktuKirim,
      statusDibaca: true,
    });
    expect(notifikasi.keDataUntukPenyimpanan()).toEqual(baris);
  });
});

describe("AuthController (C13) – notifikasi akun, UC06", () => {
  it("C13-UT30 ambilNotifikasi: hanya milik pengguna itu, terbaru di atas (Algo-C13-11)", async () => {
    await kirimPada("08:00", AYU, "Pesan lama");
    await kirimPada("10:00", AYU, "Pesan baru");
    await kirimPada("09:00", BIMA, "Punya Bima");

    const daftar = await AuthController.ambilNotifikasi(AYU);
    expect(daftar.map((n) => n.showDetail())).toEqual([
      "Pesan baru",
      "Pesan lama",
    ]);
  });

  it("C13-UT31 ambilNotifikasi: daftar kosong kalau belum ada notifikasi", async () => {
    await expect(AuthController.ambilNotifikasi(AYU)).resolves.toEqual([]);
  });

  it("C13-UT32 ambilNotifikasi: pengguna tidak ada → GalatTidakDitemukan", async () => {
    await expect(
      AuthController.ambilNotifikasi("id-tidak-ada"),
    ).rejects.toBeInstanceOf(GalatTidakDitemukan);
  });

  it("C13-UT33 bacaNotifikasi: menandai sudah dibaca dan mengembalikan isinya (Algo-C13-12)", async () => {
    const terkirim = await kirimPada("09:00", AYU, "Selamat bergabung");
    const { idNotifikasi } = terkirim.keData();

    const dibaca = await AuthController.bacaNotifikasi(idNotifikasi, AYU);
    expect(dibaca.showDetail()).toBe("Selamat bergabung");
    expect(dibaca.keData().statusDibaca).toBe(true);
    expect(tabel.notifikasi[0]!.statusDibaca).toBe(true);
  });

  it("C13-UT34 bacaNotifikasi: notifikasi milik orang lain dianggap tidak ada", async () => {
    const punyaBima = await kirimPada("09:00", BIMA, "Rahasia Bima");
    await expect(
      AuthController.bacaNotifikasi(punyaBima.keData().idNotifikasi, AYU),
    ).rejects.toBeInstanceOf(GalatTidakDitemukan);
    expect(tabel.notifikasi[0]!.statusDibaca).toBe(false);
  });

  it("C13-UT41 bacaNotifikasi: batas notifikasi yang sudah dibaca dibuka lagi, tidak ditulis ulang", async () => {
    const terkirim = await kirimPada("09:00", AYU, "Sudah dibaca");
    const { idNotifikasi } = terkirim.keData();
    await AuthController.bacaNotifikasi(idNotifikasi, AYU);
    const lagi = await AuthController.bacaNotifikasi(idNotifikasi, AYU);
    expect(lagi.keData().statusDibaca).toBe(true);
    expect(dbPalsu.notifikasi.update).toHaveBeenCalledTimes(1);
  });

  it("C13-UT35 bacaNotifikasi: id tidak ada → GalatTidakDitemukan", async () => {
    await expect(
      AuthController.bacaNotifikasi("id-tidak-ada", AYU),
    ).rejects.toBeInstanceOf(GalatTidakDitemukan);
  });
});
