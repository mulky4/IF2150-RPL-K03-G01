import {
  StatusPendaftaran,
  type StatusPendaftaran as TipeStatusPendaftaran,
} from "~/server/models/enums";

type DataPendaftaran = {
  idPendaftaran: string;
  keterampilan: string;
  ketersediaanWaktu: string;
  status: TipeStatusPendaftaran;
  waktuDaftar: Date;
};

export class Pendaftaran {
  private readonly idPendaftaran: string;
  private readonly keterampilan: string;
  private readonly ketersediaanWaktu: string;
  private status: TipeStatusPendaftaran;
  private readonly waktuDaftar: Date;

  constructor(data: DataPendaftaran) {
    this.idPendaftaran = data.idPendaftaran;
    this.keterampilan = data.keterampilan;
    this.ketersediaanWaktu = data.ketersediaanWaktu;
    this.status = data.status;
    this.waktuDaftar = data.waktuDaftar;
  }

  terima(): void {
    if (this.sudahDiputuskan()) {
      throw new Error("Pendaftaran sudah diputuskan");
    }
    this.status = StatusPendaftaran.DITERIMA;
  }

  tolak(): void {
    if (this.sudahDiputuskan()) {
      throw new Error("Pendaftaran sudah diputuskan");
    }
    this.status = StatusPendaftaran.DITOLAK;
  }

  isDiterima(): boolean {
    return this.status === StatusPendaftaran.DITERIMA;
  }

  sudahDiputuskan(): boolean {
    return (
      this.status === StatusPendaftaran.DITERIMA ||
      this.status === StatusPendaftaran.DITOLAK
    );
  }

  getIdPendaftaran(): string {
    return this.idPendaftaran;
  }
}
