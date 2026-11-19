/**
 * KNF06 (Security): setelah 5 kali gagal login berturut-turut dari satu IP, permintaan
 * berikutnya dari IP itu ditolak selama 5 menit.
 *
 * KNF06-TC01: 5x kata sandi salah, lalu percobaan ke-6 dengan kata sandi BENAR harus ditolak
 *             (HTTP 429), sementara IP lain tetap bisa masuk.
 * KNF06-TC02 (opsi --tunggu): setelah 5 menit, IP yang sama bisa masuk lagi.
 *
 * Server harus sudah jalan. Jalankan dari folder src:
 *   npx tsx --tsconfig tsconfig.json tests/knf/ujiKnf06BlokirIP.ts [url] [--tunggu]
 */
import { randomUUID } from "node:crypto";

import { db } from "~/server/db";

const argumen = process.argv.slice(2);
const TUNGGU = argumen.includes("--tunggu");
const URL_APP =
  argumen.find((a) => !a.startsWith("--")) ?? "http://localhost:3000";
const SANDI = "SandiUjiKnf06!";
const IP_UJI = `10.66.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`;
const IP_LAIN = `10.67.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`;

const jam = () => new Date().toLocaleTimeString("id-ID", { hour12: false });

async function masuk(email: string, kataSandi: string, ip: string) {
  const respons = await fetch(`${URL_APP}/api/trpc/auth.masuk`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify({ json: { email, kataSandi } }),
  });
  const isi = (await respons.json()) as {
    error?: { json?: { message?: string } };
  };
  return {
    status: respons.status,
    pesan: isi.error?.json?.message ?? "berhasil masuk",
  };
}

async function main() {
  const email = `knf06-${randomUUID().slice(0, 8)}@rekanbumi.test`;
  const form = new FormData();
  form.set("peran", "INISIATOR");
  form.set("email", email);
  form.set("kataSandi", SANDI);
  form.set("namaLembaga", "Komunitas Uji KNF06");
  const daftar = await fetch(`${URL_APP}/api/trpc/auth.daftar`, {
    method: "POST",
    body: form,
  });
  if (!daftar.ok) throw new Error(await daftar.text());
  console.log(`Akun uji ${email}, IP uji ${IP_UJI}\n`);

  let lulus = true;
  for (let i = 1; i <= 5; i++) {
    const h = await masuk(email, "SandiSalah123", IP_UJI);
    console.log(
      `[${jam()}] Percobaan ${i} (sandi salah) : HTTP ${h.status} – ${h.pesan}`,
    );
    lulus &&= h.status === 401;
  }
  const keenam = await masuk(email, SANDI, IP_UJI);
  console.log(
    `[${jam()}] Percobaan 6 (sandi BENAR) : HTTP ${keenam.status} – ${keenam.pesan}`,
  );
  const ipLain = await masuk(email, SANDI, IP_LAIN);
  console.log(
    `[${jam()}] IP lain ${IP_LAIN} (sandi benar) : HTTP ${ipLain.status} – ${ipLain.pesan}`,
  );
  const tc01 = lulus && keenam.status === 429 && ipLain.status === 200;
  console.log(`\nKNF06-TC01: ${tc01 ? "Pass" : "Fail"}`);

  let tc02: boolean | null = null;
  if (TUNGGU) {
    const sebelum = await masuk(email, SANDI, IP_UJI);
    console.log(
      `\n[${jam()}] Masih dalam 5 menit (sandi benar) : HTTP ${sebelum.status} – ${sebelum.pesan}`,
    );
    console.log(`Menunggu 5 menit 5 detik ...`);
    await new Promise((r) => setTimeout(r, (5 * 60 + 5) * 1000));
    const sesudah = await masuk(email, SANDI, IP_UJI);
    console.log(
      `[${jam()}] Setelah 5 menit (sandi benar) : HTTP ${sesudah.status} – ${sesudah.pesan}`,
    );
    tc02 = sebelum.status === 429 && sesudah.status === 200;
    console.log(`\nKNF06-TC02: ${tc02 ? "Pass" : "Fail"}`);
  }

  await db.user.delete({ where: { email } });
  process.exitCode = tc01 && tc02 !== false ? 0 : 1;
}

main()
  .catch((galat) => {
    console.error(galat);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
