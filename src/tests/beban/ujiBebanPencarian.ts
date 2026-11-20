/**
 * Uji beban pencarian program: 50 pengunjung mencari program secara bersamaan
 * lewat endpoint yang sama dengan halaman Eksplorasi, lalu diukur waktu
 * respons setiap request. Target: setiap pencarian selesai paling lama 2 detik
 * dan tidak ada request yang gagal.
 *
 * Pencarian tidak butuh login, jadi tidak perlu menyiapkan sesi. Server harus
 * sudah jalan (sebaiknya hasil `next build` + `next start`).
 * Jalankan dari folder src:
 *   npx tsx --tsconfig tsconfig.json tests/beban/ujiBebanPencarian.ts [putaran] [url]
 */
import { performance } from "node:perf_hooks";

const JUMLAH_PENGGUNA = 50;
const BATAS_MS = 2000;

type Pencarian = {
  kataKunci: string;
  kategori?: "JAGA_ALAM" | "JAGA_IKLIM";
};

// Campuran pencarian yang biasa dilakukan di halaman Eksplorasi: tanpa kata
// kunci, dengan kata kunci, dengan filter kategori, dan yang tidak ada hasilnya.
const VARIASI: Pencarian[] = [
  { kataKunci: "" },
  { kataKunci: "pohon" },
  { kataKunci: "pantai" },
  { kataKunci: "sungai" },
  { kataKunci: "", kategori: "JAGA_ALAM" },
  { kataKunci: "", kategori: "JAGA_IKLIM" },
  { kataKunci: "bersih", kategori: "JAGA_ALAM" },
  { kataKunci: "kata yang tidak ada" },
];

type HasilRequest = {
  berhasil: boolean;
  ms: number;
  jumlahProgram: number;
  pesan: string;
};

async function cari(url: string, pencarian: Pencarian): Promise<HasilRequest> {
  const input = encodeURIComponent(JSON.stringify({ json: pencarian }));
  const mulai = performance.now();
  try {
    const respons = await fetch(`${url}/api/trpc/program.cari?input=${input}`);
    const isi = (await respons.json()) as {
      result?: { data?: { json?: { daftar?: unknown[] } } };
      error?: { json?: { message?: string } };
    };
    const daftar = isi.result?.data?.json?.daftar;
    return {
      berhasil: respons.ok && !isi.error && Array.isArray(daftar),
      ms: performance.now() - mulai,
      jumlahProgram: daftar?.length ?? 0,
      pesan: isi.error?.json?.message ?? `HTTP ${respons.status}`,
    };
  } catch (galat) {
    return {
      berhasil: false,
      ms: performance.now() - mulai,
      jumlahProgram: 0,
      pesan: (galat as Error).message,
    };
  }
}

function persentil(urut: number[], p: number) {
  return urut[
    Math.min(urut.length - 1, Math.ceil((p / 100) * urut.length) - 1)
  ]!;
}

async function satuPutaran(url: string, ke: number) {
  const daftarPencarian = Array.from(
    { length: JUMLAH_PENGGUNA },
    (_, i) => VARIASI[i % VARIASI.length]!,
  );

  const mulai = performance.now();
  const hasil = await Promise.all(daftarPencarian.map((p) => cari(url, p)));
  const totalMs = performance.now() - mulai;

  const gagal = hasil.filter((h) => !h.berhasil);
  const waktu = hasil.map((h) => h.ms).sort((a, b) => a - b);
  const rataRata = waktu.reduce((a, b) => a + b, 0) / waktu.length;
  const terlama = waktu.at(-1)!;
  const lewatBatas = waktu.filter((ms) => ms > BATAS_MS).length;

  console.log(
    [
      `Putaran ${ke}: ${hasil.length} pencarian bersamaan`,
      `  berhasil ${hasil.length - gagal.length}, gagal ${gagal.length}`,
      `  waktu respons: rata-rata ${rataRata.toFixed(0)} ms, p95 ${persentil(waktu, 95).toFixed(0)} ms, terlama ${terlama.toFixed(0)} ms`,
      `  lebih dari ${BATAS_MS} ms: ${lewatBatas} request`,
      `  seluruh putaran selesai dalam ${totalMs.toFixed(0)} ms`,
    ].join("\n"),
  );
  const alasan = new Map<string, number>();
  for (const g of gagal) alasan.set(g.pesan, (alasan.get(g.pesan) ?? 0) + 1);
  for (const [pesan, jumlah] of alasan)
    console.log(`  gagal: ${pesan} (${jumlah}x)`);

  return { hasil, rataRata, terlama, lewatBatas, gagal: gagal.length };
}

async function main() {
  const putaran = Number(process.argv[2] ?? 5);
  const url = process.argv[3] ?? "http://localhost:3000";

  // Satu request pemanasan supaya koneksi pertama ke database tidak ikut
  // terhitung. Sekalian dicatat jumlah hasil tiap variasi pencarian.
  console.log("Jumlah program yang ditemukan per variasi pencarian:");
  for (const p of VARIASI) {
    const h = await cari(url, p);
    const label = [
      p.kataKunci ? `"${p.kataKunci}"` : "(tanpa kata kunci)",
      p.kategori ?? "",
    ]
      .filter(Boolean)
      .join(" + ");
    console.log(
      `  ${label}: ${h.berhasil ? `${h.jumlahProgram} program` : `gagal (${h.pesan})`}`,
    );
  }
  console.log();

  let total = 0;
  let gagal = 0;
  let lewatBatas = 0;
  let terlama = 0;
  let jumlahMs = 0;
  for (let i = 1; i <= putaran; i++) {
    const h = await satuPutaran(url, i);
    total += h.hasil.length;
    gagal += h.gagal;
    lewatBatas += h.lewatBatas;
    terlama = Math.max(terlama, h.terlama);
    jumlahMs += h.hasil.reduce((a, b) => a + b.ms, 0);
  }

  const lolos = gagal === 0 && lewatBatas === 0;
  console.log(
    `\nTotal ${total} pencarian dalam ${putaran} putaran. ` +
      `Rata-rata ${(jumlahMs / total).toFixed(0)} ms, terlama ${terlama.toFixed(0)} ms, ` +
      `gagal ${gagal}, lebih dari ${BATAS_MS} ms: ${lewatBatas}. ` +
      `Target setiap pencarian ≤ ${BATAS_MS} ms: ${lolos ? "LOLOS" : "TIDAK LOLOS"}.`,
  );
  process.exitCode = lolos ? 0 : 1;
}

void main();
