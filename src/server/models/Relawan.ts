import {
  StatusVerifikasi,
  type StatusVerifikasi as TipeStatusVerifikasi,
} from "~/server/models/enums";
import type { Kehadiran } from "~/server/models/Kehadiran";
import type { Program } from "~/server/models/Program";
import { Pengguna } from "~/server/models/Pengguna";
import type { RiwayatKontribusi } from "~/server/models/RiwayatKontribusi";

type DataRelawan = {
  idPengguna: string;
  email: string;
  idRelawan: string;
  nama: string;
  noTelepon: string | null;
  domisili: string | null;
  statusVerifikasi: TipeStatusVerifikasi;
  totalJamAksi?: number;
  kehadiran?: Kehadiran[];
  riwayatKontribusi?: RiwayatKontribusi;
};

export class Relawan extends Pengguna {
  private readonly idRelawan: string;
  private readonly nama: string;
  private readonly noTelepon: string | null;
  private readonly domisili: string | null;
  private readonly statusVerifikasi: TipeStatusVerifikasi;
  private totalJamAksi: number;
  private readonly kehadiran: Kehadiran[];
  private readonly riwayatKontribusi?: RiwayatKontribusi;

  constructor(data: DataRelawan) {
    super(data.idPengguna, data.email);
    this.idRelawan = data.idRelawan;
    this.nama = data.nama;
    this.noTelepon = data.noTelepon;
    this.domisili = data.domisili;
    this.statusVerifikasi = data.statusVerifikasi;
    this.totalJamAksi = data.totalJamAksi ?? 0;
    this.kehadiran = data.kehadiran ?? [];
    this.riwayatKontribusi = data.riwayatKontribusi;
  }

  cekKelengkapanData(): boolean {
    return Boolean(
      this.nama.trim() && this.noTelepon?.trim() && this.domisili?.trim(),
    );
  }

  cekStatusKelayakan(): boolean {
    return (
      this.cekKelengkapanData() &&
      this.statusVerifikasi === StatusVerifikasi.TERVERIFIKASI
    );
  }

  lihatPortofolio(): RiwayatKontribusi {
    if (!this.riwayatKontribusi) {
      throw new Error("Riwayat kontribusi relawan tidak ditemukan");
    }
    return this.riwayatKontribusi;
  }

  catatKontribusi(program: Program): boolean {
    if (!this.hadirPada(program)) return false;
    const riwayat = this.lihatPortofolio();
    riwayat.tambahRiwayatProgram(program);
    this.totalJamAksi = riwayat.getTotalJamAksi();
    return true;
  }

  private hadirPada(program: Program): boolean {
    return this.kehadiran.some((catatan) => catatan.untukProgram(program));
  }

  getIdRelawan(): string {
    return this.idRelawan;
  }

  getTotalJamAksi(): number {
    return this.totalJamAksi;
  }
}
