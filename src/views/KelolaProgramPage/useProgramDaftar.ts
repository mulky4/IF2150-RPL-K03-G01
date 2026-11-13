"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export function useProgramDaftar(programId: string) {
  const router = useRouter();
  const [pesanGalat, setPesanGalat] = useState("");
  const [pesanSukses, setPesanSukses] = useState("");

  const programQuery = api.program.getById.useQuery({ id: programId });

  const mutation = api.program.daftarRelawan.useMutation({
    onSuccess: () => {
      setPesanSukses("Pendaftaran berhasil dikirim.");
      setTimeout(() => router.push(`/program/${programId}`), 1500);
    },
    onError: (error) => setPesanGalat(error.message),
  });

  const kirim = (data: { keterampilan: string; ketersediaanWaktu: string }) => {
    setPesanGalat("");
    mutation.mutate({ programId, ...data });
  };

  return {
    program: programQuery.data,
    sedangMemuat: programQuery.isLoading,
    gagalMemuat: programQuery.isError,
    kirim,
    sedangMengirim: mutation.isPending,
    pesanGalat,
    pesanSukses,
    batal: () => router.back(),
  };
}
