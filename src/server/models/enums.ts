// Tipe enumerasi sesuai Tabel 4.3 DPPL2 + Peran (SPEC §1).
// Modul 3 boleh mengganti isi file ini menjadi re-export enum Prisma
// selama nama dan nilainya tetap sama.

export const KategoriProgram = {
  JAGA_ALAM: "JAGA_ALAM",
  JAGA_IKLIM: "JAGA_IKLIM",
} as const;
export type KategoriProgram =
  (typeof KategoriProgram)[keyof typeof KategoriProgram];

export const StatusProgram = {
  MENUNGGU_VERIFIKASI: "MENUNGGU_VERIFIKASI",
  AKTIF: "AKTIF",
  MENUNGGU_KONFIRMASI: "MENUNGGU_KONFIRMASI",
  PERLU_REVISI: "PERLU_REVISI",
  SELESAI: "SELESAI",
} as const;
export type StatusProgram = (typeof StatusProgram)[keyof typeof StatusProgram];

export const StatusPendaftaran = {
  MENUNGGU: "MENUNGGU",
  DITERIMA: "DITERIMA",
  DITOLAK: "DITOLAK",
} as const;
export type StatusPendaftaran =
  (typeof StatusPendaftaran)[keyof typeof StatusPendaftaran];

export const StatusVerifikasi = {
  MENUNGGU: "MENUNGGU",
  TERVERIFIKASI: "TERVERIFIKASI",
  DITOLAK: "DITOLAK",
} as const;
export type StatusVerifikasi =
  (typeof StatusVerifikasi)[keyof typeof StatusVerifikasi];

export const StatusPeninjauan = {
  MENUNGGU: "MENUNGGU",
  DISETUJUI: "DISETUJUI",
  DITOLAK: "DITOLAK",
} as const;
export type StatusPeninjauan =
  (typeof StatusPeninjauan)[keyof typeof StatusPeninjauan];

export const Peran = {
  RELAWAN: "RELAWAN",
  INISIATOR: "INISIATOR",
  VERIFIKATOR: "VERIFIKATOR",
} as const;
export type Peran = (typeof Peran)[keyof typeof Peran];
