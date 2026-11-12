import type { StatusVerifikasi as TipeStatusVerifikasi } from "~/server/models/enums";

export class DokumenVerifikasi {
  private readonly idDokumen: string;
  private readonly jenisDokumen: string;
  private readonly urlFile: string;
  private readonly statusVerifikasi: TipeStatusVerifikasi;

  constructor(data: {
    idDokumen: string;
    jenisDokumen: string;
    urlFile: string;
    statusVerifikasi: TipeStatusVerifikasi;
  }) {
    this.idDokumen = data.idDokumen;
    this.jenisDokumen = data.jenisDokumen;
    this.urlFile = data.urlFile;
    this.statusVerifikasi = data.statusVerifikasi;
  }
}
