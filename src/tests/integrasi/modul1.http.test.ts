import { randomUUID } from "node:crypto";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { createEmailVerificationToken } from "better-auth/api";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import {
  AuthController,
  type DataDiri,
} from "~/server/controllers/AuthController";
import { db } from "~/server/db";

// Uji integrasi Modul 1 lewat HTTP (HIUPL 4.3): klien → route tRPC/Better Auth Next.js →
// AuthController → BetterAuth → PostgreSQL. Jalankan `pnpm dev` dulu (alamatnya dari
// NEXT_PUBLIC_APP_URL di .env, bawaan http://localhost:3000) dengan database yang sama.

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const SANDI = "RahasiaUji2026";
const emailUnik = (awalan: string) =>
  `${awalan}-${randomUUID().slice(0, 8)}@rekanbumi.test`;
/** IP berbeda tiap test supaya hitungan blokir IP (KNF06) tidak saling memengaruhi. */
const ipUnik = () =>
  `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`;

const dataRelawan = (email: string): DataDiri => ({
  peran: "RELAWAN",
  email,
  kataSandi: SANDI,
  nama: "Relawan Uji HTTP",
  noTelepon: "081234567890",
  domisili: "Kota Bandung",
});
const pdf = () =>
  new File([new Uint8Array([0x25, 0x50, 0x44, 0x46])], "ktp.pdf", {
    type: "application/pdf",
  });

async function masuk(email: string, kataSandi: string, ip: string) {
  return fetch(`${BASE_URL}/api/trpc/auth.masuk`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify({ json: { email, kataSandi } }),
  });
}

let folderUnggahan: string;
const emailDibuat: string[] = [];

beforeAll(async () => {
  folderUnggahan = await mkdtemp(path.join(tmpdir(), "rekanbumi-http-"));
  process.env.UPLOAD_DIR = folderUnggahan;
  const cek = await fetch(`${BASE_URL}/api/auth/ok`).catch(() => null);
  if (!cek?.ok) {
    throw new Error(
      `Server tidak berjalan di ${BASE_URL}. Jalankan \`pnpm dev\` dulu.`,
    );
  }
});

afterAll(async () => {
  await db.user.deleteMany({ where: { email: { in: emailDibuat } } });
  await rm(folderUnggahan, { recursive: true, force: true });
  await db.$disconnect();
});

describe("Integrasi Modul 1 – HTTP (View/tRPC → C13 → C22 → DB)", () => {
  it("INT-TC05 login benar lewat auth.masuk memasang cookie sesi yang dikenali auth.sesiSaya", async () => {
    const email = emailUnik("int05");
    emailDibuat.push(email);
    await AuthController.buatAkunBaru(dataRelawan(email), pdf());

    const respons = await masuk(email, SANDI, ipUnik());
    expect(respons.status).toBe(200);
    const cookie = respons.headers.get("set-cookie") ?? "";
    expect(cookie).toContain("better-auth.session_token=");

    const sesi = await fetch(`${BASE_URL}/api/trpc/auth.sesiSaya`, {
      headers: { cookie: cookie.split(";")[0]! },
    });
    const isi = (await sesi.json()) as {
      result: { data: { json: { email: string; peran: string } } };
    };
    expect(isi.result.data.json).toMatchObject({ email, peran: "RELAWAN" });
  });

  it("INT-TC06 login salah ditolak 401 tanpa cookie sesi", async () => {
    const email = emailUnik("int06");
    emailDibuat.push(email);
    await AuthController.buatAkunBaru(dataRelawan(email), pdf());

    const respons = await masuk(email, "SalahSandi99", ipUnik());
    expect(respons.status).toBe(401);
    expect(respons.headers.get("set-cookie")).toBeNull();
    const isi = (await respons.json()) as {
      error: { json: { message: string } };
    };
    expect(isi.error.json.message).toBe("Email atau kata sandi salah");
  });

  it("INT-TC09 tautan verifikasi email Better Auth menyinkronkan status Relawan menjadi TERVERIFIKASI", async () => {
    const email = emailUnik("int09");
    emailDibuat.push(email);
    const { idPengguna } = await AuthController.buatAkunBaru(
      dataRelawan(email),
      pdf(),
    );
    const token = await createEmailVerificationToken(
      process.env.BETTER_AUTH_SECRET!,
      email,
    );

    const respons = await fetch(
      `${BASE_URL}/api/auth/verify-email?token=${token}&callbackURL=/`,
      { redirect: "manual" },
    );
    expect(respons.status).toBe(302);

    const user = await db.user.findUnique({ where: { id: idPengguna } });
    const relawan = await db.relawan.findUnique({
      where: { userId: idPengguna },
    });
    expect(user?.emailVerified).toBe(true);
    expect(relawan?.statusVerifikasi).toBe("TERVERIFIKASI");
  });
});
