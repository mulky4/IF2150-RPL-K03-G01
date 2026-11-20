import { randomUUID } from "node:crypto";
import { mkdtemp, readdir, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { GalatValidasi } from "~/lib/galat";
import { BetterAuth } from "~/server/adapters/BetterAuth";
import {
  AuthController,
  GalatTidakDitemukan,
  type DataDiri,
} from "~/server/controllers/AuthController";
import { db } from "~/server/db";
import { Notifikasi } from "~/server/models/Notifikasi";

// Uji integrasi Modul 1 (HIUPL 4.3): AuthController, BetterAuth, CloudStorageAdapter,
// Pengguna, dan Notifikasi dengan PostgreSQL dan folder unggahan sungguhan. Tanpa mock.

const SANDI = "RahasiaUji2026";
const emailUnik = (awalan: string) =>
  `${awalan}-${randomUUID().slice(0, 8)}@rekanbumi.test`;
const pdf = () =>
  new File([new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31])], "ktp.pdf", {
    type: "application/pdf",
  });
const dataRelawan = (email: string): DataDiri => ({
  peran: "RELAWAN",
  email,
  kataSandi: SANDI,
  nama: "Relawan Uji Integrasi",
  noTelepon: "081234567890",
  domisili: "Kota Bandung",
  jenisDokumen: "KTP",
});

let folderUnggahan: string;
const emailDibuat: string[] = [];

beforeAll(async () => {
  folderUnggahan = await mkdtemp(path.join(tmpdir(), "rekanbumi-int-"));
  process.env.UPLOAD_DIR = folderUnggahan;
});

afterAll(async () => {
  await db.user.deleteMany({ where: { email: { in: emailDibuat } } });
  await rm(folderUnggahan, { recursive: true, force: true });
  await db.$disconnect();
});

describe("Integrasi Modul 1 – registrasi (C13 → C22, C21, DB)", () => {
  it("INT-TC01 registrasi Relawan menyimpan akun, hash, profil, dokumen, dan berkas", async () => {
    const email = emailUnik("int01");
    emailDibuat.push(email);

    const hasil = await AuthController.buatAkunBaru(dataRelawan(email), pdf());

    const user = await db.user.findUnique({
      where: { email },
      include: { accounts: true },
    });
    const relawan = await db.relawan.findUnique({
      where: { userId: hasil.idPengguna },
    });
    const dokumen = await db.dokumenVerifikasi.findMany({
      where: { userId: hasil.idPengguna },
    });
    expect(user?.peran).toBe("RELAWAN");
    expect(user?.accounts[0]?.providerId).toBe("credential");
    expect(user?.accounts[0]?.password).toMatch(/^\$2[ab]\$10\$/);
    expect(relawan?.statusVerifikasi).toBe("MENUNGGU");
    expect(dokumen).toHaveLength(1);
    expect(dokumen[0]!.jenisDokumen).toBe("KTP");
    const berkas = await stat(
      path.join(folderUnggahan, path.basename(dokumen[0]!.urlFile)),
    );
    expect(berkas.size).toBe(6);
  });

  it("INT-TC02 email yang sudah terdaftar ditolak tanpa menambah akun maupun berkas", async () => {
    const email = emailUnik("int02");
    emailDibuat.push(email);
    await AuthController.buatAkunBaru(dataRelawan(email), pdf());
    const jumlahUser = await db.user.count();
    const jumlahBerkas = (await readdir(folderUnggahan)).length;

    await expect(
      AuthController.buatAkunBaru(dataRelawan(email.toUpperCase()), pdf()),
    ).rejects.toMatchObject({ daftarGalat: ["Email sudah terdaftar"] });

    expect(await db.user.count()).toBe(jumlahUser);
    expect((await readdir(folderUnggahan)).length).toBe(jumlahBerkas);
  });

  it("INT-TC03 data diri tidak lengkap (UC01 alt. 1) tidak membuat baris apa pun", async () => {
    const email = emailUnik("int03");
    emailDibuat.push(email);

    const galat = await AuthController.buatAkunBaru(
      { ...dataRelawan(email), nama: "", domisili: "" },
      null,
    ).catch((g: unknown) => g);

    expect(galat).toBeInstanceOf(GalatValidasi);
    expect((galat as GalatValidasi).daftarGalat).toEqual([
      "Data diri tidak lengkap",
      "Dokumen verifikasi wajib diunggah",
    ]);
    expect(await db.user.findUnique({ where: { email } })).toBeNull();
  });
});

describe("Integrasi Modul 1 – kredensial (C22 → DB Better Auth)", () => {
  it("INT-TC04 verifikasiKredensial mencocokkan hash yang tersimpan di tabel account", async () => {
    const email = emailUnik("int04");
    emailDibuat.push(email);
    const { idPengguna } = await AuthController.buatAkunBaru(
      {
        peran: "INISIATOR",
        email,
        kataSandi: SANDI,
        namaLembaga: "Komunitas Uji",
      },
      null,
    );

    await expect(BetterAuth.verifikasiKredensial(email, SANDI)).resolves.toBe(
      idPengguna,
    );
    await expect(
      BetterAuth.verifikasiKredensial(email, "SalahSandi99"),
    ).resolves.toBeNull();
  });
});

describe("Integrasi Modul 1 – notifikasi (C13 → C04 → C10 → DB)", () => {
  it("INT-TC07 notifikasi terkirim terbaca lewat AuthController dan status dibaca tersimpan", async () => {
    const email = emailUnik("int07");
    emailDibuat.push(email);
    const { idPengguna } = await AuthController.buatAkunBaru(
      dataRelawan(email),
      pdf(),
    );
    await Notifikasi.baru(idPengguna, "Pendaftaran pertama: Diterima").kirim();
    await new Promise((r) => setTimeout(r, 5));
    await Notifikasi.baru(idPengguna, "Pendaftaran kedua: Ditolak").kirim();

    const daftar = await AuthController.ambilNotifikasi(idPengguna);
    expect(daftar.map((n) => n.showDetail())).toEqual([
      "Pendaftaran kedua: Ditolak",
      "Pendaftaran pertama: Diterima",
    ]);

    const { idNotifikasi } = daftar[0]!.keData();
    await AuthController.bacaNotifikasi(idNotifikasi, idPengguna);
    const baris = await db.notifikasi.findUnique({
      where: { id: idNotifikasi },
    });
    expect(baris?.statusDibaca).toBe(true);
  });

  it("INT-TC08 notifikasi milik pengguna lain tidak bisa dibaca dan tidak berubah di DB", async () => {
    const emailA = emailUnik("int08a");
    const emailB = emailUnik("int08b");
    emailDibuat.push(emailA, emailB);
    const a = await AuthController.buatAkunBaru(dataRelawan(emailA), pdf());
    const b = await AuthController.buatAkunBaru(dataRelawan(emailB), pdf());
    const milikB = Notifikasi.baru(b.idPengguna, "Rahasia B");
    await milikB.kirim();
    const { idNotifikasi } = milikB.keData();

    await expect(
      AuthController.bacaNotifikasi(idNotifikasi, a.idPengguna),
    ).rejects.toBeInstanceOf(GalatTidakDitemukan);
    const baris = await db.notifikasi.findUnique({
      where: { id: idNotifikasi },
    });
    expect(baris?.statusDibaca).toBe(false);
  });
});
