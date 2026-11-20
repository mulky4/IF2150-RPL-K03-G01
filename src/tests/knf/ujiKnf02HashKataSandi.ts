/**
 * KNF02-TC01 (Security): kata sandi akun baru disimpan sebagai hash bcrypt, bukan teks asli.
 *
 * Akun dibuat lewat endpoint registrasi yang sama dengan formulir I-01 (auth.daftar),
 * lalu tabel `account` Better Auth diinspeksi langsung di database.
 * Server harus sudah jalan. Jalankan dari folder src:
 *   npx tsx --tsconfig tsconfig.json tests/knf/ujiKnf02HashKataSandi.ts [url]
 */
import { randomUUID } from "node:crypto";

import bcrypt from "bcryptjs";

import { db } from "~/server/db";

const URL_APP = process.argv[2] ?? "http://localhost:3000";
const SANDI = "SandiUjiKnf02!";
const POLA_BCRYPT = /^\$2[aby]\$(\d{2})\$[./A-Za-z0-9]{53}$/;

async function main() {
  const email = `knf02-${randomUUID().slice(0, 8)}@rekanbumi.test`;
  const form = new FormData();
  form.set("peran", "INISIATOR");
  form.set("email", email);
  form.set("kataSandi", SANDI);
  form.set("namaLembaga", "Komunitas Uji KNF02");

  const respons = await fetch(`${URL_APP}/api/trpc/auth.daftar`, {
    method: "POST",
    body: form,
  });
  console.log(`Registrasi ${email}: HTTP ${respons.status}`);
  if (!respons.ok) throw new Error(await respons.text());

  const akun = await db.account.findFirst({
    where: { providerId: "credential", user: { email } },
    select: { password: true },
  });
  const hash = akun?.password ?? "";
  const cocok = POLA_BCRYPT.exec(hash);
  const teksAsliTersimpan = hash.includes(SANDI);
  const bisaDiverifikasi = await bcrypt.compare(SANDI, hash);

  // Seluruh akun kredensial di database juga diperiksa, bukan hanya akun uji.
  const semua = await db.account.findMany({
    where: { providerId: "credential" },
    select: { password: true },
  });
  const bukanBcrypt = semua.filter((a) => !POLA_BCRYPT.test(a.password ?? ""));

  console.log(`Nilai kolom account.password : ${hash}`);
  console.log(`Format bcrypt                : ${cocok ? "ya" : "tidak"}`);
  console.log(`Cost factor                  : ${cocok?.[1] ?? "-"}`);
  console.log(
    `Teks asli ikut tersimpan     : ${teksAsliTersimpan ? "ya" : "tidak"}`,
  );
  console.log(`bcrypt.compare(sandi, hash)  : ${bisaDiverifikasi}`);
  console.log(
    `Akun kredensial di DB        : ${semua.length}, bukan bcrypt: ${bukanBcrypt.length}`,
  );

  await db.user.delete({ where: { email } });
  const lulus =
    cocok !== null &&
    !teksAsliTersimpan &&
    bisaDiverifikasi &&
    bukanBcrypt.length === 0;
  console.log(`\nKNF02-TC01: ${lulus ? "Pass" : "Fail"}`);
  process.exitCode = lulus ? 0 : 1;
}

main()
  .catch((galat) => {
    console.error(galat);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
