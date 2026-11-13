import { mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { APIError } from "better-auth/api";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockInstance,
} from "vitest";

// Database palsu di memori: cukup untuk alur registrasi.
const { dbPalsu, tabel } = vi.hoisted(() => {
  const tabel = {
    user: [] as { id: string; email: string }[],
    relawan: [] as Record<string, unknown>[],
    inisiator: [] as Record<string, unknown>[],
    dokumen: [] as Record<string, unknown>[],
    gagalSimpan: false,
  };
  const tx = {
    relawan: {
      create: async ({ data }: { data: Record<string, unknown> }) => {
        if (tabel.gagalSimpan) throw new Error("DB mati");
        tabel.relawan.push(data);
      },
    },
    inisiatorProgram: {
      create: async ({ data }: { data: Record<string, unknown> }) => {
        if (tabel.gagalSimpan) throw new Error("DB mati");
        tabel.inisiator.push(data);
      },
    },
    dokumenVerifikasi: {
      create: async ({ data }: { data: Record<string, unknown> }) => {
        tabel.dokumen.push(data);
      },
    },
  };
  const dbPalsu = {
    user: {
      findUnique: async ({ where }: { where: { email: string } }) =>
        tabel.user.find((u) => u.email === where.email) ?? null,
      delete: vi.fn(async ({ where }: { where: { id: string } }) => {
        tabel.user = tabel.user.filter((u) => u.id !== where.id);
      }),
    },
    $transaction: async (fn: (t: typeof tx) => Promise<void>) => fn(tx),
  };
  return { dbPalsu, tabel };
});

vi.mock("~/server/db", () => ({ db: dbPalsu }));

import { GalatValidasi } from "~/lib/galat";
import { BetterAuth } from "~/server/adapters/BetterAuth";
import {
  AuthController,
  type DataDiri,
} from "~/server/controllers/AuthController";

const PDF = [0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34];

function berkasPdf(): File {
  const isi = new Uint8Array(64);
  isi.set(PDF);
  return new File([isi], "ktp.pdf", { type: "application/pdf" });
}

const dataRelawan: DataDiri = {
  peran: "RELAWAN",
  email: "  Ayu@RekanBumi.Test ",
  kataSandi: "Rahasia123",
  nama: " Ayu Lestari ",
  noTelepon: "081234567890",
  domisili: "Bandung",
  jenisDokumen: "KTP",
};

const dataInisiator: DataDiri = {
  peran: "INISIATOR",
  email: "komunitas@rekanbumi.test",
  kataSandi: "Rahasia123",
  namaLembaga: "Komunitas Hijau",
  tautanSitusResmi: "https://hijau.example.org",
};

/** Pesan galat dari GalatValidasi yang dilempar buatAkunBaru. */
async function galatDari(proses: Promise<unknown>): Promise<string[]> {
  const galat = await proses.then(
    () => null,
    (e: unknown) => e,
  );
  expect(galat).toBeInstanceOf(GalatValidasi);
  return (galat as GalatValidasi).daftarGalat;
}

let folder: string;
let daftarkan: MockInstance<typeof BetterAuth.daftarkanKredensial>;
let urutanId = 0;

beforeEach(async () => {
  folder = await mkdtemp(path.join(tmpdir(), "rekanbumi-uji-"));
  process.env.UPLOAD_DIR = folder;
  Object.assign(tabel, {
    user: [],
    relawan: [],
    inisiator: [],
    dokumen: [],
    gagalSimpan: false,
  });
  dbPalsu.user.delete.mockClear();
  daftarkan = vi
    .spyOn(BetterAuth, "daftarkanKredensial")
    .mockImplementation(async (email) => {
      const id = `id-${++urutanId}`;
      tabel.user.push({ id, email });
      return id;
    });
});

afterEach(async () => {
  vi.restoreAllMocks();
  delete process.env.UPLOAD_DIR;
  await rm(folder, { recursive: true, force: true });
});

describe("AuthController (C13) – validasiKelengkapanData, UC01 alt. 1", () => {
  // Sama seperti buatAkunBaru: isian dirapikan dulu (spasi, huruf besar email).
  const validasi = (data: DataDiri, berkas: File | null) =>
    AuthController["validasiKelengkapanData"](
      AuthController["rapikanData"](data),
      berkas,
    );

  it("Relawan lengkap → tidak ada galat (Algo-C13-02)", () => {
    expect(validasi(dataRelawan, berkasPdf())).toEqual([]);
  });

  it("email salah format dan kata sandi kosong", () => {
    expect(
      validasi(
        { ...dataRelawan, email: "bukan-email", kataSandi: "" },
        berkasPdf(),
      ),
    ).toEqual(["Email tidak valid", "Kata sandi wajib diisi"]);
  });

  it("kata sandi kurang dari 8 karakter", () => {
    expect(
      validasi({ ...dataRelawan, kataSandi: "pendek1" }, berkasPdf()),
    ).toEqual(["Kata sandi minimal 8 karakter"]);
  });

  it("Relawan tanpa data diri dan tanpa dokumen", () => {
    expect(
      validasi({ ...dataRelawan, nama: "  ", noTelepon: undefined }, null),
    ).toEqual(["Data diri tidak lengkap", "Dokumen verifikasi wajib diunggah"]);
  });

  it("Inisiator tanpa nama lembaga; berkas tidak wajib", () => {
    expect(validasi({ ...dataInisiator, namaLembaga: "" }, null)).toEqual([
      "Nama lembaga wajib diisi",
    ]);
    expect(validasi(dataInisiator, null)).toEqual([]);
  });

  it("tautan situs resmi Inisiator: kosong boleh, harus http(s) kalau diisi", () => {
    expect(validasi({ ...dataInisiator, tautanSitusResmi: "" }, null)).toEqual(
      [],
    );
    for (const tautan of [
      "bukan url",
      "ftp://situs.org",
      "javascript:alert(1)",
    ]) {
      expect(
        validasi({ ...dataInisiator, tautanSitusResmi: tautan }, null),
      ).toEqual(["Tautan situs resmi tidak valid"]);
    }
  });

  it("peran selain Relawan/Inisiator ditolak (VERIFIKATOR hanya dari seed)", () => {
    expect(
      validasi({ ...dataRelawan, peran: "VERIFIKATOR" as never }, berkasPdf()),
    ).toEqual(["Peran tidak valid"]);
  });
});

describe("AuthController (C13) – cekStatusVerifikasi", () => {
  const cek = (data: Partial<DataDiri>) =>
    AuthController["cekStatusVerifikasi"]({ ...dataRelawan, ...data });

  it("email belum terverifikasi → MENUNGGU, sudah → TERVERIFIKASI (Algo-C13-03)", () => {
    expect(cek({})).toBe("MENUNGGU");
    expect(cek({ emailTerverifikasi: false })).toBe("MENUNGGU");
    expect(cek({ emailTerverifikasi: true })).toBe("TERVERIFIKASI");
  });
});

describe("AuthController (C13) – buatAkunBaru, UC01", () => {
  it("Relawan: akun, profil, dan dokumen dibuat (Algo-C13-01)", async () => {
    const hasil = await AuthController.buatAkunBaru(dataRelawan, berkasPdf());

    expect(daftarkan).toHaveBeenCalledWith("ayu@rekanbumi.test", "Rahasia123", {
      nama: "Ayu Lestari",
      peran: "RELAWAN",
    });
    expect(hasil).toMatchObject({
      email: "ayu@rekanbumi.test",
      peran: "RELAWAN",
      statusVerifikasi: "MENUNGGU",
      dokumenTerunggah: true,
    });
    expect(tabel.relawan).toEqual([
      {
        nama: "Ayu Lestari",
        noTelepon: "081234567890",
        domisili: "Bandung",
        statusVerifikasi: "MENUNGGU",
        userId: hasil.idPengguna,
      },
    ]);
    expect(tabel.dokumen).toHaveLength(1);
    expect(tabel.dokumen[0]).toMatchObject({
      jenisDokumen: "KTP",
      statusVerifikasi: "MENUNGGU",
      userId: hasil.idPengguna,
    });
    expect(String(tabel.dokumen[0]!.urlFile)).toMatch(/^uploads\/.+\.pdf$/);
    expect(await readdir(folder)).toHaveLength(1);
  });

  it("jenis dokumen kosong memakai nama bawaan", async () => {
    await AuthController.buatAkunBaru(
      { ...dataRelawan, jenisDokumen: undefined },
      berkasPdf(),
    );
    expect(tabel.dokumen[0]!.jenisDokumen).toBe("Dokumen verifikasi diri");
  });

  it("Inisiator tanpa berkas: profil lembaga dibuat, tidak ada dokumen", async () => {
    const hasil = await AuthController.buatAkunBaru(dataInisiator, null);

    expect(daftarkan).toHaveBeenCalledWith(
      "komunitas@rekanbumi.test",
      "Rahasia123",
      { nama: "Komunitas Hijau", peran: "INISIATOR" },
    );
    expect(hasil.dokumenTerunggah).toBe(false);
    expect(tabel.inisiator).toEqual([
      {
        namaLembaga: "Komunitas Hijau",
        tautanSitusResmi: "https://hijau.example.org",
        statusVerifikasi: "MENUNGGU",
        userId: hasil.idPengguna,
      },
    ]);
    expect(tabel.dokumen).toHaveLength(0);
    expect(tabel.relawan).toHaveLength(0);
  });

  it("tautan kosong disimpan sebagai null", async () => {
    await AuthController.buatAkunBaru(
      { ...dataInisiator, tautanSitusResmi: "  " },
      null,
    );
    expect(tabel.inisiator[0]!.tautanSitusResmi).toBeNull();
  });

  it("data tidak lengkap → semua galat sekaligus, tidak ada akun dan berkas (UC01 alt. 1)", async () => {
    const galat = await galatDari(
      AuthController.buatAkunBaru(
        { ...dataRelawan, email: "salah", nama: "", kataSandi: "" },
        berkasPdf(),
      ),
    );
    expect(galat).toEqual([
      "Email tidak valid",
      "Kata sandi wajib diisi",
      "Data diri tidak lengkap",
    ]);
    expect(daftarkan).not.toHaveBeenCalled();
    expect(await readdir(folder)).toHaveLength(0);
  });

  it("Relawan tanpa dokumen → 'Dokumen verifikasi wajib diunggah'", async () => {
    const galat = await galatDari(
      AuthController.buatAkunBaru(dataRelawan, null),
    );
    expect(galat).toEqual(["Dokumen verifikasi wajib diunggah"]);
    expect(daftarkan).not.toHaveBeenCalled();
  });

  it("berkas tidak valid → 'Berkas tidak valid', tanpa akun", async () => {
    const teks = new File(["halo"], "catatan.txt", { type: "text/plain" });
    const galat = await galatDari(
      AuthController.buatAkunBaru(dataRelawan, teks),
    );
    expect(galat).toEqual(["Berkas tidak valid"]);
    expect(daftarkan).not.toHaveBeenCalled();
    expect(await readdir(folder)).toHaveLength(0);
  });

  it("email sudah terdaftar (huruf besar/kecil tidak berpengaruh) → ditolak, berkas tidak tersimpan", async () => {
    tabel.user.push({ id: "id-lama", email: "ayu@rekanbumi.test" });
    const galat = await galatDari(
      AuthController.buatAkunBaru(dataRelawan, berkasPdf()),
    );
    expect(galat).toEqual(["Email sudah terdaftar"]);
    expect(daftarkan).not.toHaveBeenCalled();
    expect(await readdir(folder)).toHaveLength(0);
  });

  it("dua registrasi bersamaan: penolakan Better Auth jadi 'Email sudah terdaftar' dan berkas dihapus", async () => {
    daftarkan.mockRejectedValueOnce(
      new APIError("UNPROCESSABLE_ENTITY", { message: "User already exists" }),
    );
    const galat = await galatDari(
      AuthController.buatAkunBaru(dataRelawan, berkasPdf()),
    );
    expect(galat).toEqual(["Email sudah terdaftar"]);
    expect(await readdir(folder)).toHaveLength(0);
  });

  it("galat lain dari Better Auth diteruskan dan berkas dihapus", async () => {
    daftarkan.mockRejectedValueOnce(new Error("Better Auth error"));
    await expect(
      AuthController.buatAkunBaru(dataRelawan, berkasPdf()),
    ).rejects.toThrow("Better Auth error");
    expect(await readdir(folder)).toHaveLength(0);
  });

  it("penyimpanan profil gagal → akun yang sudah terbentuk dan berkas dibatalkan", async () => {
    tabel.gagalSimpan = true;
    await expect(
      AuthController.buatAkunBaru(dataRelawan, berkasPdf()),
    ).rejects.toThrow("DB mati");

    expect(dbPalsu.user.delete).toHaveBeenCalledTimes(1);
    expect(tabel.user).toHaveLength(0);
    expect(await readdir(folder)).toHaveLength(0);
  });
});
