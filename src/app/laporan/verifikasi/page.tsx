'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, ChevronDown, Search } from 'lucide-react';

export default function LaporanMasukPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('Menunggu Tinjauan');

  const laporanList = [
    {
      id: '1',
      program: 'Penanaman 1.000 Mangrove PIK',
      lembaga: 'Yayasan Mangrove Jakarta',
      kategori: 'Jaga Iklim',
      tanggal: '15 Nov 2026, 13.12 WIB',
      status: 'Menunggu Konfirmasi',
    },
    {
      id: '2',
      program: 'Tanam Mangrove Muara Angke',
      lembaga: 'Yayasan Mangrove Jakarta',
      kategori: 'Jaga Iklim',
      tanggal: '1 Nov 2026, 15.40 WIB',
      status: 'Menunggu Konfirmasi',
    },
    {
      id: '3',
      program: 'Bersih Pantai Kuta',
      lembaga: 'Komunitas Bali Bersih',
      kategori: 'Jaga Alam',
      tanggal: '22 Nov 2026, 09.05 WIB',
      status: 'Menunggu Konfirmasi',
    },
  ];

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

      {/* Main Table Content */}
      <main className="max-w-6xl mx-auto px-8 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#12372A]">Laporan Masuk</h1>
          <p className="text-xs text-[#4F6B61] mt-1">Tinjau laporan akhir sebelum program ditandai selesai dan jam aksi relawan diperbarui.</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('Menunggu Tinjauan')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                activeTab === 'Menunggu Tinjauan' ? 'bg-[#2D6A4F] text-white' : 'bg-white text-[#4F6B61]'
              }`}
            >
              Menunggu Tinjauan (3)
            </button>
            <button
              onClick={() => setActiveTab('Disetujui')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                activeTab === 'Disetujui' ? 'bg-[#2D6A4F] text-white' : 'bg-white text-[#4F6B61]'
              }`}
            >
              Disetujui
            </button>
            <button
              onClick={() => setActiveTab('Ditolak')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                activeTab === 'Ditolak' ? 'bg-[#2D6A4F] text-white' : 'bg-white text-[#4F6B61]'
              }`}
            >
              Ditolak
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#4F6B61]" />
            <input
              type="text"
              placeholder="Cari program atau lembaga..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#D3DDD8] rounded-full text-xs text-[#12372A]"
            />
          </div>
        </div>

        {/* Tabel Laporan Masuk */}
        <div className="bg-white rounded-2xl border border-[#D3DDD8]/60 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#D8F3DC] text-[11px] font-bold text-[#12372A] uppercase border-b border-[#D3DDD8]/60">
                <th className="py-3.5 px-5">PROGRAM</th>
                <th className="py-3.5 px-4">LEMBAGA</th>
                <th className="py-3.5 px-4">KATEGORI</th>
                <th className="py-3.5 px-4">TANGGAL PENGAJUAN</th>
                <th className="py-3.5 px-4">STATUS</th>
                <th className="py-3.5 px-5">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D3DDD8]/40">
              {laporanList.map((row) => (
                <tr key={row.id} className="hover:bg-[#EAF7EE]/30">
                  <td className="py-4 px-5 font-bold text-[#12372A]">{row.program}</td>
                  <td className="py-4 px-4 text-[#4F6B61]">{row.lembaga}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#D8F3DC] text-[#2D6A4F]">
                      {row.kategori}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[#4F6B61]">{row.tanggal}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF4DB] text-[#856404]">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <button
                      onClick={() => router.push(`/laporan/verifikasi/${row.id}`)}
                      className="px-4 py-1.5 border border-[#2D6A4F] text-[#2D6A4F] font-bold rounded-lg hover:bg-[#D8F3DC] transition-colors"
                    >
                      Tinjau
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}