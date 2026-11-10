import { randomUUID } from "node:crypto";

import { db } from "~/server/db";

/** Baris tbl_notifikasi (Prisma model Notifikasi). */
export type BarisNotifikasi = {
  id: string;
  pesan: string;
  waktuKirim: Date;
  statusDibaca: boolean;
  userId: string;
};

/** Bentuk polos yang dikirim ke views/ lewat tRPC. */
export type DataNotifikasi = {
  idNotifikasi: string;
  pesan: string;
  waktuKirim: Date;
  statusDibaca: boolean;
};

/**
 * C10 Notifikasi «entity» (Tabel 4.1 DPPL2). Penerima: Pengguna (Tabel 4.2 no. 5).
 *
 * Cara modul lain mengirim notifikasi (SeleksiController.triggerNotifikasi,
 * ProgramController.buatNotifikasi):
 *
 *   await Notifikasi.baru(idPengguna, "Selamat, kamu diterima di ...").kirim();
 */
export class Notifikasi {
  constructor(
    private idNotifikasi: string,
    private idPenerima: string,
    private pesan: string,
    private waktuKirim: Date = new Date(),
    private statusDibaca: boolean = false,
  ) {}

  /** Notifikasi baru yang belum disimpan. Simpan dengan kirim(). */
  static baru(idPenerima: string, pesan: string): Notifikasi {
    return new Notifikasi(randomUUID(), idPenerima, pesan);
  }

  /** Membentuk objek dari baris tbl_notifikasi. */
  static dariBaris(baris: BarisNotifikasi): Notifikasi {
    return new Notifikasi(
      baris.id,
      baris.userId,
      baris.pesan,
      baris.waktuKirim,
      baris.statusDibaca,
    );
  }

  /** Algo-C10-01, Q-C10-01. Menyimpan notifikasi untuk penerimanya. */
  async kirim(): Promise<void> {
    if (this.pesan.trim() === "") {
      throw new Error("Pesan notifikasi tidak boleh kosong");
    }
    this.waktuKirim = new Date();
    this.statusDibaca = false;
    await db.notifikasi.create({
      data: {
        id: this.idNotifikasi,
        userId: this.idPenerima,
        pesan: this.pesan,
        waktuKirim: this.waktuKirim,
        statusDibaca: this.statusDibaca,
      },
    });
  }

  /** Algo-C10-02, Q-C10-02. Menandai notifikasi sudah dibaca. */
  async baca(): Promise<void> {
    if (!this.statusDibaca) {
      this.statusDibaca = true;
      await db.notifikasi.update({
        where: { id: this.idNotifikasi },
        data: { statusDibaca: true },
      });
    }
  }

  /** Algo-C10-03. Mengembalikan isi lengkap notifikasi. */
  showDetail(): string {
    return this.pesan;
  }

  /** true kalau notifikasi ini milik pengguna tersebut. */
  milik(idPengguna: string): boolean {
    return this.idPenerima === idPengguna;
  }

  /** Data untuk ditampilkan di I-03 (dikirim lewat tRPC). */
  keData(): DataNotifikasi {
    return {
      idNotifikasi: this.idNotifikasi,
      pesan: this.pesan,
      waktuKirim: this.waktuKirim,
      statusDibaca: this.statusDibaca,
    };
  }
}
