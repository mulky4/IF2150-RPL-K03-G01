import { randomUUID } from "node:crypto";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

/** KNF03 / Algo-C21-01: ukuran berkas maksimal 2 MB. */
const UKURAN_MAKS_BYTE = 2 * 1024 * 1024;

type JenisBerkas = { mime: string; ekstensi: string; tandaAwal: number[] };

/** Tipe yang diizinkan (PDF, JPG, PNG) beserta byte awal berkasnya. */
const JENIS_DIIZINKAN: JenisBerkas[] = [
  { mime: "application/pdf", ekstensi: "pdf", tandaAwal: [0x25, 0x50, 0x44, 0x46] },
  { mime: "image/png", ekstensi: "png", tandaAwal: [0x89, 0x50, 0x4e, 0x47] },
  { mime: "image/jpeg", ekstensi: "jpg", tandaAwal: [0xff, 0xd8, 0xff] },
];

const POLA_NAMA_TERSIMPAN = /^[0-9a-f-]{36}\.(pdf|png|jpg)$/;

/** Jenis berkas dari byte awalnya (bukan dari nama atau tipe yang diklaim pengunggah). */
async function deteksiJenis(berkas: File): Promise<JenisBerkas | null> {
  const awal = new Uint8Array(await berkas.slice(0, 4).arrayBuffer());
  return (
    JENIS_DIIZINKAN.find((jenis) =>
      jenis.tandaAwal.every((byte, i) => awal[i] === byte),
    ) ?? null
  );
}

function folderUnggahan(): string {
  return process.env.UPLOAD_DIR ?? path.join(process.cwd(), "uploads");
}

/**
 * C21 CloudStorageAdapter «adapter» (Tabel 4.1 DPPL2).
 * Layanan cloud storage belum dipilih (DPPL 1.x), jadi berkas disimpan di folder lokal
 * `uploads/` (diabaikan git). Kelas lain hanya memakai kelas ini, sehingga pindah ke
 * layanan cloud cukup mengganti isi unggahBerkas() dan ambilBerkas().
 */
export class CloudStorageAdapter {
  /**
   * Algo-C21-01. Berkas harus ada, tidak kosong, maksimal 2 MB, dan bertipe PDF/JPG/PNG.
   * Beda dari DPPL: async dan memeriksa byte awal berkas, bukan hanya `berkas.type`,
   * supaya berkas yang namanya diganti tidak lolos (catat di B.1).
   */
  static async validasiBerkas(berkas: File | null): Promise<boolean> {
    if (berkas === null) return false;
    if (berkas.size === 0 || berkas.size > UKURAN_MAKS_BYTE) return false;
    const jenis = await deteksiJenis(berkas);
    return jenis !== null && berkas.type === jenis.mime;
  }

  /** Algo-C21-02. Menyimpan berkas dan mengembalikan URL-nya (`uploads/<uuid>.<ekstensi>`). */
  static async unggahBerkas(berkas: File): Promise<string> {
    if (!(await CloudStorageAdapter.validasiBerkas(berkas))) {
      throw new Error("Berkas tidak valid");
    }
    const jenis = (await deteksiJenis(berkas))!;
    // Nama dibuat sendiri (bukan dari pengunggah) supaya tidak bisa menulis ke folder lain.
    const nama = `${randomUUID()}.${jenis.ekstensi}`;
    const folder = folderUnggahan();
    await mkdir(folder, { recursive: true });
    await writeFile(path.join(folder, nama), Buffer.from(await berkas.arrayBuffer()));
    return `uploads/${nama}`;
  }

  /** Algo-C21-03. Mengambil berkas dari URL hasil unggahBerkas(). */
  static async ambilBerkas(url: string): Promise<File> {
    const nama = path.basename(url);
    if (!POLA_NAMA_TERSIMPAN.test(nama)) {
      throw new Error("Berkas tidak ditemukan");
    }
    try {
      const isi = await readFile(path.join(folderUnggahan(), nama));
      const jenis = JENIS_DIIZINKAN.find((j) => nama.endsWith(`.${j.ekstensi}`))!;
      return new File([isi], nama, { type: jenis.mime });
    } catch {
      throw new Error("Berkas tidak ditemukan");
    }
  }

  /**
   * Tambahan di luar DPPL: menghapus berkas, dipakai untuk membatalkan unggahan
   * kalau pembuatan akun gagal sesudahnya. Tidak melempar galat kalau berkas sudah tidak ada.
   */
  static async hapusBerkas(url: string): Promise<void> {
    const nama = path.basename(url);
    if (!POLA_NAMA_TERSIMPAN.test(nama)) return;
    await unlink(path.join(folderUnggahan(), nama)).catch(() => undefined);
  }
}
