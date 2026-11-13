"use client";

import { useState } from "react";

import { belumDiimplementasi } from "~/lib/belumDiimplementasi";
import type { Program } from "~/server/models/Program";

/**
 * Operasi halaman Kegiatan Saya (AreaKegiatan.tsx) dan Portofolio
 * (Portofolio.tsx). Isinya disambung ke router presensi di issue berikutnya.
 */
export function useAreaKegiatanPage() {
  const [idProgram, setIdProgram] = useState<string | null>(null);

  return {
    idProgram,
    /** Cek status relawan dan waktu program untuk menentukan tombol check-in. */
    bukaHalamanKegiatan: (id: string) => {
      setIdProgram(id);
      return belumDiimplementasi("bukaHalamanKegiatan", id);
    },
    tampilkanTombolCheckIn: (aktif: boolean) =>
      belumDiimplementasi("tampilkanTombolCheckIn", aktif),
    tampilkanKeteranganWaktu: (keterangan: string) =>
      belumDiimplementasi("tampilkanKeteranganWaktu", keterangan),
    klikCheckIn: () => belumDiimplementasi("klikCheckIn", idProgram),
    tampilkanStatusCheckIn: (berhasil: boolean) =>
      belumDiimplementasi("tampilkanStatusCheckIn", berhasil),
    bukaPortofolio: () => belumDiimplementasi("bukaPortofolio"),
    tampilkanPortofolio: (totalJamAksi: number) =>
      belumDiimplementasi("tampilkanPortofolio", totalJamAksi),
    tampilkanRiwayatProgram: (daftar: Program[]) =>
      belumDiimplementasi("tampilkanRiwayatProgram", daftar),
  };
}
