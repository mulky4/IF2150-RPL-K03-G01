"use client";

import { useEffect, useState } from "react";

export type FilterKategori = "JAGA_ALAM" | "JAGA_IKLIM" | null;

/** Jeda setelah user berhenti mengetik sebelum pencarian dikirim ke server. */
const JEDA_PENCARIAN_MS = 300;

/** Jumlah program per "halaman"; tombol Muat Lebih Banyak menambah sebanyak ini (KNF01). */
export const JUMLAH_PER_MUAT = 24;
const MAKS_DIMUAT = 120;

/**
 * C16 EksplorasiProgramPage «boundary» (Tabel 4.1 DPPL2), dipakai bersama
 * Eksplorasi.tsx (I-04) dan DetailProgram.tsx (I-05).
 *
 * Pemetaan operasi DPPL:
 * - bukaHalamanEksplorasi() (Algo-C16-01): Eksplorasi.tsx memuat semua program aktif
 *   saat dibuka (kata kunci "" dan kategori null).
 * - terimaInputPencarian() (Algo-C16-02): di bawah.
 * - tampilkanDaftarProgram() / tampilkanPesanTidakDitemukan() (Algo-C16-03/04): Eksplorasi.tsx.
 * - pilihProgram() / tampilkanDetailProgram() (Algo-C16-05/06): navigasi kartu ke
 *   /program/[id], isi halamannya di DetailProgram.tsx.
 * - klikTautanSitusResmi() / arahkanKeSitusResmi() / nonaktifkanTautan()
 *   (Algo-C16-07/08/09): di bawah dan DetailProgram.tsx.
 * - pilihDaftarProgram() dan seterusnya (Algo-C16-10..12) milik Modul 3: tombol
 *   "Daftar Program" mengarah ke /program/[id]/daftar.
 */
export function useEksplorasiProgramPage() {
  const [masukanPencarian, setMasukanPencarian] = useState("");
  const [kataKunciPencarian, setKataKunciPencarian] = useState("");
  const [filterKategori, setFilterKategori] = useState<FilterKategori>(null);
  const [batas, setBatas] = useState(JUMLAH_PER_MUAT);

  useEffect(() => {
    const pewaktu = setTimeout(
      () => setKataKunciPencarian(masukanPencarian),
      JEDA_PENCARIAN_MS,
    );
    return () => clearTimeout(pewaktu);
  }, [masukanPencarian]);

  /** Algo-C16-08. Membuka situs resmi lembaga di tab baru. */
  function arahkanKeSitusResmi(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return {
    /** Teks di kotak pencarian (langsung); kataKunciPencarian adalah versi yang sudah dijeda. */
    masukanPencarian,
    kataKunciPencarian,
    filterKategori,
    /** Algo-C16-02 */
    terimaInputPencarian: (kataKunci: string, kategori: FilterKategori) => {
      setMasukanPencarian(kataKunci);
      setFilterKategori(kategori);
      setBatas(JUMLAH_PER_MUAT); // pencarian baru mulai dari halaman pertama
    },
    batas,
    /** Menambah jumlah program yang dimuat, sampai batas maksimum per kueri. */
    muatLebihBanyak: () =>
      setBatas((lama) => Math.min(lama + JUMLAH_PER_MUAT, MAKS_DIMUAT)),
    batasMaksimum: MAKS_DIMUAT,
    /** Algo-C16-07. Tautan null/tidak valid tidak membuka apa pun (tombol sudah nonaktif). */
    klikTautanSitusResmi: (url: string | null) => {
      if (url) arahkanKeSitusResmi(url);
    },
    arahkanKeSitusResmi,
  };
}
