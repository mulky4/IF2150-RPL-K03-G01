"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export default function LaporanPage() {
  const utils = api.useUtils();
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tautanDokumen, setTautanDokumen] = useState("");

  const { data: listLaporan, isLoading } = api.laporan.getAll.useQuery();
  
  const createLaporan = api.laporan.create.useMutation({
    onSuccess: (data) => {
      console.log("Laporan berhasil dibuat:", data);
      setJudul("");
      setDeskripsi("");
      setTautanDokumen("");
      void utils.laporan.getAll.invalidate();
    },
    onError: (error) => {
      console.error("Gagal membuat laporan:", error);
    },
  });

  const updateStatus = api.laporan.updateStatus.useMutation({
    onSuccess: () => {
      void utils.laporan.getAll.invalidate();
    },
    onError: (error) => {
      console.error("Gagal memperbarui status:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createLaporan.mutate({ judul, deskripsi, tautanDokumen });
  };

  if (isLoading) return <div className="p-6">Memuat data laporan...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Modul Laporan & Verifikasi</h1>

      {/* Form Buat Laporan */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-lg font-semibold">Buat Laporan Baru</h2>
        <div>
          <label className="block text-sm font-medium">Judul</label>
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className="w-full border rounded p-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Deskripsi</label>
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="w-full border rounded p-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Tautan Dokumen (Opsional)</label>
          <input
            type="text"
            value={tautanDokumen}
            onChange={(e) => setTautanDokumen(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          />
        </div>
        <button
          type="submit"
          disabled={createLaporan.isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {createLaporan.isPending ? "Mengirim..." : "Kirim Laporan"}
        </button>
      </form>

      {/* Daftar Laporan & Verifikasi */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-lg font-semibold">Daftar Laporan</h2>
        <div className="space-y-4">
          {listLaporan?.length === 0 && (
            <p className="text-gray-500 text-center py-4">Belum ada laporan tersedia.</p>
          )}
          {listLaporan?.map((item) => (
            <div key={item.id} className="border p-4 rounded flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{item.judul}</h3>
                <p className="text-gray-600">{item.deskripsi}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Status: <span className="font-semibold">{item.status}</span>
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => updateStatus.mutate({ id: item.id, status: "DISETUJUI" })}
                  className="bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700"
                >
                  Setujui
                </button>
                <button
                  onClick={() => updateStatus.mutate({ id: item.id, status: "DITOLAK" })}
                  className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700"
                >
                  Tolak
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}