"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { api } from "~/trpc/react";

/**
 * Operasi halaman Kegiatan Saya (AreaKegiatan.tsx) dan Portofolio
 * (Portofolio.tsx). Program yang sedang dibuka disimpan di URL
 * (?program=<id>) supaya bisa dibagikan dan tetap ada saat halaman dimuat ulang.
 */
export function useAreaKegiatanPage() {
  const router = useRouter();
  const params = useSearchParams();
  const utils = api.useUtils();

  const daftarKegiatan = api.presensi.daftarKegiatan.useQuery();
  const daftar = daftarKegiatan.data ?? [];

  // Tanpa ?program, yang dibuka adalah kegiatan terdekat (urutan pertama).
  const idDiminta = params.get("program");
  const kegiatan =
    daftar.find((k) => k.idProgram === idDiminta) ?? daftar[0] ?? null;
  const idProgram = kegiatan?.idProgram ?? "";
  const adaProgram = kegiatan !== null;

  const statusRelawan = api.presensi.validasiStatusRelawan.useQuery(
    { idProgram },
    { enabled: adaProgram },
  );
  const waktuValid = api.presensi.validasiWaktuPelaksanaan.useQuery(
    { idProgram },
    // Dicek ulang tiap menit supaya tombol ikut aktif saat kegiatan dimulai.
    { enabled: adaProgram, refetchInterval: 60_000 },
  );
  const keteranganWaktu = api.presensi.ambilKeteranganWaktu.useQuery(
    { idProgram },
    { enabled: adaProgram, refetchInterval: 60_000 },
  );

  const checkIn = api.presensi.prosesCheckIn.useMutation({
    onSettled: () => utils.presensi.daftarKegiatan.invalidate(),
  });

  const waktuKehadiran =
    checkIn.data?.waktuKehadiran ?? kegiatan?.waktuKehadiran ?? null;
  const memuatStatus =
    adaProgram && (statusRelawan.isPending || waktuValid.isPending);

  return {
    daftar,
    memuatDaftar: daftarKegiatan.isPending,
    gagalMemuat: daftarKegiatan.isError,
    kegiatan,
    memuatStatus,
    /** Pendaftaran relawan di program ini sudah diterima. */
    statusRelawan: statusRelawan.data === true,
    /** Sekarang masih di dalam waktu pelaksanaan program. */
    waktuValid: waktuValid.data === true,
    keteranganWaktu: keteranganWaktu.data ?? null,
    waktuKehadiran,
    tombolCheckInAktif:
      statusRelawan.data === true &&
      waktuValid.data === true &&
      waktuKehadiran === null &&
      !checkIn.isPending,
    sedangCheckIn: checkIn.isPending,
    checkInBerhasil: checkIn.isSuccess,
    pesanGagalCheckIn: checkIn.error?.message ?? null,

    /** Pindah ke program lain di daftar. */
    bukaHalamanKegiatan: (id: string) => {
      checkIn.reset();
      router.replace(`/kegiatan?program=${encodeURIComponent(id)}`, {
        scroll: false,
      });
    },
    klikCheckIn: () => {
      if (adaProgram) checkIn.mutate({ idProgram });
    },
  };
}

/**
 * Data halaman Portofolio: profil, total jam aksi, riwayat program selesai,
 * dan program yang masih diikuti (sudah diterima tapi belum masuk riwayat).
 */
export function usePortofolio() {
  const profil = api.presensi.ambilProfilRelawan.useQuery();
  const totalJamAksi = api.presensi.ambilTotalJamAksi.useQuery();
  const riwayat = api.presensi.ambilRiwayatProgram.useQuery();
  const kegiatan = api.presensi.daftarKegiatan.useQuery();

  const daftarRiwayat = riwayat.data ?? [];
  const idSelesai = new Set(daftarRiwayat.map((p) => p.idProgram));
  const sedangDiikuti = (kegiatan.data ?? []).filter(
    (k) => k.statusPendaftaran === "DITERIMA" && !idSelesai.has(k.idProgram),
  );

  const semua = [profil, totalJamAksi, riwayat, kegiatan];
  return {
    memuat: semua.some((q) => q.isPending),
    gagalMemuat: semua.some((q) => q.isError),
    profil: profil.data ?? null,
    totalJamAksi: totalJamAksi.data ?? 0,
    riwayat: daftarRiwayat,
    sedangDiikuti,
  };
}

export type KegiatanDiLayar = NonNullable<
  ReturnType<typeof useAreaKegiatanPage>["kegiatan"]
>;

export type ItemRiwayat = ReturnType<typeof usePortofolio>["riwayat"][number];
