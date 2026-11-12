import type { Program } from "~/server/models/Program";

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

  untukProgram(program: Program): boolean {
    return this.programId === program.getIdProgram();
  }
}
