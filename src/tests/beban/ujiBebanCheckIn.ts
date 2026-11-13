/**
 * Uji beban check-in: semua relawan dari siapkanDataBeban.ts check-in ke
 * program yang sama secara bersamaan, lalu dihitung berapa yang gagal dan
 * berapa lama waktu responsnya. Target: kegagalan paling banyak 5%.
 *
 * Server harus sudah jalan (sebaiknya hasil `next build` + `next start`).
 * Jalankan dari folder src:
 *   npx tsx --tsconfig tsconfig.json tests/beban/ujiBebanCheckIn.ts [putaran] [url]
 */
import { readFileSync } from "node:fs";
import { performance } from "node:perf_hooks";

import { db } from "~/server/db";

import { FILE_SESI } from "./konstanta";

const BATAS_GAGAL = 0.05;

type HasilRequest = { berhasil: boolean; ms: number; pesan: string };

async function checkIn(
  url: string,
  idProgram: string,
  cookie: string,
): Promise<HasilRequest> {
  const mulai = performance.now();
  try {
    const respons = await fetch(`${url}/api/trpc/presensi.prosesCheckIn`, {
      method: "POST",
      headers: { "content-type": "application/json", cookie },
      body: JSON.stringify({ json: { idProgram } }),
    });
    const isi = (await respons.json()) as {
      error?: { json?: { message?: string } };
    };
    return {
      berhasil: respons.ok && !isi.error,
      ms: performance.now() - mulai,
      pesan: isi.error?.json?.message ?? `HTTP ${respons.status}`,
    };
  } catch (galat) {
    return {
      berhasil: false,
      ms: performance.now() - mulai,
      pesan: (galat as Error).message,
    };
  }
}

function persentil(urut: number[], p: number) {
  return urut[
    Math.min(urut.length - 1, Math.ceil((p / 100) * urut.length) - 1)
  ]!;
}

async function satuPutaran(
  url: string,
  idProgram: string,
  cookies: string[],
  ke: number,
) {
  // Hapus kehadiran dari putaran sebelumnya supaya semua relawan bisa
  // check-in lagi.
  await db.kehadiran.deleteMany({ where: { programId: idProgram } });

  const mulai = performance.now();
  const hasil = await Promise.all(
    cookies.map((cookie) => checkIn(url, idProgram, cookie)),
  );
  const totalMs = performance.now() - mulai;

  const gagal = hasil.filter((h) => !h.berhasil);
  const waktu = hasil.map((h) => h.ms).sort((a, b) => a - b);
  const rataRata = waktu.reduce((a, b) => a + b, 0) / waktu.length;
  const tercatat = await db.kehadiran.count({
    where: { programId: idProgram },
  });

  console.log(
    [
      `Putaran ${ke}: ${hasil.length} request bersamaan`,
      `  berhasil ${hasil.length - gagal.length}, gagal ${gagal.length} (${((gagal.length / hasil.length) * 100).toFixed(1)}%)`,
      `  kehadiran tercatat di database: ${tercatat}`,
      `  waktu respons: rata-rata ${rataRata.toFixed(0)} ms, p95 ${persentil(waktu, 95).toFixed(0)} ms, terlama ${waktu.at(-1)!.toFixed(0)} ms`,
      `  seluruh putaran selesai dalam ${totalMs.toFixed(0)} ms`,
    ].join("\n"),
  );
  const alasan = new Map<string, number>();
  for (const g of gagal) alasan.set(g.pesan, (alasan.get(g.pesan) ?? 0) + 1);
  for (const [pesan, jumlah] of alasan)
    console.log(`  gagal: ${pesan} (${jumlah}x)`);

  return { total: hasil.length, gagal: gagal.length, tercatat };
}

async function main() {
  const putaran = Number(process.argv[2] ?? 5);
  const url = process.argv[3] ?? "http://localhost:3000";
  const { idProgram, cookies } = JSON.parse(
    readFileSync(FILE_SESI, "utf8"),
  ) as {
    idProgram: string;
    cookies: string[];
  };

  // Satu request pemanasan supaya kompilasi dan koneksi pertama tidak ikut
  // terhitung, lalu kehadirannya dihapus di awal putaran pertama.
  await checkIn(url, idProgram, cookies[0]!);

  let total = 0;
  let gagal = 0;
  let selisihDatabase = 0;
  try {
    for (let i = 1; i <= putaran; i++) {
      const h = await satuPutaran(url, idProgram, cookies, i);
      total += h.total;
      gagal += h.gagal;
      selisihDatabase += Math.abs(h.total - h.gagal - h.tercatat);
    }
  } finally {
    await db.$disconnect();
  }

  const rasio = gagal / total;
  console.log(
    `\nTotal ${total} request, gagal ${gagal} (${(rasio * 100).toFixed(1)}%). ` +
      `Target ≤ ${BATAS_GAGAL * 100}%: ${rasio <= BATAS_GAGAL ? "LOLOS" : "TIDAK LOLOS"}.` +
      (selisihDatabase === 0
        ? " Jumlah kehadiran di database selalu sama dengan request yang berhasil."
        : ` Ada selisih ${selisihDatabase} antara request berhasil dan kehadiran tercatat.`),
  );
  process.exitCode = rasio <= BATAS_GAGAL && selisihDatabase === 0 ? 0 : 1;
}

void main();
