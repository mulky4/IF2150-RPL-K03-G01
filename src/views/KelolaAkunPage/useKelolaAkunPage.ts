"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { urlKembaliAman } from "~/lib/urlKembali";
import { api } from "~/trpc/react";

/** Galat dari tRPC yang dibaca views/ (lihat errorFormatter di server/api/trpc.ts). */
type GalatApi = {
  message: string;
  data?: { code?: string; daftarGalat?: string[] | null } | null;
};

/** Daftar pesan untuk banner: pakai daftarGalat kalau ada, kalau tidak pesan tunggal. */
export function pesanGalat(galat: GalatApi): string[] {
  const daftar = galat.data?.daftarGalat;
  if (daftar && daftar.length > 0) return daftar;
  if (galat.data?.code === "INTERNAL_SERVER_ERROR") {
    return ["Terjadi kesalahan. Coba lagi beberapa saat."];
  }
  return [galat.message];
}

export const DURASI_BLOKIR_MS = 5 * 60_000;

/**
 * C12 KelolaAkunPage «boundary» (Tabel 4.1 DPPL2).
 * Dipakai bersama oleh Registrasi.tsx (I-01), Login.tsx (I-02), dan Notifikasi.tsx (I-03).
 * Pemetaan operasi ke DPPL2 ada di komentar tiap fungsi.
 */
export function useKelolaAkunPage() {
  const router = useRouter();
  const [pesanError, setPesanError] = useState<string[]>([]);
  const [diblokir, setDiblokir] = useState(false);

  const mutasiDaftar = api.auth.daftar.useMutation();
  const mutasiMasuk = api.auth.masuk.useMutation();
  return {
    pesanError,
    diblokir,
    sedangMengirim: mutasiDaftar.isPending || mutasiMasuk.isPending,

    /** Algo-C12-05 kirimPendaftaran → C13 buatAkunBaru. Mengembalikan true kalau akun terbentuk. */
    kirimPendaftaran: async (formulir: FormData): Promise<boolean> => {
      setPesanError([]);
      try {
        await mutasiDaftar.mutateAsync(formulir);
        return true;
      } catch (galat) {
        // Algo-C12-07 tampilkanPesanError
        setPesanError(pesanGalat(galat as GalatApi));
        return false;
      }
    },

    /** Algo-C12-08. Dipanggil EksplorasiProgramPage saat pengguna belum login. */
    arahkanKeLogin: (url: string) => {
      router.push(`/login?urlKembali=${encodeURIComponent(url)}`);
    },

    /**
     * Algo-C12-11 terimaInputKredensial → C13 validasiKredensial.
     * Berhasil → Algo-C12-09 arahkanKembali ke `urlKembali` (atau beranda).
     * Pemuatan penuh dipakai supaya sesi baru langsung terbaca Navbar.
     */
    terimaInputKredensial: async (
      email: string,
      kataSandi: string,
      tujuan: string | null,
    ): Promise<void> => {
      setPesanError([]);
      try {
        await mutasiMasuk.mutateAsync({ email, kataSandi });
        window.location.assign(urlKembaliAman(tujuan) ?? "/");
      } catch (galat) {
        const g = galat as GalatApi;
        if (g.data?.code === "TOO_MANY_REQUESTS") {
          // Algo-C12-12 tampilkanPesanStatus: IP diblokir 5 menit (KNF06).
          setDiblokir(true);
          setTimeout(() => setDiblokir(false), DURASI_BLOKIR_MS);
          return;
        }
        setPesanError(pesanGalat(g));
      }
    },
  };
}

/** Bagian C12 untuk I-03: Algo-C12-13..16. Dipisah supaya halaman lain tidak memuat query notifikasi. */
export function useNotifikasiPage() {
  const utils = api.useUtils();
  // Algo-C12-13 bukaMenuNotifikasi → Algo-C12-15 tampilkanDaftarNotifikasi
  const daftar = api.auth.daftarNotifikasi.useQuery();
  // Algo-C12-14 pilihNotifikasi → Algo-C12-16 tampilkanDetailNotifikasi
  const mutasiBaca = api.auth.bacaNotifikasi.useMutation({
    onSuccess: async () => {
      await Promise.all([
        utils.auth.daftarNotifikasi.invalidate(),
        utils.auth.jumlahBelumDibaca.invalidate(),
      ]);
    },
  });

  return {
    daftar: daftar.data,
    sedangMemuat: daftar.isPending,
    galatMemuat: daftar.error ? pesanGalat(daftar.error) : [],
    muatUlang: () => void daftar.refetch(),
    pilihNotifikasi: (idNotifikasi: string) =>
      mutasiBaca.mutateAsync({ idNotifikasi }),
    galatMembuka: mutasiBaca.error ? pesanGalat(mutasiBaca.error) : [],
  };
}
