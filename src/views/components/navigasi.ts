import type { NamaIkon } from "./Ikon";

/** PENGUNJUNG = user yang belum login. */
export type PeranNavigasi =
  "PENGUNJUNG" | "RELAWAN" | "INISIATOR" | "VERIFIKATOR";

export type ItemMenu = {
  label: string;
  /** Label pendek untuk bottom nav. Kalau kosong, pakai label biasa. */
  labelMobile?: string;
  href: string;
  ikon: NamaIkon;
  /** Isi false kalau menu ini cukup ada di mobile (di desktop notifikasi sudah jadi ikon lonceng). */
  desktop?: boolean;
};

const NOTIFIKASI: ItemMenu = {
  label: "Notifikasi",
  href: "/notifikasi",
  ikon: "bell",
  desktop: false,
};

/** Daftar menu tiap peran. Kalau butuh menu baru, tambahkan di sini. */
export const MENU: Record<PeranNavigasi, ItemMenu[]> = {
  PENGUNJUNG: [
    {
      label: "Eksplorasi Program",
      labelMobile: "Eksplorasi",
      href: "/program",
      ikon: "compass",
    },
  ],
  RELAWAN: [
    { label: "Eksplorasi", href: "/program", ikon: "compass" },
    {
      label: "Kegiatan Saya",
      labelMobile: "Kegiatan",
      href: "/kegiatan",
      ikon: "clipboard",
    },
    { label: "Portofolio", href: "/portofolio", ikon: "award" },
    NOTIFIKASI,
  ],
  INISIATOR: [
    {
      label: "Program Saya",
      labelMobile: "Program",
      href: "/inisiator/program",
      ikon: "file",
    },
    {
      label: "Daftarkan Program",
      labelMobile: "Daftarkan",
      href: "/inisiator/program/baru",
      ikon: "plus",
    },
    NOTIFIKASI,
  ],
  VERIFIKATOR: [
    {
      label: "Laporan Masuk",
      labelMobile: "Laporan",
      href: "/verifikator/laporan",
      ikon: "clipboard",
    },
    // TODO: tambah menu "Verifikasi Program" ke /verifikator.
    NOTIFIKASI,
  ],
};

/** Cari menu yang sedang aktif dari pathname (ambil yang paling cocok). */
export function cariItemAktif(items: ItemMenu[], pathname: string) {
  let aktif: ItemMenu | undefined;
  for (const item of items) {
    const cocok =
      pathname === item.href || pathname.startsWith(`${item.href}/`);
    if (cocok && (!aktif || item.href.length > aktif.href.length)) aktif = item;
  }
  return aktif?.href;
}

/** Contoh: "Rani Pratiwi" jadi "RP". */
export function inisial(nama: string) {
  return nama
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((kata) => kata[0]?.toUpperCase())
    .join("");
}
