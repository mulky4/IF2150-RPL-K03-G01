'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, X, Info, Image as ImageIcon } from 'lucide-react';
import { api } from '~/trpc/react';

export default function UnggahLaporanPage() {
  const router = useRouter();

  // State Form I-09
  const [bibitDitanam, setBibitDitanam] = useState<number | ''>(1000);
  const [luasArea, setLuasArea] = useState<number | ''>(1.2);
  const [deskripsiDampak, setDeskripsiDampak] = useState(
    '1000 bibit mangrove tertanam di zona abrasi bersama 27 relawan.'
  );
  
  // Dummy Upload Foto Preview State
  const [fotoList, setFotoList] = useState<string[]>([
    'Foto-kegiatan-1.jpg',
    'Foto-kegiatan-2.jpg',
    'Foto-kegiatan-3.jpg',
    'Foto-kegiatan-4.jpg',
  ]);

  // TRPC Mutation untuk membuat/mengunggah laporan
  const submitLaporan = api.laporan.create.useMutation({
    onSuccess: () => {
      alert('Laporan berhasil dikirim! Status program berubah menjadi Menunggu Konfirmasi.');
      router.push('/laporan/verifikasi');
    },
    onError: (err) => {
      alert(`Gagal mengirim laporan: ${err.message}`);
    },
  });

  const handleHapusFoto = (index: number) => {
    setFotoList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (fotoList.length === 0) {
      alert('Wajib mengunggah minimal 1 foto dokumentasi kegiatan!');
      return;
    }

    if (!deskripsiDampak.trim()) {
      alert('Ringkasan capaian dampak lingkungan wajib diisi!');
      return;
    }

    // Submit payload
    submitLaporan.mutate({
      judul: 'Penanaman 1.000 Mangrove PIK',
      deskripsi: deskripsiDampak,
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-gray-800">
      
      {/* Figma Top Navigation Bar (REKAN) */}
      <header className="bg-white border-b border-gray-200 px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <span className="font-extrabold text-emerald-800 tracking-wider text-base">REKAN</span>
          <nav className="flex items-center space-x-4 text-xs font-semibold text-gray-600">
            <Link href="#" className="hover:text-emerald-800">Program Saya</Link>
            <Link href="#" className="hover:text-emerald-800">Daftarkan Program</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
            YM
          </div>
          <div className="text-left">
            <p className="font-bold text-gray-800 text-xs leading-none">Yayasan Mangrove Jakarta</p>
          </div>
        </div>
      </header>

      {/* Main Container Form */}
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        
        {/* I09-LNK-Kembali */}
        <Link
          href="#"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-gray-600 hover:text-emerald-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Program Saya</span>
        </Link>

        {/* Form Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Unggah Laporan Akhir</h1>
        </div>

        {/* Card Info Program (I09-CRO-Ringkasan) */}
        <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4 flex items-center space-x-4">
          <div className="w-12 h-12 bg-emerald-700 text-white rounded-lg flex items-center justify-center shrink-0">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-900">Penanaman 1.000 Mangrove PIK</h3>
            <p className="text-xs text-gray-500 mt-0.5">Yayasan Mangrove Jakarta • Sabtu, 14 Nov 2026</p>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          
          {/* I09-UPL-Dokumentasi: Dropzone Foto */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Foto dokumentasi akhir kegiatan <span className="text-rose-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-emerald-600 transition-colors bg-gray-50/50 cursor-pointer flex flex-col items-center justify-center">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs text-gray-600 font-medium">
                <span className="text-emerald-700 font-semibold">Seret & lepas berkas di sini</span>, atau <span className="underline">Pilih berkas</span>
              </p>
              <p className="text-[11px] text-gray-400 mt-1">JPG atau PNG • maks 2MB per foto • minimal 1 foto</p>
            </div>

            {/* I09-TBL-Preview: Grid Thumbnail Foto */}
            {fotoList.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {fotoList.map((foto, index) => (
                  <div
                    key={index}
                    className="relative bg-emerald-50 border border-emerald-100 rounded-lg p-3 flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <ImageIcon className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="text-[11px] font-medium text-emerald-900 truncate">{foto}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleHapusFoto(index)}
                      className="text-gray-400 hover:text-rose-600 p-1 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* I09-TXT-Metrik: Metrik Capaian (Optional) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Metrik Capaian (Opsional)</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Bibit ditanam</label>
                <input
                  type="number"
                  value={bibitDitanam}
                  onChange={(e) => setBibitDitanam(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="1000"
                  className="w-full p-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Luas area (hektar)</label>
                <input
                  type="number"
                  step="0.1"
                  value={luasArea}
                  onChange={(e) => setLuasArea(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="1.2"
                  className="w-full p-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>
          </div>

          {/* I09-TXA-Ringkasan: Deskripsi Capaian Dampak */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Ringkasan capaian dampak lingkungan <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              value={deskripsiDampak}
              onChange={(e) => setDeskripsiDampak(e.target.value)}
              placeholder="Ceritakan ringkasan hasil kegiatan dan dampak lingkungan yang dicapai..."
              className="w-full p-3 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          {/* I09-LBL-Info: Info Banner Status */}
          <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-lg flex items-start space-x-3 text-emerald-800">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-emerald-700" />
            <p className="text-xs leading-relaxed">
              Setelah dikirim, status program menjadi <strong className="font-bold">Menunggu Konfirmasi</strong> sampai Verifikator meninjau laporan.
            </p>
          </div>

          {/* Action Buttons: I09-BTN-Kirim & I09-BTN-Batal */}
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitLaporan.isPending}
              className="px-5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors shadow-sm flex items-center space-x-2"
            >
              {submitLaporan.isPending ? 'Mengirim...' : 'Kirim untuk Ditinjau'}
            </button>
          </div>

        </form>

      </main>
    </div>
  );
}