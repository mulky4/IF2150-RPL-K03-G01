'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, ChevronDown, Plus } from 'lucide-react';

interface ProgramRow {
  id: string;
  namaProgram: string;
  kategori: 'Jaga Alam' | 'Jaga Iklim';
  jadwal: string;
  diterima: number;
  kuota: number;
  status: 'Aktif' | 'Menunggu Verifikasi' | 'Menunggu Konfirmasi' | 'Perlu Revisi' | 'Selesai';
  aksiText?: string;
  aksiLink?: string;
}

export default function ProgramSayaPage() {
  const [activeTab, setActiveTab] = useState<string>('Semua');

  const programs: ProgramRow[] = [
    {
      id: '1',
      namaProgram: 'Penanaman 1.000 Mangrove PIK',
      kategori: 'Jaga Iklim',
      jadwal: 'Sab, 14 Nov 2026',
      diterima: 18,
      kuota: 30,
      status: 'Aktif',
      aksiText: 'Unggah Laporan',
      aksiLink: '/laporan',
    },
    {
      id: '2',
      namaProgram: 'Reboisasi Hutan Kota Srengseng',
      kategori: 'Jaga Iklim',
      jadwal: 'Sab, 5 Des 2026',
      diterima: 0,
      kuota: 40,
      status: 'Menunggu Verifikasi',
    },
    {
      id: '3',
      namaProgram: 'Tanam Mangrove Muara Angke',
      kategori: 'Jaga Iklim',
      jadwal: 'Sab, 31 Okt 2026',
      diterima: 25,
      kuota: 25,
      status: 'Menunggu Konfirmasi',
      aksiText: 'Laporan Dikirim',
    },
    {
      id: '4',
      namaProgram: 'Bersih Kali Ciliwung',
      kategori: 'Jaga Alam',
      jadwal: 'Sab, 17 Okt 2026',
      diterima: 20,
      kuota: 20,
      status: 'Perlu Revisi',
      aksiText: 'Unggah Ulang',
      aksiLink: '/laporan',
    },
    {
      id: '5',
      namaProgram: 'Tanam Pohon Pesisir Marunda',
      kategori: 'Jaga Iklim',
      jadwal: 'Sab, 3 Okt 2026',
      diterima: 30,
      kuota: 30,
      status: 'Selesai',
    },
  ];

  const filteredPrograms = programs.filter((p) => {
    if (activeTab === 'Semua') return true;
    return p.status.toLowerCase().includes(activeTab.toLowerCase());
  });

  const renderStatusBadge = (status: ProgramRow['status']) => {
    switch (status) {
      case 'Aktif':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#D8F3DC] text-[#2D6A4F]">
            Aktif
          </span>
        );
      case 'Menunggu Verifikasi':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF4DB] text-[#12372A]">
            <span className="bg-[#FFE58F] px-1 py-0.5 rounded mr-1 font-bold">Menunggu</span> Verifikasi
          </span>
        );
      case 'Menunggu Konfirmasi':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF4DB] text-[#12372A]">
            <span className="bg-[#FFE58F] px-1 py-0.5 rounded mr-1 font-bold">Menunggu</span> Konfirmasi
          </span>
        );
      case 'Perlu Revisi':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FDECEA] text-[#B42318]">
            Perlu Revisi
          </span>
        );
      case 'Selesai':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#D8F3DC] text-[#2D6A4F]">
            Selesai
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#EAF7EE] text-[#12372A] font-sans">
      
      {/* Navbar Topbar Presisi Figma */}
      <header className="bg-white border-b border-[#D3DDD8]/60 px-10 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-extrabold text-[#2D6A4F] tracking-wider text-lg">REKAN</span>
          <div className="w-5 h-5 rounded-full bg-[#2D6A4F] text-white text-[10px] flex items-center justify-center font-bold">
            🌍
          </div>
        </div>

        {/* Center Pill Nav */}
        <nav className="flex items-center space-x-2">
          <Link
            href="/dashboard/inisiator"
            className="px-4 py-1.5 rounded-full bg-[#D8F3DC] text-[#2D6A4F] font-bold text-xs"
          >
            Program Saya
          </Link>
          <Link
            href="/program/daftar"
            className="px-4 py-1.5 rounded-full text-[#4F6B61] hover:text-[#2D6A4F] font-semibold text-xs transition-colors"
          >
            Daftarkan Program
          </Link>
        </nav>

        {/* Right User Bar */}
        <div className="flex items-center space-x-4">
          <div className="relative cursor-pointer">
            <Bell className="w-5 h-5 text-[#4F6B61]" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#B42318] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              1
            </span>
          </div>

          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-7 h-7 rounded-full bg-[#B7E4C7] text-[#2D6A4F] text-xs font-bold flex items-center justify-center">
              YM
            </div>
            <span className="text-xs font-bold text-[#12372A]">Yayasan Mangrove Jakarta</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#4F6B61]" />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-8 py-8 space-y-6">
        
        {/* Title & Top Action Button */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-extrabold text-[#12372A]">Program Saya</h1>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-[#4F6B61] font-medium">Yayasan Mangrove Jakarta</span>
              <span className="bg-[#D8F3DC] text-[#2D6A4F] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                Terverifikasi
              </span>
            </div>
          </div>

          <Link
            href="/program/daftar"
            className="px-5 py-2.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold rounded-xl transition-colors flex items-center space-x-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Daftarkan Program Baru</span>
          </Link>
        </div>

        {/* 3 Top Stat Cards Presisi Figma */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-[#D3DDD8]/60 shadow-sm space-y-1">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-[#12372A]">2</span>
              <span className="text-xs font-bold text-[#12372A]">program aktif</span>
            </div>
            <p className="text-xs text-[#4F6B61]">Sedang membuka pendaftaran</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D3DDD8]/60 shadow-sm space-y-1">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-[#12372A]">14</span>
              <span className="text-xs font-bold text-[#12372A]">pendaftar</span>
            </div>
            <p className="text-xs text-[#4F6B61]">
              <span className="bg-[#FFE58F] px-1 py-0.5 rounded font-bold text-[#12372A]">Menunggu</span> seleksi Anda
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#D3DDD8]/60 shadow-sm space-y-1">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-[#12372A]">1</span>
              <span className="text-xs font-bold text-[#12372A]">laporan</span>
            </div>
            <p className="text-xs text-[#4F6B61]">Perlu revisi dari Verifikator</p>
          </div>
        </div>

        {/* Filter Tabs Button Pills */}
        <div className="flex items-center space-x-2 pt-2">
          {['Semua', 'Aktif', 'Menunggu Konfirmasi', 'Perlu Revisi', 'Selesai'].map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                  isSelected
                    ? 'bg-[#2D6A4F] text-white'
                    : 'bg-white text-[#4F6B61] hover:bg-[#D8F3DC]/50 border border-[#D3DDD8]/40'
                }`}
              >
                {tab === 'Menunggu Konfirmasi' ? (
                  <span>
                    <span className={isSelected ? 'bg-white/20 px-1 py-0.5 rounded' : 'bg-[#FFE58F] text-[#12372A] px-1 py-0.5 rounded font-bold'}>
                      Menunggu
                    </span> Konfirmasi
                  </span>
                ) : (
                  tab
                )}
              </button>
            );
          })}
        </div>

        {/* Table Container Presisi 1:1 Figma */}
        <div className="bg-white rounded-2xl border border-[#D3DDD8]/60 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#D8F3DC] text-[11px] font-bold text-[#12372A] tracking-wider uppercase border-b border-[#D3DDD8]/60">
                <th className="py-3.5 px-5">NAMA PROGRAM</th>
                <th className="py-3.5 px-4">KATEGORI</th>
                <th className="py-3.5 px-4">JADWAL</th>
                <th className="py-3.5 px-4">DITERIMA / KUOTA</th>
                <th className="py-3.5 px-4">STATUS</th>
                <th className="py-3.5 px-5">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D3DDD8]/40 text-xs">
              {filteredPrograms.map((row) => {
                const percentage = Math.min(100, Math.round((row.diterima / row.kuota) * 100));
                return (
                  <tr key={row.id} className="hover:bg-[#EAF7EE]/30 transition-colors">
                    
                    {/* Nama Program */}
                    <td className="py-4 px-5 font-bold text-[#12372A]">
                      {row.namaProgram}
                    </td>

                    {/* Kategori Pill */}
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#D8F3DC] text-[#2D6A4F]">
                        {row.kategori}
                      </span>
                    </td>

                    {/* Jadwal */}
                    <td className="py-4 px-4 text-[#4F6B61] font-medium">
                      {row.jadwal}
                    </td>

                    {/* Diterima / Kuota + Progress Bar */}
                    <td className="py-4 px-4">
                      <div className="space-y-1 w-32">
                        <span className="font-bold text-[#12372A]">
                          {row.diterima} / {row.kuota}
                        </span>
                        <div className="w-full bg-[#D8F3DC] h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#2D6A4F] h-full rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      {renderStatusBadge(row.status)}
                    </td>

                    {/* Aksi Links */}
                    <td className="py-4 px-5">
                      <div className="flex items-center space-x-3 font-semibold">
                        <Link
                          href={`/program/${row.id}/kelola`}
                          className="text-[#4F6B61] hover:text-[#2D6A4F] transition-colors"
                        >
                          Kelola Pendaftar
                        </Link>
                        
                        {row.aksiText && (
                          row.aksiLink ? (
                            <Link
                              href={row.aksiLink}
                              className="text-[#2D6A4F] font-bold hover:underline transition-all"
                            >
                              {row.aksiText}
                            </Link>
                          ) : (
                            <span className="text-[#4F6B61] font-normal">
                              {row.aksiText}
                            </span>
                          )
                        )}
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Counter */}
        <p className="text-xs text-[#4F6B61] font-medium pt-1">
          Menampilkan {filteredPrograms.length} dari {programs.length} program
        </p>

      </main>
    </div>
  );
}