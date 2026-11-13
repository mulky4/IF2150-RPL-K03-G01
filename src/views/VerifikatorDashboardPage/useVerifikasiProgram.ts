"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

/** State dan aksi untuk Dashboard Verifikator (verifikasi program). */
export function useVerifikasiProgram() {
  const utils = api.useUtils();
  const query = api.program.programMenungguVerifikasi.useQuery();
  const [idTerpilih, setIdTerpilih] = useState<string | null>(null);
  const [pesanSukses, setPesanSukses] = useState<string | null>(null);
  const [galatAksi, setGalatAksi] = useState<string | null>(null);

  const setujui = api.program.setujuiProgram.useMutation({
    onSuccess: async () => {
      const nama = query.data?.find((p) => p.id === idTerpilih)?.namaProgram;
      setPesanSukses(
        nama
          ? `Program "${nama}" disetujui dan kini aktif.`
          : "Program disetujui.",
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
    batalPilih: () => setIdTerpilih(null),
    konfirmasiSetujui: () => {
      if (idTerpilih) setujui.mutate({ idProgram: idTerpilih });
    },
    sedangMenyetujui: setujui.isPending,
    pesanSukses,
    galatAksi,
  };
}
