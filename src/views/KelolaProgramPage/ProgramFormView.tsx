"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export function ProgramFormView() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    namaProgram: "",
    deskripsi: "",
    kategori: "JAGA_IKLIM" as "JAGA_ALAM" | "JAGA_IKLIM",
    tempatPelaksanaan: "",
    waktuMulai: "",
    waktuSelesai: "",
    kuota: "",
    syaratKetentuan: "",
    urlDokumenLegalitas: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const createProgramMutation = api.program.createProgram.useMutation({
    onSuccess: () => {
      alert("Program berhasil dibuat!");
      router.push("/inisiator/program");
    },
    onError: (err: { message: string }) => {
      setErrorMessage(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const waktuMulai = new Date(formData.waktuMulai);
    const waktuSelesai = new Date(formData.waktuSelesai);
    if (waktuSelesai.getTime() <= waktuMulai.getTime()) {
      setErrorMessage("Waktu selesai harus setelah waktu mulai.");
      return;
    }

    createProgramMutation.mutate({
      namaProgram: formData.namaProgram,
      deskripsi: formData.deskripsi,
      kategori: formData.kategori,
      tempatPelaksanaan: formData.tempatPelaksanaan,
      waktuMulai,
      waktuSelesai,
      kuota: Number(formData.kuota),
      syaratKetentuan: formData.syaratKetentuan,
      urlDokumenLegalitas: formData.urlDokumenLegalitas,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
          Daftarkan Program Baru
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <p role="alert" className="text-sm text-red-700">
              {errorMessage}
            </p>
          )}
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Judul Program
            </label>
            <input
              type="text"
              name="namaProgram"
              value={formData.namaProgram}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm"
              placeholder="Contoh: Penanaman Mangrove PIK"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Kategori
            </label>
            <select
              name="kategori"
              value={formData.kategori}
              onChange={(e) => {
                const kategori = e.currentTarget.value;
                if (kategori === "JAGA_ALAM" || kategori === "JAGA_IKLIM") {
                  setFormData((prev) => ({ ...prev, kategori }));
                }
              }}
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm"
            >
              <option value="JAGA_ALAM">Jaga Alam</option>
              <option value="JAGA_IKLIM">Jaga Iklim</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Lokasi Pelaksanaan
            </label>
            <input
              type="text"
              name="tempatPelaksanaan"
              value={formData.tempatPelaksanaan}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm"
              placeholder="Contoh: Jakarta Utara"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Waktu Mulai
            </label>
            <input
              type="datetime-local"
              name="waktuMulai"
              value={formData.waktuMulai}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Waktu Selesai
            </label>
            <input
              type="datetime-local"
              name="waktuSelesai"
              value={formData.waktuSelesai}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Kuota Relawan
            </label>
            <input
              type="number"
              name="kuota"
              min={1}
              value={formData.kuota}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm"
              placeholder="Contoh: 30"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Deskripsi Program
            </label>
            <textarea
              name="deskripsi"
              rows={4}
              value={formData.deskripsi}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm"
              placeholder="Jelaskan detail kegiatan..."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Syarat dan Ketentuan
            </label>
            <textarea
              name="syaratKetentuan"
              rows={3}
              value={formData.syaratKetentuan}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm"
              placeholder="Tuliskan syarat untuk relawan..."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Tautan Dokumen Legalitas
            </label>
            <input
              type="url"
              name="urlDokumenLegalitas"
              value={formData.urlDokumenLegalitas}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-2.5 text-sm"
              placeholder="https://..."
            />
            <p className="mt-1 text-xs text-gray-500">
              Unggah dokumen ke penyimpanan tim, lalu tempel tautannya.
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={createProgramMutation.isPending}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              {createProgramMutation.isPending
                ? "Menyimpan..."
                : "Simpan Program"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
