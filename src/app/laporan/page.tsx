'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, X, Info, Image as ImageIcon, Bell, ChevronDown } from 'lucide-react';

export default function UnggahLaporanAkhirPage() {
  const router = useRouter();

  const [bibit, setBibit] = useState('1.000');
  const [luasArea, setLuasArea] = useState('1,2');
  const [ringkasan, setRingkasan] = useState(
    '1.000 bibit mangrove tertanam di zona abrasi bersama 27 relawan.'
  );

  const [uploadedPhotos, setUploadedPhotos] = useState([
    { id: '1', name: 'Pengarahan relawan' },
    { id: '2', name: 'Penanaman bibit' },
    { id: '3', name: 'Bibit tertanam' },
    { id: '4', name: 'Foto bersama' },
  ]);

  const removePhoto = (id: string) => {
    setUploadedPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Laporan berhasil dikirim untuk ditinjau!');
    router.push('/dashboard/inisiator');
  };

  return (
    <div className="min-h-screen bg-[#EAF7EE] text-[#12372A] font-sans pb-16">
      {/* Navbar Topbar */}
      <header className="bg-white border-b border-[#D3DDD8]/60 px-10 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-extrabold text-[#2D6A4F] tracking-wider text-lg">REKAN</span>
          <div className="w-5 h-5 rounded-full bg-[#2D6A4F] text-white text-[10px] flex items-center justify-center font-bold">
            🌍
          </div>
        </div>

        <nav className="flex items-center space-x-2">
          <Link href="/dashboard/inisiator" className="px-4 py-1.5 rounded-full bg-[#D8F3DC] text-[#2D6A4F] font-bold text-xs">
            Program Saya
          </Link>
          <Link href="/program/daftar" className="px-4 py-1.5 rounded-full text-[#4F6B61] hover:text-[#2D6A4F] font-semibold text-xs">
            Daftarkan Program
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative cursor-pointer">
            <Bell className="w-5 h-5 text-[#4F6B61]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#B42318] text-white text-[9px] font-bold rounded-full flex items-center justify-center">1</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-[#B7E4C7] text-[#2D6A4F] text-xs font-bold flex items-center justify-center">YM</div>
            <span className="text-xs font-bold text-[#12372A]">Yayasan Mangrove Jakarta</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#4F6B61]" />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        <Link href="/dashboard/inisiator" className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#2D6A4F] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Program Saya</span>
        </Link>

        <h1 className="text-3xl font-extrabold text-[#12372A]">Unggah Laporan Akhir</h1>

        {/* Card Header Info Program */}
        <div className="bg-white p-5 rounded-2xl border border-[#D3DDD8]/60 flex items-center space-x-4 shadow-sm">
          <div className="w-14 h-14 rounded-xl bg-[#D8F3DC] flex items-center justify-center text-[#2D6A4F]">
            <ImageIcon className="w-7 h-7" />
          </div>
          <div>
            <span className="px-2.5 py-0.5 bg-[#D8F3DC] text-[#2D6A4F] text-[10px] font-bold rounded-full">Aktif</span>
            <h2 className="font-bold text-base text-[#12372A] mt-1">Penanaman 1.000 Mangrove PIK</h2>
            <p className="text-xs text-[#4F6B61]">Yayasan Mangrove Jakarta · Sab, 14 Nov 2026</p>
          </div>
        </div>

        {/* Form Container White */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-[#D3DDD8]/60 shadow-sm space-y-6">
          {/* Upload Area */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#12372A]">Foto dokumentasi akhir kegiatan <span className="text-[#B42318]">*</span></label>
            <div className="border-2 border-dashed border-[#2D6A4F]/40 bg-[#EAF7EE]/50 rounded-xl p-6 text-center hover:bg-[#EAF7EE] transition-colors cursor-pointer flex flex-col items-center justify-center">
              <Upload className="w-6 h-6 text-[#2D6A4F] mb-1" />
              <p className="text-xs font-medium text-[#12372A]">Seret & lepas berkas di sini, atau <span className="text-[#2D6A4F] font-bold underline">Pilih berkas</span></p>
            </div>
            <p className="text-[10px] text-[#4F6B61]">JPG atau PNG · maks. 2 MB per foto · minimal 1 foto</p>
          </div>

          {/* Photos Grid */}
          <div className="space-y-1">
            <p className="text-[11px] text-[#4F6B61]">{uploadedPhotos.length} foto dipilih</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {uploadedPhotos.map((photo) => (
                <div key={photo.id} className="relative bg-[#B7E4C7]/40 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-[#D3DDD8]/50 group h-24">
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    className="absolute top-1.5 right-1.5 w-5 h-5 bg-white text-[#B42318] rounded-full flex items-center justify-center shadow-sm hover:bg-[#FDECEA]"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <ImageIcon className="w-5 h-5 text-[#2D6A4F] mb-1" />
                  <span className="text-[10px] font-semibold text-[#12372A] leading-tight line-clamp-2">{photo.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Metrik Capaian */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-[#12372A]">Metrik capaian (opsional)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] text-[#4F6B61] mb-1">Bibit ditanam</label>
                <input
                  type="text"
                  value={bibit}
                  onChange={(e) => setBibit(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#D3DDD8] rounded-lg text-xs text-[#12372A] focus:ring-1 focus:ring-[#2D6A4F]"
                />
                <p className="text-[10px] text-[#4F6B61] mt-0.5">Jumlah bibit</p>
              </div>

              <div>
                <label className="block text-[11px] text-[#4F6B61] mb-1">Luas area (hektare)</label>
                <input
                  type="text"
                  value={luasArea}
                  onChange={(e) => setLuasArea(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#D3DDD8] rounded-lg text-xs text-[#12372A] focus:ring-1 focus:ring-[#2D6A4F]"
                />
                <p className="text-[10px] text-[#4F6B61] mt-0.5">Perkiraan area kegiatan</p>
              </div>
            </div>
          </div>

          {/* Ringkasan Capaian */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#12372A]">Ringkasan capaian dampak lingkungan <span className="text-[#B42318]">*</span></label>
            <textarea
              rows={3}
              value={ringkasan}
              onChange={(e) => setRingkasan(e.target.value)}
              className="w-full p-3 bg-white border border-[#D3DDD8] rounded-lg text-xs text-[#12372A] focus:ring-1 focus:ring-[#2D6A4F]"
            />
            <p className="text-[10px] text-[#4F6B61]">Tampil di halaman publik program setelah disetujui</p>
          </div>

          {/* Alert Info Box */}
          <div className="bg-[#F2F4F7] p-4 rounded-xl flex items-start space-x-3 border border-[#D3DDD8]/60 text-xs">
            <Info className="w-4 h-4 text-[#4F6B61] shrink-0 mt-0.5" />
            <p className="text-[#12372A] leading-relaxed">
              Setelah dikirim, status program menjadi <span className="bg-[#FFE58F] text-[#12372A] px-1 py-0.5 rounded font-bold">Menunggu</span> Konfirmasi sampai Verifikator meninjau laporan.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#D3DDD8]/50">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 border border-[#D3DDD8] text-xs font-bold text-[#12372A] rounded-xl hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
            >
              Kirim untuk Ditinjau
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}