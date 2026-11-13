import type { Program } from "~/server/models/Program";

/**
 * Portofolio relawan: total jam aksi dan program selesai yang dihadiri.
 * Total jam aksi hanya disimpan di sini, bukan di Relawan.
 */
export class RiwayatKontribusi {
  /** null kalau riwayat ini belum pernah disimpan ke database. */
  private readonly idRiwayat: string | null;
  private totalJamAksi: number;
  private readonly programSelesai: Program[];

  constructor(data: {
    idRiwayat: string | null;
    totalJamAksi: number;
    programSelesai?: Program[];
  }) {
    this.idRiwayat = data.idRiwayat;
    this.totalJamAksi = data.totalJamAksi;
    this.programSelesai = data.programSelesai ?? [];
  }

  /** Riwayat kosong untuk relawan yang belum punya baris di database. */
  static kosong(): RiwayatKontribusi {
    return new RiwayatKontribusi({ idRiwayat: null, totalJamAksi: 0 });
  }

  tambahRiwayatProgram(program: Program): void {
    if (this.mencatat(program)) {
      throw new Error("Program sudah tercatat pada riwayat");
    }
    this.programSelesai.push(program);
    this.perbaruiJamAksi(program.hitungDurasiJam());
  }

  /** true kalau program ini sudah ada di riwayat. */
  mencatat(program: Program): boolean {
    return this.programSelesai.some(
      (item) => item.getIdProgram() === program.getIdProgram(),
    );
  }

  private perbaruiJamAksi(jamAksi: number): void {
    if (jamAksi < 0) throw new Error("Jam aksi tidak valid");
    this.totalJamAksi += jamAksi;
  }

  getIdRiwayat(): string | null {
    return this.idRiwayat;
  }

  getTotalJamAksi(): number {
    return this.totalJamAksi;
  }

  getDaftarProgramSelesai(): Program[] {
    return [...this.programSelesai];
  }
}
