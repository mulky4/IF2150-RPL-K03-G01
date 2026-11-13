"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { Banner } from "~/views/components/Banner";
import { Ikon } from "~/views/components/Ikon";

// Batasan KNF03: 2 MB dan format berkas yang diizinkan
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

export function LaporanFormView() {
  const router = useRouter();

  const programsQuery = api.laporan.programUntukLaporan.useQuery();
  const createMutation = api.laporan.buatLaporan.useMutation({
    onSuccess: ({ status }) => {
      setPesanSukses(`Laporan terkirim. Status program: ${status}.`);
      setTimeout(() => router.push("/inisiator/program"), 1500);
    },
    onError: (error) => setErrorMessage(error.message),
  });

  const [programId, setProgramId] = useState("");
  const [dokumentasiText, setDokumentasiText] = useState("");
  const [ringkasan, setRingkasan] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pesanSukses, setPesanSukses] = useState("");

  // State pendukung unggah berkas fisik (KNF03)
  const [fileError, setFileError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const selectedProgram = programsQuery.data?.find(
    (program) => program.id === programId,
  );

  // Validasi Berkas KNF03
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileError(null);

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError("Ukuran berkas melebihi batas maksimal 2 MB.");
      event.target.value = "";
      setSelectedFile(null);
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError(
        "Format berkas tidak valid. Gunakan format JPG, PNG, WEBP, atau PDF.",
      );
      event.target.value = "";
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const dokumentasi = dokumentasiText
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);

    if (!programId) {
      setErrorMessage("Pilih program yang akan dilaporkan.");
      return;
    }
    if (dokumentasi.length === 0 && !selectedFile) {
      setErrorMessage(
        "Masukkan minimal satu tautan dokumentasi atau unggah berkas bukti.",
      );
      return;
    }
    if (dokumentasi.some((url) => !/^https?:\/\/\S+$/i.test(url))) {
      setErrorMessage(
        "Setiap dokumentasi harus berupa tautan HTTP atau HTTPS.",
      );
      return;
    }
    if (!ringkasan.trim()) {
      setErrorMessage("Ringkasan capaian wajib diisi.");
      return;
    }

    createMutation.mutate({
      programId,
      dokumentasi,
      ringkasanCapaian: ringkasan.trim(),
    });
  };

  return (
    <div className="min-h-screen bg-[#EAF7EE] pb-16 font-sans text-[#12372A]">
      {/* Navbar Topbar */}
      <header className="flex items-center justify-between border-b border-[#D3DDD8]/60 bg-white px-10 py-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-extrabold tracking-wider text-[#2D6A4F]">
            REKAN
          </span>
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2D6A4F] text-[10px] font-bold text-white">
            🌍
          </div>
        </div>

        <nav className="flex items-center space-x-2">
          <Link
            href="/inisiator/program"
            className="rounded-full bg-[#D8F3DC] px-4 py-1.5 text-xs font-bold text-[#2D6A4F]"
          >
            Program Saya
          </Link>
          <Link
            href="/program/daftar"
            className="text-text-secondary rounded-full px-4 py-1.5 text-xs font-semibold hover:text-[#2D6A4F]"
          >
            Daftarkan Program
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative cursor-pointer">
            <Ikon nama="bell" ukuran={20} className="text-text-secondary" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#B42318] text-[9px] font-bold text-white">
              1
            </span>
          </div>
          <div className="flex cursor-pointer items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#B7E4C7] text-xs font-bold text-[#2D6A4F]">
              YM
            </div>
            <span className="text-xs font-bold text-[#12372A]">
              Yayasan Mangrove Jakarta
            </span>
            <Ikon
              nama="chevron-down"
              ukuran={14}
              className="text-text-secondary"
            />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-3xl space-y-6 px-6 py-8">
        <Link
          href="/inisiator/program"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#2D6A4F] hover:underline"
        >
          <Ikon nama="back" ukuran={16} />
          <span>Kembali ke Program Saya</span>
        </Link>

        <h1 className="text-3xl font-extrabold text-[#12372A]">
          Unggah Laporan Akhir
        </h1>

        {/* Card Header Info Program */}
        <div className="flex items-center space-x-4 rounded-2xl border border-[#D3DDD8]/60 bg-white p-5 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#D8F3DC] text-[#2D6A4F]">
            <Ikon nama="file" ukuran={28} />
          </div>
          <div>
            <span className="rounded-full bg-[#D8F3DC] px-2.5 py-0.5 text-[10px] font-bold text-[#2D6A4F]">
              Aktif
            </span>
            <h2 className="mt-1 text-base font-bold text-[#12372A]">
              {selectedProgram?.namaProgram ?? "Pilih program"}
            </h2>
            <p className="text-text-secondary text-xs">
              {selectedProgram
                ? `Status: ${selectedProgram.status}`
                : "Pilih program aktif untuk mengajukan laporan akhir"}
            </p>
          </div>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-[#D3DDD8]/60 bg-white p-8 shadow-sm"
        >
          {pesanSukses && <Banner nada="sukses">{pesanSukses}</Banner>}
          {errorMessage && <Banner nada="error">{errorMessage}</Banner>}
          {programsQuery.isLoading && (
            <p className="text-text-secondary text-sm">Memuat program...</p>
          )}
          {programsQuery.isError && (
            <Banner nada="error">
              Gagal memuat program: {programsQuery.error.message}
            </Banner>
          )}
          <div className="space-y-2">
            <label
              htmlFor="programId"
              className="block text-xs font-bold text-[#12372A]"
            >
              Program yang dilaporkan <span className="text-[#B42318]">*</span>
            </label>
            <select
              id="programId"
              value={programId}
              onChange={(event) => setProgramId(event.target.value)}
              required
              className="w-full rounded-lg border border-[#D3DDD8] bg-white p-2.5 text-xs"
            >
              <option value="">Pilih program</option>
              {programsQuery.data?.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.namaProgram} ({program.status})
                </option>
              ))}
            </select>
            {programsQuery.data?.length === 0 && (
              <p className="text-text-secondary text-xs">
                Belum ada program aktif atau program yang memerlukan revisi.
              </p>
            )}
          </div>

          {/* Validasi Unggah Berkas KNF03 (Maks 2 MB) */}
          <div className="space-y-2">
            <label
              htmlFor="fileUpload"
              className="block text-xs font-bold text-[#12372A]"
            >
              Unggah Berkas Laporan (Maksimal 2 MB)
            </label>
            <div className="relative flex items-center">
              <input
                id="fileUpload"
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.pdf"
                onChange={handleFileChange}
                className="text-text-secondary w-full text-xs file:mr-4 file:rounded-xl file:border-0 file:bg-[#D8F3DC] file:px-4 file:py-2 file:text-xs file:font-bold file:text-[#2D6A4F] hover:file:bg-[#B7E4C7]"
              />
            </div>
            {fileError && <Banner nada="error">{fileError}</Banner>}
            {selectedFile && !fileError && (
              <p className="text-xs font-medium text-[#2D6A4F]">
                ✓ Berkas terpilih: {selectedFile.name} (
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
            <p className="text-text-secondary text-[10px]">
              Format diizinkan: JPG, PNG, WEBP, atau PDF. Ukuran maks: 2 MB.
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="dokumentasi"
              className="block text-xs font-bold text-[#12372A]"
            >
              Tautan dokumentasi akhir <span className="text-[#B42318]">*</span>
            </label>
            <textarea
              id="dokumentasi"
              rows={4}
              value={dokumentasiText}
              onChange={(event) => setDokumentasiText(event.target.value)}
              required
              placeholder="Tempel satu tautan HTTP/HTTPS per baris"
              className="w-full rounded-lg border border-[#D3DDD8] bg-white p-3 text-xs"
            />
            <p className="text-text-secondary text-[10px]">
              Unggah dokumentasi ke penyimpanan yang digunakan tim, lalu tempel
              tautannya di sini.
            </p>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#12372A]">
              Ringkasan capaian dampak lingkungan{" "}
              <span className="text-[#B42318]">*</span>
            </label>
            <textarea
              rows={3}
              value={ringkasan}
              onChange={(e) => setRingkasan(e.target.value)}
              required
              className="w-full rounded-lg border border-[#D3DDD8] bg-white p-3 text-xs text-[#12372A] focus:ring-1 focus:ring-[#2D6A4F]"
            />
            <p className="text-text-secondary text-[10px]">
              Tampil di halaman publik program setelah disetujui
            </p>
          </div>

          <div className="flex items-start space-x-3 rounded-xl border border-[#D3DDD8]/60 bg-[#F2F4F7] p-4 text-xs">
            <Ikon
              nama="alert-info"
              ukuran={16}
              className="text-text-secondary mt-0.5"
            />
            <p className="leading-relaxed text-[#12372A]">
              Setelah dikirim, status program menjadi{" "}
              <span className="rounded bg-[#FFE58F] px-1 py-0.5 font-bold text-[#12372A]">
                Menunggu
              </span>{" "}
              Konfirmasi sampai Verifikator meninjau laporan.
            </p>
          </div>

          <div className="flex items-center justify-end space-x-3 border-t border-[#D3DDD8]/50 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-xl border border-[#D3DDD8] px-6 py-2.5 text-xs font-bold text-[#12372A] transition-colors hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={
                createMutation.isPending ||
                !!pesanSukses ||
                programsQuery.isLoading ||
                programsQuery.data?.length === 0 ||
                !!fileError
              }
              className="rounded-xl bg-[#2D6A4F] px-6 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#1B4332] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createMutation.isPending
                ? "Mengirim..."
                : "Kirim untuk Ditinjau"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
