import {
  StatusVerifikasi,
  type StatusVerifikasi as TipeStatusVerifikasi,
} from "~/server/models/enums";
import { Pengguna } from "~/server/models/Pengguna";

type DataInisiatorProgram = {
  idPengguna: string;
  email: string;
  idInisiator: string;
  namaLembaga: string;
  tautanSitusResmi: string | null;
  statusVerifikasi: TipeStatusVerifikasi;
};

export class InisiatorProgram extends Pengguna {
  private readonly idInisiator: string;
  private readonly namaLembaga: string;
  private readonly tautanSitusResmi: string | null;
  private readonly statusVerifikasi: TipeStatusVerifikasi;

  constructor(data: DataInisiatorProgram) {
    super(data.idPengguna, data.email);
    this.idInisiator = data.idInisiator;
    this.namaLembaga = data.namaLembaga;
    this.tautanSitusResmi = data.tautanSitusResmi;
    this.statusVerifikasi = data.statusVerifikasi;
  }

  cekStatusVerifikasi(): boolean {
    return this.statusVerifikasi === StatusVerifikasi.TERVERIFIKASI;
  }

  getTautan(): string {
    return this.tautanSitusResmi ?? "";
  }

  getNamaLembaga(): string {
    return this.namaLembaga;
  }
}
