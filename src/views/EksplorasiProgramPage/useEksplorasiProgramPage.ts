"use client";

import { useEffect, useState } from "react";

import { JUMLAH_PER_MUAT, MAKS_DIMUAT } from "~/lib/pencarianProgram";

export type FilterKategori = "JAGA_ALAM" | "JAGA_IKLIM" | null;

/** Jeda setelah user berhenti mengetik sebelum pencarian dikirim ke server. */
const JEDA_PENCARIAN_MS = 300;

/**
 * Keadaan halaman Eksplorasi Program dan Detail Program: kata kunci pencarian
 * (dengan jeda), filter kategori, jumlah program yang dimuat, dan pembukaan
 * situs resmi lembaga. Dipakai bersama oleh Eksplorasi.tsx dan DetailProgram.tsx.
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

  /** Membuka situs resmi lembaga di tab baru. */
  function arahkanKeSitusResmi(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return {
    /** Teks di kotak pencarian (langsung); kataKunciPencarian adalah versi yang sudah dijeda. */
    masukanPencarian,
    kataKunciPencarian,
    filterKategori,
    /** Menyimpan kata kunci dan kategori terbaru, lalu mulai lagi dari halaman pertama. */
    terimaInputPencarian: (kataKunci: string, kategori: FilterKategori) => {
      setMasukanPencarian(kataKunci);
      setFilterKategori(kategori);
      setBatas(JUMLAH_PER_MUAT);
    },
    batas,
    /** Menambah jumlah program yang dimuat, sampai batas maksimum per kueri. */
    muatLebihBanyak: () =>
      setBatas((lama) => Math.min(lama + JUMLAH_PER_MUAT, MAKS_DIMUAT)),
    /** Tautan kosong atau tidak valid tidak membuka apa pun (tombolnya sudah nonaktif). */
    klikTautanSitusResmi: (url: string | null) => {
      if (url) arahkanKeSitusResmi(url);
    },
    arahkanKeSitusResmi,
  };
}
