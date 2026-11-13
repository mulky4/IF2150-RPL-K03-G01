import type { Program } from "~/server/models/Program";

/** Bentuk baris tbl_kehadiran yang dipakai untuk membentuk objek Kehadiran. */
export type BarisKehadiran = {
  id: string;
  waktuKehadiran: Date;
  programId: string;
};

export class Kehadiran {
  private readonly idKehadiran: string;
  private readonly waktuKehadiran: Date;
  private readonly programId: string;

  constructor(data: {
    idKehadiran: string;
    waktuKehadiran: Date;
    programId: string;
  }) {
    this.idKehadiran = data.idKehadiran;
    this.waktuKehadiran = data.waktuKehadiran;
    this.programId = data.programId;
  }

  static dariBaris(baris: BarisKehadiran): Kehadiran {
    return new Kehadiran({
      idKehadiran: baris.id,
      waktuKehadiran: baris.waktuKehadiran,
      programId: baris.programId,
    });
  }

  untukProgram(program: Program): boolean {
    return this.programId === program.getIdProgram();
  }

  getIdKehadiran(): string {
    return this.idKehadiran;
  }

  getWaktuKehadiran(): Date {
    return this.waktuKehadiran;
  }
}
