"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { belumDiimplementasi } from "~/lib/belumDiimplementasi";
import type { DataDiri } from "~/server/controllers/AuthController";
import type { Notifikasi } from "~/server/models/Notifikasi";

/**
 * C12 KelolaAkunPage «boundary» (Tabel 4.1 DPPL2).
 * Atribut dan operasinya dipakai bersama oleh Registrasi.tsx (I-01), Login.tsx (I-02),
 * dan Notifikasi.tsx (I-03). Operasi diisi per issue fitur Modul 1.
 */
export function useKelolaAkunPage() {
  const router = useRouter();
  const [dataDiri, setDataDiri] = useState<DataDiri | null>(null);
  const [berkas, setBerkas] = useState<File | null>(null);
  const [formLogin, setFormLogin] = useState<{
    email: string;
    kataSandi: string;
  } | null>(null);
  const [urlKembali, setUrlKembali] = useState<string | null>(null);

  return {
    dataDiri,
    berkas,
    formLogin,
    urlKembali,
    /** Algo-C12-01 */
    bukaHalamanRegistrasi: () => belumDiimplementasi("bukaHalamanRegistrasi"),
    /** Algo-C12-02 */
    tampilkanFormRegistrasi: () =>
      belumDiimplementasi("tampilkanFormRegistrasi"),
    /** Algo-C12-03 */
    isiFormRegistrasi: (data: DataDiri) => setDataDiri(data),
    /** Algo-C12-04 */
    unggahDokumen: (file: File) => setBerkas(file),
    /** Algo-C12-05 */
    kirimPendaftaran: () =>
      belumDiimplementasi("kirimPendaftaran", dataDiri, berkas),
    /** Algo-C12-06 */
    tampilkanNotifikasiBerhasil: () =>
      belumDiimplementasi("tampilkanNotifikasiBerhasil"),
    /** Algo-C12-07 */
    tampilkanPesanError: (pesan: string) =>
      belumDiimplementasi("tampilkanPesanError", pesan),
    /** Algo-C12-08. Dipanggil EksplorasiProgramPage saat pengguna belum login. */
    arahkanKeLogin: (url: string) => {
      setUrlKembali(url);
      router.push(`/login?urlKembali=${encodeURIComponent(url)}`);
    },
    /** Algo-C12-09 */
    arahkanKembali: () => belumDiimplementasi("arahkanKembali", urlKembali),
    /** Algo-C12-10 */
    tampilkanFormLogin: () => belumDiimplementasi("tampilkanFormLogin"),
    /** Algo-C12-11 */
    terimaInputKredensial: (email: string, kataSandi: string) => {
      setFormLogin({ email, kataSandi });
      return belumDiimplementasi("terimaInputKredensial", email);
    },
    /** Algo-C12-12 */
    tampilkanPesanStatus: (pesan: string) =>
      belumDiimplementasi("tampilkanPesanStatus", pesan),
    /** Algo-C12-13 */
    bukaMenuNotifikasi: () => belumDiimplementasi("bukaMenuNotifikasi"),
    /** Algo-C12-14 */
    pilihNotifikasi: (idNotifikasi: string) =>
      belumDiimplementasi("pilihNotifikasi", idNotifikasi),
    /** Algo-C12-15 */
    tampilkanDaftarNotifikasi: (daftar: Notifikasi[]) =>
      belumDiimplementasi("tampilkanDaftarNotifikasi", daftar),
    /** Algo-C12-16 */
    tampilkanDetailNotifikasi: (detail: string) =>
      belumDiimplementasi("tampilkanDetailNotifikasi", detail),
  };
}
