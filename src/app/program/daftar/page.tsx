'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Info, Calendar, MapPin, Users, Leaf, Sun } from 'lucide-react';

export default function FormulirDaftarProgramPage() {
  const router = useRouter();

  // State Form I-08
  const [namaProgram, setNamaProgram] = useState('');
  const [kategori, setKategori] = useState<'Jaga Alam' | 'Jaga Iklim'>('Jaga Iklim');
  const [deskripsi, setDeskripsi] = useState('');
  const [tempat, setTempat] = useState('');
  const [tanggalMulai, setTanggalMulai] = useState('');
  const [tanggalSelesai, setTanggalSelesai] = useState('');
  const [kuota, setKuota] = useState<number | ''>('');
  const [syarat, setSyarat] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Program berhasil didaftarkan!');
    router.push('/dashboard/inisiator');
  };

  return (
    <div className="min-h-screen bg-[#EAF7EE] text-[#12372A]">
      
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-[#D3DDD8] px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <span className="font-extrabold text-[#2D6A4F] tracking-wider text-base">REKAN</span>
          <nav className="flex items-center space-x-4 text-xs font-semibold text-[#4F6B61]">
            <Link href="/dashboard/inisiator" className="hover:text-[#2D6A4F]">Program Saya</Link>
            <Link href="/program/daftar" className="text-[#2D6A4F] font-bold">Daftarkan Program</Link>
          </nav>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="w-8 h-8 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center font-bold text-xs">
            YM
          </div>
          <div className="text-left">
            <p className="font-bold text-[#12372A] text-xs leading-none">Yayasan Mangrove Jakarta</p>
          </div>
        </div>
      </header>

      {/* Main Container Form */}
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        
        {/* Navigation Link */}
        <Link
          href="/dashboard/inisiator"
          className="inline-flex items-center space-x-2 text-xs font-semibold text-[#4F6B61] hover:text-[#2D6A4F] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Program Saya</span>
        </Link>

        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-[#12372A]">Daftarkan Program Baru</h1>
          <p className="text-xs text-[#4F6B61] mt-1">Isi formulir di bawah ini untuk mendaftarkan program aksi sosial lingkungan baru.</p>
        </div>

        {/* Layout 2 Kolom: Form (Kiri) + Card Preview (Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Kolom Kiri: Form I-08 */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6 bg-white p-6 rounded-2xl border border-[#D3DDD8] shadow-sm">
            
            {/* Section 1: Informasi Program */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider border-b border-[#EAF7EE] pb-2">
                1. Informasi Program
              </h2>

              <div>
                <label className="block text-xs font-semibold text-[#12372A] mb-1">
                  Nama Program <span className="text-[#B42318]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={namaProgram}
                  onChange={(e) => setNamaProgram(e.target.value)}
                  placeholder="Contoh: Penanaman 1.000 Mangrove PIK"
                  className="w-full p-2.5 text-xs bg-white border border-[#D3DDD8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>

              {/* Kategori Radio Cards (100% Presisi Token Warna Figma REKAN) */}
              <div>
                <label className="block text-xs font-bold text-[#12372A] mb-2">
                  Kategori <span className="text-[#B42318]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Option 1: Jaga Alam */}
                  <div
                    onClick={() => setKategori('Jaga Alam')}
                    className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex items-start space-x-3 ${
                      kategori === 'Jaga Alam'
                        ? 'bg-[#D8F3DC] border-[#2D6A4F] ring-1 ring-[#2D6A4F]'
                        : 'bg-white border-[#D3DDD8] hover:border-[#2D6A4F]/40'
                    }`}
                  >
                    <div className="mt-0.5">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        kategori === 'Jaga Alam' ? 'border-[#2D6A4F]' : 'border-[#D3DDD8]'
                      }`}>
                        {kategori === 'Jaga Alam' && <div className="w-2 h-2 rounded-full bg-[#2D6A4F]" />}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5 font-bold text-sm text-[#12372A]">
                        <Leaf className="w-4 h-4 text-[#2D6A4F]" />
                        <span>Jaga Alam</span>
                      </div>
                      <p className="text-xs text-[#4F6B61] mt-0.5 leading-snug">
                        Kebersihan lingkungan & satwa liar
                      </p>
                    </div>
                  </div>

                  {/* Option 2: Jaga Iklim */}
                  <div
                    onClick={() => setKategori('Jaga Iklim')}
                    className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex items-start space-x-3 ${
                      kategori === 'Jaga Iklim'
                        ? 'bg-[#D8F3DC] border-[#2D6A4F] ring-1 ring-[#2D6A4F]'
                        : 'bg-white border-[#D3DDD8] hover:border-[#2D6A4F]/40'
                    }`}
                  >
                    <div className="mt-0.5">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        kategori === 'Jaga Iklim' ? 'border-[#2D6A4F]' : 'border-[#D3DDD8]'
                      }`}>
                        {kategori === 'Jaga Iklim' && <div className="w-2 h-2 rounded-full bg-[#2D6A4F]" />}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5 font-bold text-sm text-[#12372A]">
                        <Sun className="w-4 h-4 text-[#2D6A4F]" />
                        <span>Jaga Iklim</span>
                      </div>
                      <p className="text-xs text-[#4F6B61] mt-0.5 leading-snug">
                        Penanaman pohon & mangrove
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#12372A] mb-1">
                  Deskripsi Program <span className="text-[#B42318]">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Jelaskan secara rinci latar belakang, tujuan, dan aktivitas program..."
                  className="w-full p-3 text-xs bg-white border border-[#D3DDD8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>
            </div>

            {/* Section 2: Jadwal & Lokasi */}
            <div className="space-y-4 pt-2">
              <h2 className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider border-b border-[#EAF7EE] pb-2">
                2. Jadwal & Lokasi
              </h2>

              <div>
                <label className="block text-xs font-semibold text-[#12372A] mb-1">
                  Lokasi Pelaksanaan <span className="text-[#B42318]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={tempat}
                  onChange={(e) => setTempat(e.target.value)}
                  placeholder="Contoh: Pantai Indah Kapuk, Jakarta Utara"
                  className="w-full p-2.5 text-xs bg-white border border-[#D3DDD8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#12372A] mb-1">
                    Tanggal Mulai <span className="text-[#B42318]">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={tanggalMulai}
                    onChange={(e) => setTanggalMulai(e.target.value)}
                    className="w-full p-2.5 text-xs bg-white border border-[#D3DDD8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#12372A] mb-1">
                    Tanggal Selesai <span className="text-[#B42318]">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={tanggalSelesai}
                    onChange={(e) => setTanggalSelesai(e.target.value)}
                    className="w-full p-2.5 text-xs bg-white border border-[#D3DDD8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#12372A] mb-1">
                  Target Kuota Relawan <span className="text-[#B42318]">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={kuota}
                  onChange={(e) => setKuota(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="30"
                  className="w-full p-2.5 text-xs bg-white border border-[#D3DDD8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>
            </div>

            {/* Section 3: Syarat & Dokumen */}
            <div className="space-y-4 pt-2">
              <h2 className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider border-b border-[#EAF7EE] pb-2">
                3. Syarat & Dokumen Pendukung
              </h2>

              <div>
                <label className="block text-xs font-semibold text-[#12372A] mb-1">Kualifikasi / Syarat Relawan</label>
                <textarea
                  rows={3}
                  value={syarat}
                  onChange={(e) => setSyarat(e.target.value)}
                  placeholder="Misal: Sehat jasmani, membawa sepatu boots sendiri, usia min 17 tahun."
                  className="w-full p-3 text-xs bg-white border border-[#D3DDD8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#12372A] mb-1">Unggah Proposal / Poster Program</label>
                <div className="border-2 border-dashed border-[#D3DDD8] rounded-xl p-5 text-center bg-[#EAF7EE]/50 hover:border-[#2D6A4F] transition-colors cursor-pointer flex flex-col items-center justify-center">
                  <Upload className="w-6 h-6 text-[#2D6A4F] mb-1" />
                  <p className="text-xs text-[#4F6B61] font-medium">Klik untuk memilih berkas (PDF / PNG / JPG)</p>
                  <p className="text-[10px] text-[#4F6B61]/70 mt-0.5">Maksimal ukuran file 5MB</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#D3DDD8]/50">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-5 py-2 text-xs font-semibold text-[#4F6B61] bg-[#F2F4F7] hover:bg-gray-200 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-xs font-semibold text-white bg-[#2D6A4F] hover:bg-[#1B4332] rounded-lg transition-colors shadow-sm"
              >
                Kirim Pendaftaran Program
              </button>
            </div>
          </form>

          {/* Kolom Kanan: Live Card Preview */}
          <div className="space-y-4 sticky top-6">
            <h3 className="text-xs font-bold text-[#4F6B61] uppercase tracking-wider">Petunjuk & Preview</h3>
            <div className="bg-white border border-[#D3DDD8] rounded-2xl p-5 shadow-sm space-y-3">
              <span className="text-[10px] font-bold text-[#2D6A4F] uppercase bg-[#D8F3DC] px-2.5 py-1 rounded-full border border-[#2D6A4F]/20 inline-block">
                {kategori}
              </span>
              <h4 className="font-bold text-base text-[#12372A] leading-snug">
                {namaProgram || 'Nama Program Baru'}
              </h4>
              <div className="space-y-1.5 text-xs text-[#4F6B61]">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-[#4F6B61]/70" />
                  <span className="truncate">{tempat || 'Lokasi belum diisi'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5 shrink-0 text-[#4F6B61]/70" />
                  <span>{tanggalMulai ? `${tanggalMulai} s/d ${tanggalSelesai || '...'}` : 'Tanggal belum dipilih'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-3.5 h-3.5 shrink-0 text-[#4F6B61]/70" />
                  <span>Target: {kuota || 0} Relawan</span>
                </div>
              </div>
              <div className="pt-3 border-t border-[#D3DDD8]/50">
                <span className="text-[11px] text-[#8A5A00] bg-[#FFF4DB] border border-[#8A5A00]/20 px-2.5 py-1 rounded-full font-semibold inline-flex items-center">
                  <Info className="w-3 h-3 mr-1" /> Draft Pendaftaran
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}