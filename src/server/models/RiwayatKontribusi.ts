import type { Program } from "~/server/models/Program";

export class RiwayatKontribusi {
  private readonly idRiwayat: string;
  private totalJamAksi: number;
  private readonly programSelesai: Program[];

  constructor(data: {
    idRiwayat: string;
    totalJamAksi: number;
    programSelesai?: Program[];
  }) {
    this.idRiwayat = data.idRiwayat;
    this.totalJamAksi = data.totalJamAksi;
    this.programSelesai = data.programSelesai ?? [];
  }

  tambahRiwayatProgram(program: Program): void {
    if (this.programSelesai.some((item) => item.getIdProgram() === program.getIdProgram())) {
      throw new Error("Program sudah tercatat pada riwayat");
    }
    this.programSelesai.push(program);
    this.perbaruiJamAksi(program.hitungDurasiJam());
  }

  private perbaruiJamAksi(jamAksi: number): void {
    if (jamAksi < 0) throw new Error("Jam aksi tidak valid");
    this.totalJamAksi += jamAksi;
  }

  getTotalJamAksi(): number {
    return this.totalJamAksi;
  }

  getDaftarProgramSelesai(): Program[] {
    return [...this.programSelesai];
  }
}
