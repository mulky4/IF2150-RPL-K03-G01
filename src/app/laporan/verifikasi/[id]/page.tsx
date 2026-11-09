'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, ChevronDown, Image as ImageIcon, Calendar, Clock, FileText } from 'lucide-react';

export default function DetailVerifikasiLaporanPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#EAF7EE] text-[#12372A] font-sans pb-16">
      {/* Top Bar Verifikator */}
      <header className="bg-white border-b border-[#D3DDD8]/60 px-10 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-extrabold text-[#2D6A4F] tracking-wider text-lg">REKAN</span>
          <div className="w-5 h-5 rounded-full bg-[#2D6A4F] text-white text-[10px] flex items-center justify-center font-bold">🌍</div>
        </div>

        <nav>
          <span className="px-4 py-1.5 rounded-full bg-[#D8F3DC] text-[#2D6A4F] font-bold text-xs">
            Laporan Masuk
          </span>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative cursor-pointer">
            <Bell className="w-5 h-5 text-[#4F6B61]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#B42318] text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-[#B7E4C7] text-[#2D6A4F] text-xs font-bold flex items-center justify-center">VR</div>
            <span className="text-xs font-bold text-[#12372A]">Verifikator</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#4F6B61]" />
          </div>
        </div>
      </header>

      {/* Detail Content */}
      <main className="max-w-6xl mx-auto px-8 py-8 space-y-6">
        <Link
          href="/laporan/verifikasi"
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#2D6A4F] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Laporan Masuk</span>
        </Link>

        {/* Title Block */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-[#D8F3DC] text-[#2D6A4F]">Jaga Iklim</span>
            <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-[#FFF4DB] text-[#856404]">
              Menunggu Konfirmasi
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#12372A]">Penanaman 1.000 Mangrove PIK</h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#4F6B61]">
            <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> Yayasan Mangrove Jakarta</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Sab, 14 Nov 2026 · 07.00–12.00 WIB</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Diajukan 15 Nov 2026, 13.12 WIB</span>
          </div>
        </div>

        {/* 2 Kolom Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Kolom Kiri: Dokumentasi & Ringkasan */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Dokumentasi Grid */}
            <div className="bg-white p-6 rounded-2xl border border-[#D3DDD8]/60 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-[#12372A]">Dokumentasi Kegiatan (6 foto)</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  'Pengarahan relawan',
                  'Pembagian bibit',
                  'Penanaman bibit',
                  'Relawan di lumpur',
                  'Bibit tertanam',
                  'Foto bersama',
                ].map((label, idx) => (
                  <div key={idx} className="bg-[#B7E4C7]/40 rounded-xl p-6 h-28 flex flex-col items-center justify-center text-center border border-[#D3DDD8]/50">
                    <ImageIcon className="w-6 h-6 text-[#2D6A4F] mb-1" />
                    <span className="text-[11px] text-[#12372A] font-medium leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ringkasan Capaian */}
            <div className="bg-white p-6 rounded-2xl border border-[#D3DDD8]/60 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-[#12372A]">Ringkasan Capaian</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-[#D3DDD8]/60 rounded-xl p-4">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-extrabold text-[#12372A]">1.000</span>
                    <span className="text-xs text-[#4F6B61]">bibit</span>
                  </div>
                  <p className="text-[11px] text-[#4F6B61]">mangrove ditanam</p>
                </div>

                <div className="border border-[#D3DDD8]/60 rounded-xl p-4">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-extrabold text-[#12372A]">1,2</span>
                    <span className="text-xs text-[#4F6B61]">hektare</span>
                  </div>
                  <p className="text-[11px] text-[#4F6B61]">area penanaman</p>
                </div>
              </div>

              <p className="text-xs text-[#12372A] leading-relaxed pt-2">
                1.000 bibit mangrove tertanam di zona abrasi seluas ±1,2 hektare bersama 16 relawan yang hadir. Tim lapangan memantau tingkat hidup bibit setiap bulan.
              </p>
            </div>

          </div>

          {/* Kolom Kanan Sidebar: Data Program */}
          <div className="space-y-4 sticky top-6">
            <div className="bg-white p-6 rounded-2xl border border-[#D3DDD8]/60 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-[#12372A]">Data program</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#4F6B61]">
                  <span>Relawan diterima</span>
                  <span className="font-bold text-[#12372A]">18</span>
                </div>
                <div className="flex justify-between text-[#4F6B61]">
                  <span>Hadir (check-in)</span>
                  <span className="font-bold text-[#12372A]">16</span>
                </div>
                <div className="flex justify-between text-[#4F6B61]">
                  <span>Durasi kegiatan</span>
                  <span className="font-bold text-[#12372A]">5 jam</span>
                </div>
              </div>

              <div className="bg-[#F2F4F7] p-3.5 rounded-xl text-xs text-[#4F6B61] leading-relaxed">
                Menyetujui laporan menandai program Selesai dan menambahkan 5 jam aksi ke 16 relawan yang hadir.
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    alert('Laporan disetujui!');
                    router.push('/laporan/verifikasi');
                  }}
                  className="w-full py-2.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                >
                  Setujui Laporan
                </button>

                <button
                  onClick={() => {
                    alert('Permintaan revisi dikirim ke Inisiator!');
                    router.push('/laporan/verifikasi');
                  }}
                  className="w-full py-2.5 border border-[#B42318] text-[#B42318] font-bold text-xs rounded-xl hover:bg-[#FDECEA] transition-colors"
                >
                  Tolak & Minta Revisi
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}