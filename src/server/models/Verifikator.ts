import type { LaporanProgram } from "~/server/models/LaporanProgram";
import { Pengguna } from "~/server/models/Pengguna";

export class Verifikator extends Pengguna {
  private readonly nama: string;

  constructor(idPengguna: string, email: string, nama: string) {
    super(idPengguna, email);
    this.nama = nama;
  }

  konfirmasiLaporan(laporan: LaporanProgram): void {
    if (!laporan) throw new Error("Laporan tidak ditemukan");
    laporan.setujui(this.idPengguna);
  }

  tolakLaporan(laporan: LaporanProgram, catatanRevisi: string): void {
    if (!laporan) throw new Error("Laporan tidak ditemukan");
    if (!catatanRevisi.trim()) throw new Error("Catatan revisi wajib diisi");
    laporan.tolak(this.idPengguna, catatanRevisi);
  }
}
