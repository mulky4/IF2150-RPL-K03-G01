/**
 * Menyiapkan data untuk uji beban check-in: satu program aktif yang sedang
 * berlangsung, sejumlah relawan yang sudah diterima di program itu, dan sesi
 * login untuk tiap relawan. Cookie sesi disimpan ke file JSON yang dibaca
 * ujiBebanCheckIn.ts.
 *
 * Data ini terpisah dari seed dan hanya untuk database lokal.
 *
 * Jalankan dari folder src:
 *   npx tsx --tsconfig tsconfig.json tests/beban/siapkanDataBeban.ts [jumlah]
 *   npx tsx --tsconfig tsconfig.json tests/beban/siapkanDataBeban.ts --bersihkan
 */
import { writeFileSync } from "node:fs";

import { auth } from "~/server/auth";
import { db } from "~/server/db";

import { FILE_SESI, ID_PROGRAM_BEBAN } from "./konstanta";

const AWALAN_EMAIL = "beban-";
const DOMAIN_EMAIL = "@rekanbumi.test";
// Kata sandi khusus akun uji beban di database lokal.
const KATA_SANDI = "UjiBeban2026!";

function emailKe(i: number) {
  return `${AWALAN_EMAIL}${String(i).padStart(3, "0")}${DOMAIN_EMAIL}`;
}

async function bersihkan() {
  const pengguna = await db.user.findMany({
    where: { email: { startsWith: AWALAN_EMAIL, endsWith: DOMAIN_EMAIL } },
    select: { id: true },
  });
  const idPengguna = pengguna.map((p) => p.id);
  await db.kehadiran.deleteMany({ where: { programId: ID_PROGRAM_BEBAN } });
  await db.pendaftaran.deleteMany({ where: { programId: ID_PROGRAM_BEBAN } });
  await db.program.deleteMany({ where: { id: ID_PROGRAM_BEBAN } });
  // Relawan, sesi, dan akun ikut terhapus lewat cascade dari tabel user.
  await db.user.deleteMany({ where: { id: { in: idPengguna } } });
  console.log(`Data uji beban dihapus (${idPengguna.length} akun).`);
}

async function siapkan(jumlah: number) {
  const inisiator = await db.inisiatorProgram.findFirst({
    select: { id: true },
  });
  if (!inisiator) {
    throw new Error("Belum ada inisiator. Jalankan pnpm db:seed dulu.");
  }

  const sekarang = Date.now();
  const jadwal = {
    waktuMulai: new Date(sekarang - 60 * 60_000),
    waktuSelesai: new Date(sekarang + 3 * 60 * 60_000),
    status: "AKTIF" as const,
  };
  await db.program.upsert({
    where: { id: ID_PROGRAM_BEBAN },
    update: jadwal,
    create: {
      id: ID_PROGRAM_BEBAN,
      namaProgram: "Uji Beban Check-in",
      deskripsi: "Program khusus uji beban check-in.",
      kategori: "JAGA_ALAM",
      tempatPelaksanaan: "Lokal",
      kuota: jumlah,
      syaratKetentuan: "-",
      inisiatorProgramId: inisiator.id,
      ...jadwal,
    },
  });
  await db.kehadiran.deleteMany({ where: { programId: ID_PROGRAM_BEBAN } });

  const cookies: string[] = [];
  for (let i = 1; i <= jumlah; i++) {
    const email = emailKe(i);
    let user = await db.user.findUnique({ where: { email } });
    if (!user) {
      await auth.api.signUpEmail({
        body: { email, password: KATA_SANDI, name: `Relawan Beban ${i}` },
      });
      user = await db.user.findUniqueOrThrow({ where: { email } });
    }

    const relawan = await db.relawan.upsert({
      where: { userId: user.id },
      update: { statusVerifikasi: "TERVERIFIKASI" },
      create: {
        userId: user.id,
        nama: `Relawan Beban ${i}`,
        noTelepon: "080000000000",
        domisili: "Lokal",
        statusVerifikasi: "TERVERIFIKASI",
      },
    });
    const ada = await db.pendaftaran.findFirst({
      where: { relawanId: relawan.id, programId: ID_PROGRAM_BEBAN },
    });
    if (!ada) {
      await db.pendaftaran.create({
        data: {
          relawanId: relawan.id,
          programId: ID_PROGRAM_BEBAN,
          keterampilan: "-",
          ketersediaanWaktu: "-",
          status: "DITERIMA",
        },
      });
    }

    // Login langsung lewat API server, bukan lewat HTTP, supaya tidak kena
    // batas percobaan login per IP.
    const respons = await auth.api.signInEmail({
      body: { email, password: KATA_SANDI },
      asResponse: true,
    });
    const setCookie = respons.headers.getSetCookie();
    const cookie = setCookie.map((c) => c.split(";")[0]).join("; ");
    if (!cookie) throw new Error(`Gagal login untuk ${email}`);
    cookies.push(cookie);
  }

  writeFileSync(
    FILE_SESI,
    JSON.stringify({ idProgram: ID_PROGRAM_BEBAN, cookies }, null, 2),
  );
  console.log(
    `${jumlah} relawan siap di program ${ID_PROGRAM_BEBAN}. Sesi disimpan di ${FILE_SESI}`,
  );
}

async function main() {
  const argumen = process.argv.slice(2);
  try {
    if (argumen.includes("--bersihkan")) {
      await bersihkan();
    } else {
      await siapkan(Number(argumen[0] ?? 50));
    }
  } finally {
    await db.$disconnect();
  }
}

void main();
