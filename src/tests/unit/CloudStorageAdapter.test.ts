import { mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { CloudStorageAdapter } from "~/server/adapters/CloudStorageAdapter";

const PDF = [0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34];
const PNG = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const JPG = [0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46];

/** File uji. `ukuran` memperbesar isi berkas sampai sebesar itu. */
function buatFile(
  awal: number[],
  nama: string,
  tipe: string,
  ukuran = awal.length,
): File {
  const isi = new Uint8Array(ukuran);
  isi.set(awal);
  return new File([isi], nama, { type: tipe });
}

let folder: string;

beforeEach(async () => {
  folder = await mkdtemp(path.join(tmpdir(), "rekanbumi-uji-"));
  process.env.UPLOAD_DIR = folder;
});

afterEach(async () => {
  delete process.env.UPLOAD_DIR;
  await rm(folder, { recursive: true, force: true });
});

describe("CloudStorageAdapter (C21) – validasiBerkas, KNF03", () => {
  it("menerima PDF, PNG, dan JPG yang sah (Algo-C21-01)", async () => {
    for (const [awal, nama, tipe] of [
      [PDF, "ktp.pdf", "application/pdf"],
      [PNG, "ktp.png", "image/png"],
      [JPG, "ktp.jpg", "image/jpeg"],
    ] as const) {
      await expect(
        CloudStorageAdapter.validasiBerkas(buatFile([...awal], nama, tipe)),
      ).resolves.toBe(true);
    }
  });

  it("menolak berkas null atau kosong", async () => {
    await expect(CloudStorageAdapter.validasiBerkas(null)).resolves.toBe(false);
    await expect(
      CloudStorageAdapter.validasiBerkas(
        new File([], "kosong.pdf", { type: "application/pdf" }),
      ),
    ).resolves.toBe(false);
  });

  it("menolak berkas lebih dari 2 MB, tepat 2 MB masih boleh", async () => {
    const dua_mb = 2 * 1024 * 1024;
    await expect(
      CloudStorageAdapter.validasiBerkas(
        buatFile(PDF, "pas.pdf", "application/pdf", dua_mb),
      ),
    ).resolves.toBe(true);
    await expect(
      CloudStorageAdapter.validasiBerkas(
        buatFile(PDF, "besar.pdf", "application/pdf", dua_mb + 1),
      ),
    ).resolves.toBe(false);
  });

  it("menolak tipe selain PDF/JPG/PNG", async () => {
    await expect(
      CloudStorageAdapter.validasiBerkas(
        buatFile([0x68, 0x61, 0x69], "catatan.txt", "text/plain"),
      ),
    ).resolves.toBe(false);
  });

  it("menolak berkas yang namanya diganti (isi bukan PDF tapi mengaku PDF)", async () => {
    await expect(
      CloudStorageAdapter.validasiBerkas(
        buatFile([0x4d, 0x5a, 0x90, 0x00], "virus.pdf", "application/pdf"),
      ),
    ).resolves.toBe(false);
  });

  it("menolak tipe yang diklaim tidak cocok dengan isinya", async () => {
    await expect(
      CloudStorageAdapter.validasiBerkas(buatFile(PNG, "a.png", "application/pdf")),
    ).resolves.toBe(false);
  });
});

describe("CloudStorageAdapter (C21) – unggah dan ambil", () => {
  it("unggahBerkas menyimpan berkas dan ambilBerkas mengembalikan isi yang sama (Algo-C21-02, C21-03)", async () => {
    const asli = buatFile(PDF, "ktp-saya.pdf", "application/pdf", 100);
    const url = await CloudStorageAdapter.unggahBerkas(asli);

    expect(url).toMatch(/^uploads\/[0-9a-f-]{36}\.pdf$/);
    expect(await readdir(folder)).toHaveLength(1);

    const diambil = await CloudStorageAdapter.ambilBerkas(url);
    expect(diambil.type).toBe("application/pdf");
    expect(new Uint8Array(await diambil.arrayBuffer())).toEqual(
      new Uint8Array(await asli.arrayBuffer()),
    );
  });

  it("nama berkas dibuat sendiri, bukan dari nama kiriman pengguna", async () => {
    const url = await CloudStorageAdapter.unggahBerkas(
      buatFile(PNG, "../../etc/passwd.png", "image/png"),
    );
    expect(url).not.toContain("passwd");
    expect(await readdir(folder)).toEqual([path.basename(url)]);
  });

  it("unggahBerkas menolak berkas tidak valid dan tidak menyimpan apa pun", async () => {
    await expect(
      CloudStorageAdapter.unggahBerkas(
        buatFile([1, 2, 3], "x.txt", "text/plain"),
      ),
    ).rejects.toThrow("Berkas tidak valid");
    expect(await readdir(folder)).toHaveLength(0);
  });

  it("ambilBerkas: url tidak dikenal atau berusaha keluar folder → 'Berkas tidak ditemukan'", async () => {
    for (const url of [
      "uploads/tidak-ada.pdf",
      "uploads/00000000-0000-0000-0000-000000000000.pdf",
      "../../etc/passwd",
      "uploads/../../rahasia.pdf",
    ]) {
      await expect(CloudStorageAdapter.ambilBerkas(url)).rejects.toThrow(
        "Berkas tidak ditemukan",
      );
    }
  });

  it("hapusBerkas menghapus berkas dan aman dipanggil dua kali", async () => {
    const url = await CloudStorageAdapter.unggahBerkas(
      buatFile(JPG, "foto.jpg", "image/jpeg"),
    );
    await CloudStorageAdapter.hapusBerkas(url);
    await CloudStorageAdapter.hapusBerkas(url);
    expect(await readdir(folder)).toHaveLength(0);
  });
});
