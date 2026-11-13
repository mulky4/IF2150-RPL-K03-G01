import type { StatusProgram } from "@prisma/client";

export type FilterProgram =
  "SEMUA" | Exclude<StatusProgram, "MENUNGGU_VERIFIKASI">;

/** Chip filter I07-CHP-FilterStatus. */
export const FILTER_PROGRAM: { nilai: FilterProgram; label: string }[] = [
  { nilai: "SEMUA", label: "Semua" },
  { nilai: "AKTIF", label: "Aktif" },
  { nilai: "MENUNGGU_KONFIRMASI", label: "Menunggu Konfirmasi" },
  { nilai: "PERLU_REVISI", label: "Perlu Revisi" },
  { nilai: "SELESAI", label: "Selesai" },
];

const LABEL_STATUS: Record<StatusProgram, string> = {
  MENUNGGU_VERIFIKASI: "Menunggu Verifikasi",
  AKTIF: "Aktif",
  MENUNGGU_KONFIRMASI: "Menunggu Konfirmasi",
  PERLU_REVISI: "Perlu Revisi",
  SELESAI: "Selesai",
};

export type NadaStatus = "sukses" | "peringatan" | "error" | "menunggu";

const NADA_STATUS: Record<StatusProgram, NadaStatus> = {
  MENUNGGU_VERIFIKASI: "peringatan",
  AKTIF: "sukses",
  MENUNGGU_KONFIRMASI: "peringatan",
  PERLU_REVISI: "error",
  SELESAI: "sukses",
};

/** Algo-C14-12 tampilkanStatusProgram. */
export function labelStatus(status: StatusProgram): string {
  return LABEL_STATUS[status];
}

export function nadaStatus(status: StatusProgram): NadaStatus {
  return NADA_STATUS[status];
}

export function labelKategori(kategori: "JAGA_ALAM" | "JAGA_IKLIM"): string {
  return kategori === "JAGA_ALAM" ? "Jaga Alam" : "Jaga Iklim";
}

export type AksiProgram = {
  /** I07-BTN-KelolaPendaftar: nonaktif selama Menunggu Verifikasi. */
  kelolaPendaftarAktif: boolean;
  /** I07-BTN-UnggahLaporan: null kalau tombol tidak ditampilkan. */
  laporan: { teks: string; aktif: boolean } | null;
};

export function aksiProgram(status: StatusProgram): AksiProgram {
  switch (status) {
    case "MENUNGGU_VERIFIKASI":
      return { kelolaPendaftarAktif: false, laporan: null };
    case "AKTIF":
      return {
        kelolaPendaftarAktif: true,
        laporan: { teks: "Unggah Laporan", aktif: true },
      };
    case "MENUNGGU_KONFIRMASI":
      return {
        kelolaPendaftarAktif: true,
        laporan: { teks: "Laporan Dikirim", aktif: false },
      };
    case "PERLU_REVISI":
      return {
        kelolaPendaftarAktif: true,
        laporan: { teks: "Unggah Ulang", aktif: true },
      };
    case "SELESAI":
      return { kelolaPendaftarAktif: true, laporan: null };
  }
}

export type RingkasProgram = {
  status: StatusProgram;
  /** Jumlah pendaftar yang masih berstatus MENUNGGU. */
  menunggu: number;
};

/** I07-LBL-Statistik. */
export function hitungStatistik(daftar: RingkasProgram[]) {
  return {
    programAktif: daftar.filter((p) => p.status === "AKTIF").length,
    pendaftarMenunggu: daftar.reduce((jumlah, p) => jumlah + p.menunggu, 0),
    laporanPerluRevisi: daftar.filter((p) => p.status === "PERLU_REVISI")
      .length,
  };
}

export function saringProgram<T extends { status: StatusProgram }>(
  daftar: T[],
  filter: FilterProgram,
): T[] {
  return filter === "SEMUA"
    ? daftar
    : daftar.filter((p) => p.status === filter);
}

/** Persentase untuk progress bar kuota (0 sampai 100). */
export function persenKuota(diterima: number, kuota: number): number {
  if (kuota <= 0) return 0;
  return Math.min(100, Math.round((diterima / kuota) * 100));
}
