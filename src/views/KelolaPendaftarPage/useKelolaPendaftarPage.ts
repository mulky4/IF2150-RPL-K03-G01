"use client";

import { useEffect, useMemo, useState } from "react";

import { api } from "~/trpc/react";

type StatusPilihan = "MENUNGGU" | "DITERIMA" | "DITOLAK";

export function useKelolaPendaftarPage(idProgram: string) {
  const utils = api.useUtils();
  const query = api.seleksi.lihatDaftarRelawan.useQuery({ idProgram });
  const [pilihan, setPilihan] = useState<Record<string, StatusPilihan>>({});

  useEffect(() => {
    if (!query.data) return;
    setPilihan(
      Object.fromEntries(
        query.data.pendaftar.map((pendaftar) => [
          pendaftar.id,
          pendaftar.status,
        ]),
      ),
    );
  }, [query.data]);

  const simpan = api.seleksi.simpanHasilSeleksi.useMutation({
    onSuccess: async () => {
      await utils.seleksi.lihatDaftarRelawan.invalidate({ idProgram });
    },
  });
  const konfirmasi = api.seleksi.konfirmasiHasilSeleksi.useMutation({
    onSuccess: async () => {
      await utils.seleksi.lihatDaftarRelawan.invalidate({ idProgram });
    },
  });

  const perubahan = useMemo(() => {
    return (query.data?.pendaftar ?? []).flatMap((pendaftar) => {
      const status = pilihan[pendaftar.id];
      if (
        pendaftar.status !== "MENUNGGU" ||
        (status !== "DITERIMA" && status !== "DITOLAK")
      ) {
        return [];
      }
      return [{ idPendaftaran: pendaftar.id, status }];
    });
  }, [pilihan, query.data]);
  const semuaDiputuskan =
    query.data !== undefined &&
    query.data.pendaftar.length > 0 &&
    query.data.pendaftar.every((pendaftar) => pendaftar.status !== "MENUNGGU");

  return {
    data: query.data,
    sedangMemuat: query.isPending,
    galat: query.error?.message ?? null,
    pilihan,
    setPilihan,
    perubahan,
    semuaDiputuskan,
    sedangMenyimpan: simpan.isPending,
    sedangMengumumkan: konfirmasi.isPending,
    galatMutasi: simpan.error?.message ?? konfirmasi.error?.message ?? null,
    berhasilSimpan: simpan.isSuccess,
    berhasilUmumkan: konfirmasi.isSuccess,
    simpanHasil: () => simpan.mutate({ idProgram, keputusan: perubahan }),
    umumkanHasil: () => konfirmasi.mutate({ idProgram }),
  };
}
