/**
 * KNF03-TC01 (Performance efficiency): berkas legalitas maksimal 2 MB tersimpan
 * dalam waktu <= 5 detik.
 *
 * Diukur pada CloudStorageAdapter.unggahBerkas (C21), komponen yang menyimpan berkas.
 * Berkas uji: PDF 2 MB (batas atas). Folder unggahan sementara, dihapus setelah selesai.
 * Jalankan dari folder src:
 *   npx tsx --tsconfig tsconfig.json tests/knf/ujiKnf03UnggahBerkas.ts
 */
import { mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { performance } from "node:perf_hooks";

import { CloudStorageAdapter } from "~/server/adapters/CloudStorageAdapter";

const UKURAN_BYTE = 2 * 1024 * 1024;
const PENGULANGAN = 5;
const BATAS_MS = 5000;

function buatPdf(): File {
  const isi = new Uint8Array(UKURAN_BYTE);
  isi.set([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31]); // "%PDF-1"
  return new File([isi], "legalitas.pdf", { type: "application/pdf" });
}

async function main() {
  const folder = await mkdtemp(path.join(tmpdir(), "rekanbumi-knf03-"));
  process.env.UPLOAD_DIR = folder;
  const waktu: number[] = [];
  try {
    for (let i = 1; i <= PENGULANGAN; i++) {
      const berkas = buatPdf();
      const mulai = performance.now();
      const url = await CloudStorageAdapter.unggahBerkas(berkas);
      const ms = performance.now() - mulai;
      waktu.push(ms);
      console.log(
        `Percobaan ${i}: ${berkas.size} byte tersimpan sebagai ${url} dalam ${ms.toFixed(1)} ms`,
      );
    }
    const tersimpan = (await readdir(folder)).length;
    const rata = waktu.reduce((a, b) => a + b, 0) / waktu.length;
    const maks = Math.max(...waktu);
    console.log(
      `\nBerkas tersimpan di folder : ${tersimpan} dari ${PENGULANGAN}`,
    );
    console.log(`Waktu rata-rata            : ${rata.toFixed(1)} ms`);
    console.log(
      `Waktu maksimum             : ${maks.toFixed(1)} ms (batas ${BATAS_MS} ms)`,
    );
    const lulus = tersimpan === PENGULANGAN && maks <= BATAS_MS;
    console.log(`\nKNF03-TC01: ${lulus ? "Pass" : "Fail"}`);
    process.exitCode = lulus ? 0 : 1;
  } finally {
    await rm(folder, { recursive: true, force: true });
  }
}

main().catch((galat) => {
  console.error(galat);
  process.exitCode = 1;
});
