import { belumDiimplementasi } from "~/lib/belumDiimplementasi";

/** C10 Notifikasi «entity» (Tabel 4.1 DPPL2). Penerima: Pengguna (Tabel 4.2 no. 5). */
export class Notifikasi {
  constructor(
    private idNotifikasi: string,
    private pesan: string,
    private waktuKirim: Date,
    private statusDibaca: boolean = false,
  ) {}

  /** Algo-C10-01. Menyimpan dan mengirim notifikasi ke penerimanya. */
  async kirim(): Promise<void> {
    belumDiimplementasi("Notifikasi.kirim", this.idNotifikasi);
  }

  /** Algo-C10-02. Menandai notifikasi sudah dibaca. */
  async baca(): Promise<void> {
    belumDiimplementasi("Notifikasi.baca", this.statusDibaca);
  }

  /** Algo-C10-03. Mengembalikan isi lengkap notifikasi. */
  showDetail(): string {
    return belumDiimplementasi(
      "Notifikasi.showDetail",
      this.pesan,
      this.waktuKirim,
    );
  }
}
