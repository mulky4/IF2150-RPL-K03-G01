"use client";

import Link from "next/link";
import { useState } from "react";
import { Ikon } from "../components/Ikon";

type ProgramRingkas = {
  id: string;
  judul: string;
  inisiator: string;
  tanggal: string;
};

type ProgramDaftarViewProps = {
  program: ProgramRingkas;
  onSubmit: (data: { keterampilan: string; ketersediaanWaktu: string }) => Promise<void>;
  onBatal: () => void;
};

export function ProgramDaftarView({ program, onSubmit, onBatal }: ProgramDaftarViewProps) {
  const [keterampilan, setKeterampilan] = useState("");
  const [ketersediaanWaktu, setKetersediaanWaktu] = useState("Bisa hadir penuh (07.00–12.00 WIB)");
  const [setuju, setSetuju] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!setuju) return;
    setSubmitting(true);
    try {
      await onSubmit({ keterampilan, ketersediaanWaktu });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F8F5] py-10 px-4 flex justify-center items-start">
      <div className="w-full max-w-[640px] bg-white rounded-3xl p-8 shadow-sm">
        {/* Navigation Back */}
        <Link
          href={`/program/${program.id}`}
          className="inline-flex items-center gap-2 text-[#2D6A4F] font-medium text-sm mb-6 hover:underline"
        >
          <Ikon nama="back" ukuran={18} />
          Kembali ke detail program
        </Link>

        {/* Card Info Program */}
        <div className="bg-[#EAF5F0] rounded-2xl p-4 flex items-center gap-4 mb-8">
          <div className="size-12 rounded-2xl bg-[#A3E6C5] flex items-center justify-center shrink-0">
            <Ikon nama="calendar" ukuran={24} className="text-[#1B4332]" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-base">{program.judul}</h2>
            <p className="text-xs text-gray-600 font-medium">
              {program.inisiator} · {program.tanggal}
            </p>
          </div>
        </div>

        {/* Header Form */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Daftar sebagai Relawan</h1>

        {/* Form Pendaftaran */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Keterampilan */}
          <div>
            <label htmlFor="keterampilan" className="block text-sm font-semibold text-gray-800 mb-2">
              Keterampilan yang kamu miliki
            </label>
            <textarea
              id="keterampilan"
              rows={4}
              value={keterampilan}
              onChange={(e) => setKeterampilan(e.target.value)}
              placeholder="contoh: pernah ikut penanaman mangrove, bisa P3K, terbiasa kerja lapangan"
              className="w-full rounded-xl border border-gray-300 p-3.5 text-sm focus:border-[#2D6A4F] focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] placeholder:text-gray-400 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1.5">
              Membantu Inisiator Program menyeleksi relawan
            </p>
          </div>

          {/* Select Ketersediaan Waktu */}
          <div>
            <label htmlFor="ketersediaan" className="block text-sm font-semibold text-gray-800 mb-2">
              Ketersediaan waktu
            </label>
            <div className="relative">
              <select
                id="ketersediaan"
                value={ketersediaanWaktu}
                onChange={(e) => setKetersediaanWaktu(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:border-[#2D6A4F] focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] pr-10"
              >
                <option value="Bisa hadir penuh (07.00–12.00 WIB)">
                  Bisa hadir penuh (07.00–12.00 WIB)
                </option>
                <option value="Hanya sesi pagi (07.00–10.00 WIB)">
                  Hanya sesi pagi (07.00–10.00 WIB)
                </option>
                <option value="Hanya sesi siang (10.00–12.00 WIB)">
                  Hanya sesi siang (10.00–12.00 WIB)
                </option>
              </select>
              <Ikon
                nama="chevron-down"
                ukuran={18}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1.5">Pilih rentang waktu kamu bisa hadir</p>
          </div>

          {/* Checkbox Syarat & Ketentuan */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="setuju"
              checked={setuju}
              onChange={(e) => setSetuju(e.target.checked)}
              className="size-5 rounded border-gray-300 text-[#2D6A4F] focus:ring-[#2D6A4F] accent-[#2D6A4F] cursor-pointer"
            />
            <label htmlFor="setuju" className="text-sm font-medium text-gray-700 cursor-pointer">
              Saya sudah membaca dan menyetujui syarat dan ketentuan program.
            </label>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <button
              type="submit"
              disabled={!setuju || submitting}
              className="w-full bg-[#2D6A4F] text-white font-semibold py-3.5 rounded-xl hover:bg-[#21523D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {submitting ? "Mengirim..." : "Kirim Pendaftaran"}
            </button>
            <button
              type="button"
              onClick={onBatal}
              className="w-full text-gray-600 font-semibold py-2.5 rounded-xl hover:bg-gray-100 transition-colors text-sm text-center block"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}