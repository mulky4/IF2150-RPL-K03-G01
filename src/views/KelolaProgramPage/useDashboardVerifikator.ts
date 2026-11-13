"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

/** State dan aksi untuk Dashboard Verifikator (verifikasi program). */
export function useDashboardVerifikator() {
  const utils = api.useUtils();
  const query = api.program.programMenungguVerifikasi.useQuery();
  const [idTerpilih, setIdTerpilih] = useState<string | null>(null);
  const [pesanSukses, setPesanSukses] = useState<string | null>(null);
  const [galatAksi, setGalatAksi] = useState<string | null>(null);

  const setujui = api.program.setujuiProgram.useMutation({
    onSuccess: async (_hasil, variabel) => {
      // Nama diambil dari daftar sebelum dimuat ulang, bukan dari state yang di-reset.
      const nama = query.data?.find(
        (p) => p.id === variabel.idProgram,
      )?.namaProgram;
      setPesanSukses(
        nama
          ? `Program "${nama}" disetujui dan kini aktif.`
          : "Program disetujui dan kini aktif.",
      );
      setGalatAksi(null);
      setIdTerpilih(null);
      await utils.program.programMenungguVerifikasi.invalidate();
    },
    onError: async (error) => {
      setGalatAksi(error.message);
      setPesanSukses(null);
      setIdTerpilih(null);
      // Daftar dimuat ulang: program mungkin sudah diproses verifikator lain.
      await utils.program.programMenungguVerifikasi.invalidate();
    },
  });

  const programTerpilih = query.data?.find((p) => p.id === idTerpilih) ?? null;

  return {
    daftar: query.data ?? [],
    sedangMemuat: query.isLoading,
    galat: query.error?.message ?? null,
    programTerpilih,
    pilihProgram: (id: string) => setIdTerpilih(id),
    // Tidak bisa ditutup selagi persetujuan diproses.
    batalPilih: () => {
      if (!setujui.isPending) setIdTerpilih(null);
    },
    konfirmasiSetujui: () => {
      if (idTerpilih) setujui.mutate({ idProgram: idTerpilih });
    },
    sedangMenyetujui: setujui.isPending,
    pesanSukses,
    galatAksi,
  };
}
