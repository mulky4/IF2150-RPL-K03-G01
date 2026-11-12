import { describe, expect, it } from "vitest";

import { LaporanProgram } from "~/server/models/LaporanProgram";

describe("LaporanProgram (C09)", () => {
  it("menyimpan dokumentasi dan ringkasan capaian", () => {
    const laporan = new LaporanProgram("Ringkasan", [
      "https://example.org/a.jpg",
    ]);
    laporan.uploadDokumentasi("https://example.org/b.jpg");

    expect(laporan.showSummary()).toBe("Ringkasan");
    expect(laporan.showDokumentasi()).toEqual([
      "https://example.org/a.jpg",
      "https://example.org/b.jpg",
    ]);
  });

  it("menolak tautan dokumentasi kosong", () => {
    const laporan = new LaporanProgram("Ringkasan");

    expect(() => laporan.uploadDokumentasi("  ")).toThrow(
      "Tautan berkas tidak valid.",
    );
  });

  it("menyetujui laporan sekali saja", () => {
    const laporan = new LaporanProgram("Ringkasan");
    laporan.setujui("verifikator-1");

    expect(laporan.getStatusPeninjauan()).toBe("DISETUJUI");
    expect(laporan.getVerifikatorId()).toBe("verifikator-1");
    expect(() => laporan.setujui("verifikator-2")).toThrow(
      "Laporan sudah ditinjau.",
    );
  });

  it("menolak laporan hanya dengan catatan revisi", () => {
    const laporan = new LaporanProgram("Ringkasan");

    expect(() => laporan.tolak("verifikator-1", "  ")).toThrow(
      "Catatan revisi wajib diisi.",
    );
    laporan.tolak("verifikator-1", " Perbaiki dokumentasi. ");

    expect(laporan.getStatusPeninjauan()).toBe("DITOLAK");
    expect(laporan.getCatatanRevisi()).toBe("Perbaiki dokumentasi.");
  });
});
