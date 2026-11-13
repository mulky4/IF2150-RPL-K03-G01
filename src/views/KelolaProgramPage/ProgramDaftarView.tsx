"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Banner } from "../components/Banner";
import { Button } from "../components/Button";
import { Ikon } from "../components/Ikon";
import { Select } from "../components/Select";
import { TextArea } from "../components/TextArea";
import { useProgramDaftar } from "./useProgramDaftar";

const OPSI_WAKTU = [
  {
    nilai: "Bisa hadir penuh (07.00–12.00 WIB)",
    label: "Bisa hadir penuh (07.00–12.00 WIB)",
  },
  {
    nilai: "Hanya sesi pagi (07.00–10.00 WIB)",
    label: "Hanya sesi pagi (07.00–10.00 WIB)",
  },
  {
    nilai: "Hanya sesi siang (10.00–12.00 WIB)",
    label: "Hanya sesi siang (10.00–12.00 WIB)",
  },
];

export function ProgramDaftarView({ programId }: { programId: string }) {
  const {
    program,
    sedangMemuat,
    gagalMemuat,
    kirim,
    sedangMengirim,
    pesanGalat,
    pesanSukses,
    batal,
  } = useProgramDaftar(programId);

  const [keterampilan, setKeterampilan] = useState("");
  const [ketersediaanWaktu, setKetersediaanWaktu] = useState(
    OPSI_WAKTU[0]!.nilai,
  );
  const [setuju, setSetuju] = useState(false);
  const [galatKeterampilan, setGalatKeterampilan] = useState("");

  // Pesan hasil kirim ada di atas formulir; di layar kecil tombol Kirim ada
  // jauh di bawah, jadi gulir ke pesan supaya langsung terlihat.
  const areaPesanRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (pesanGalat || pesanSukses) {
      areaPesanRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [pesanGalat, pesanSukses]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!setuju) return;
    if (!keterampilan.trim()) {
      setGalatKeterampilan("Keterampilan wajib diisi.");
      return;
    }
    setGalatKeterampilan("");
    kirim({ keterampilan: keterampilan.trim(), ketersediaanWaktu });
  };

  const tanggal = program
    ? new Date(program.waktuMulai).toLocaleDateString("id-ID", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <div className="bg-background flex min-h-screen items-start justify-center px-4 py-10">
      <div className="bg-card shadow-card w-full max-w-[640px] rounded-3xl p-8">
        <Link
          href={`/program/${programId}`}
          className="text-primary mb-6 inline-flex items-center gap-2 text-sm font-medium hover:underline"
        >
          <Ikon nama="back" ukuran={18} />
          Kembali ke detail program
        </Link>

        {sedangMemuat && (
          <p className="text-text-secondary text-sm">Memuat program...</p>
        )}

        {gagalMemuat && <Banner nada="error">Program tidak ditemukan.</Banner>}

        {program && (
          <>
            <div className="bg-subtle mb-8 flex items-center gap-4 rounded-2xl p-4">
              <div className="bg-brand-light flex size-12 shrink-0 items-center justify-center rounded-2xl">
                <Ikon nama="calendar" ukuran={24} className="text-primary" />
              </div>
              <div>
                <h2 className="text-text text-base font-bold">
                  {program.namaProgram}
                </h2>
                <p className="text-text-secondary text-xs font-medium">
                  {program.tempatPelaksanaan} · {tanggal}
                </p>
              </div>
            </div>

            <h1 className="text-text mb-6 text-2xl font-bold">
              Daftar sebagai Relawan
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {(pesanSukses !== "" || pesanGalat !== "") && (
                <div ref={areaPesanRef} className="scroll-mt-24 space-y-6">
                  {pesanSukses && <Banner nada="sukses">{pesanSukses}</Banner>}
                  {pesanGalat && <Banner nada="error">{pesanGalat}</Banner>}
                </div>
              )}

              <TextArea
                label="Keterampilan yang kamu miliki"
                rows={4}
                value={keterampilan}
                onChange={(e) => setKeterampilan(e.target.value)}
                placeholder="contoh: pernah ikut penanaman mangrove, bisa P3K"
                bantuan="Membantu Inisiator Program menyeleksi relawan"
                error={galatKeterampilan || undefined}
              />

              <Select
                label="Ketersediaan waktu"
                value={ketersediaanWaktu}
                onChange={(e) => setKetersediaanWaktu(e.target.value)}
                opsi={OPSI_WAKTU}
                bantuan="Pilih rentang waktu kamu bisa hadir"
              />

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="setuju"
                  checked={setuju}
                  onChange={(e) => setSetuju(e.target.checked)}
                  className="accent-primary size-5 cursor-pointer"
                />
                <label
                  htmlFor="setuju"
                  className="text-text cursor-pointer text-sm font-medium"
                >
                  Saya sudah membaca dan menyetujui syarat dan ketentuan
                  program.
                </label>
              </div>

              <div className="space-y-3 pt-4">
                <Button
                  type="submit"
                  lebarPenuh
                  disabled={!setuju || sedangMengirim || !!pesanSukses}
                >
                  {sedangMengirim ? "Mengirim..." : "Kirim Pendaftaran"}
                </Button>
                <Button varian="ghost" lebarPenuh onClick={batal}>
                  Batal
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
