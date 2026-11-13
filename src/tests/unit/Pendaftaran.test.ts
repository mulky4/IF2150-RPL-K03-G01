import { describe, expect, it } from "vitest";

import {
  StatusPendaftaran,
  type StatusPendaftaran as TipeStatusPendaftaran,
} from "~/server/models/enums";
import { Pendaftaran } from "~/server/models/Pendaftaran";

function buatPendaftaran(status: TipeStatusPendaftaran = "MENUNGGU") {
  return new Pendaftaran({
    idPendaftaran: "pendaftaran-1",
    keterampilan: "Menanam pohon",
    ketersediaanWaktu: "Akhir pekan",
    status,
    waktuDaftar: new Date("2026-11-07T01:00:00.000Z"),
  });
}

describe("Pendaftaran", () => {
  it("pendaftaran baru masih menunggu keputusan", () => {
    const pendaftaran = buatPendaftaran();

    expect(pendaftaran.sudahDiputuskan()).toBe(false);
    expect(pendaftaran.isDiterima()).toBe(false);
    expect(pendaftaran.getIdPendaftaran()).toBe("pendaftaran-1");
  });

  it("terima() mengubah status menjadi diterima", () => {
    const pendaftaran = buatPendaftaran();

    pendaftaran.terima();

    expect(pendaftaran.isDiterima()).toBe(true);
    expect(pendaftaran.sudahDiputuskan()).toBe(true);
  });

  it("tolak() mengubah status menjadi ditolak", () => {
    const pendaftaran = buatPendaftaran();

    pendaftaran.tolak();

    expect(pendaftaran.isDiterima()).toBe(false);
    expect(pendaftaran.sudahDiputuskan()).toBe(true);
  });

  it.each([StatusPendaftaran.DITERIMA, StatusPendaftaran.DITOLAK])(
    "pendaftaran berstatus %s tidak bisa diputuskan ulang",
    (status) => {
      const pendaftaran = buatPendaftaran(status);

      expect(() => pendaftaran.terima()).toThrow(
        "Pendaftaran sudah diputuskan",
      );
      expect(() => pendaftaran.tolak()).toThrow("Pendaftaran sudah diputuskan");
      expect(pendaftaran.isDiterima()).toBe(
        status === StatusPendaftaran.DITERIMA,
      );
    },
  );

  it("keputusan pertama tidak bisa diganti dengan keputusan lain", () => {
    const pendaftaran = buatPendaftaran();

    pendaftaran.tolak();

    expect(() => pendaftaran.terima()).toThrow("Pendaftaran sudah diputuskan");
    expect(pendaftaran.isDiterima()).toBe(false);
  });
});
