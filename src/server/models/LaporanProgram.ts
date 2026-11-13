import type { StatusPeninjauan } from "~/server/models/enums";

export class LaporanProgram {
  private readonly dokumentasiAkhir: string[];
  private catatanRevisi: string | null = null;
  private statusPeninjauan: StatusPeninjauan = "MENUNGGU";
  private verifikatorId: string | null = null;

  constructor(
    private readonly ringkasanCapaian: string,
    dokumentasiAkhir: string[] = [],
  ) {
    this.dokumentasiAkhir = [...dokumentasiAkhir];
  }

  uploadDokumentasi(urlFile: string): void {
    if (!urlFile.trim()) {
      throw new Error("Tautan berkas tidak valid.");
    }
    this.dokumentasiAkhir.push(urlFile);
  }

  setujui(verifikatorId: string): void {
    this.pastikanBelumDitinjau();
    this.statusPeninjauan = "DISETUJUI";
    this.catatanRevisi = null;
    this.verifikatorId = verifikatorId;
  }

  tolak(verifikatorId: string, catatanRevisi: string): void {
    this.pastikanBelumDitinjau();
    if (!catatanRevisi.trim()) {
      throw new Error("Catatan revisi wajib diisi.");
    }
    this.statusPeninjauan = "DITOLAK";
    this.catatanRevisi = catatanRevisi.trim();
    this.verifikatorId = verifikatorId;
  }

  showSummary(): string {
    return this.ringkasanCapaian;
  }

  showDokumentasi(): string[] {
    return [...this.dokumentasiAkhir];
  }

  getStatusPeninjauan(): StatusPeninjauan {
    return this.statusPeninjauan;
  }

  getCatatanRevisi(): string | null {
    return this.catatanRevisi;
  }

  getVerifikatorId(): string | null {
    return this.verifikatorId;
  }

  private pastikanBelumDitinjau(): void {
    if (this.statusPeninjauan !== "MENUNGGU") {
      throw new Error("Laporan sudah ditinjau.");
    }
  }
}
