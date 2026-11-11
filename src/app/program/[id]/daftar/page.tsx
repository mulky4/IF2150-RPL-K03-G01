"use client";

import { useRouter } from "next/navigation";
import { ProgramDaftarView } from "~/views/KelolaProgramPage/ProgramDaftarView";
import { api } from "~/trpc/react";

export default function PageDaftarProgram({ params }: { params: { id: string } }) {
  const router = useRouter();

  const daftarMutation = api.program.daftarRelawan.useMutation({
    onSuccess: () => {
      alert("Pendaftaran berhasil dikirim!");
      router.push(`/program/${params.id}`);
    },
    onError: (err) => {
      alert(`Gagal mendaftar: ${err.message}`);
    },
  });

  const dataProgram = {
    id: params.id,
    judul: "Penanaman 1.000 Mangrove PIK",
    inisiator: "Yayasan Mangrove Jakarta",
    tanggal: "Sab, 14 Nov 2026",
  };

  const handleSubmit = async (payload: { keterampilan: string; ketersediaanWaktu: string }) => {
    await daftarMutation.mutateAsync({
      programId: params.id,
      keterampilan: payload.keterampilan,
      ketersediaanWaktu: payload.ketersediaanWaktu,
    });
  };

  return (
    <ProgramDaftarView
      program={dataProgram}
      onSubmit={handleSubmit}
      onBatal={() => router.back()}
    />
  );
}