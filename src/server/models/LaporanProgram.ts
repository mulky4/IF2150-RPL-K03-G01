import {
  StatusPeninjauan,
  type StatusPeninjauan as TipeStatusPeninjauan,
} from "~/server/models/enums";
import type { Verifikator } from "~/server/models/Verifikator";

export class LaporanProgram {
  private readonly idLaporan: string;
  private readonly ringkasanCapaian: string;
  private readonly waktuPengajuan: Date;
  private dokumentasiAkhir: string[];
  private catatanRevisi: string | null;
  private statusPeninjauan: TipeStatusPeninjauan;
  private verifikator?: Verifikator;

  constructor(data: {
    idLaporan: string;
    dokumentasiAkhir?: string[];
    ringkasanCapaian: string;
    catatanRevisi?: string | null;
    statusPeninjauan: TipeStatusPeninjauan;
    waktuPengajuan: Date;
    verifikator?: Verifikator;
  }) {
    this.idLaporan = data.idLaporan;
    this.dokumentasiAkhir = data.dokumentasiAkhir ?? [];
    this.ringkasanCapaian = data.ringkasanCapaian;
    this.catatanRevisi = data.catatanRevisi ?? null;
    this.statusPeninjauan = data.statusPeninjauan;
    this.waktuPengajuan = data.waktuPengajuan;
    this.verifikator = data.verifikator;
  }

  uploadDokumentasi(urlFile: string): void {
    if (!urlFile.trim()) throw new Error("Tautan berkas tidak valid");
    this.dokumentasiAkhir.push(urlFile);
  }

  setujui(verifikator: Verifikator): void {
    this.pastikanBelumDitinjau();
    this.statusPeninjauan = StatusPeninjauan.DISETUJUI;
    this.catatanRevisi = null;
    this.verifikator = verifikator;
  }

  tolak(verifikator: Verifikator, catatanRevisi: string): void {
    this.pastikanBelumDitinjau();
    if (!catatanRevisi.trim()) throw new Error("Catatan revisi wajib diisi");
    this.statusPeninjauan = StatusPeninjauan.DITOLAK;
    this.catatanRevisi = catatanRevisi;
    this.verifikator = verifikator;
  }

  showSummary(): string {
    return this.ringkasanCapaian;
  }

  showDokumentasi(): string[] {
    return [...this.dokumentasiAkhir];
  }

  private pastikanBelumDitinjau(): void {
    if (this.statusPeninjauan !== StatusPeninjauan.MENUNGGU) {
      throw new Error("Laporan sudah ditinjau");
    }
  }
}
