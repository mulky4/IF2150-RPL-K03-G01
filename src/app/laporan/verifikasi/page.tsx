'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Eye } from 'lucide-react';
import { api } from '~/trpc/react';

export default function LaporanMasukFigmaPage() {
  const [filterStatus, setFilterStatus] = useState<'MENUNGGU' | 'DISETUJUI' | 'DITOLAK'>('MENUNGGU');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: daftarLaporan, isLoading } = api.laporan.getAll.useQuery();

  const countMenunggu = daftarLaporan?.filter(i => i.status === 'MENUNGGU').length || 0;
  const countDisetujui = daftarLaporan?.filter(i => i.status === 'DISETUJUI').length || 0;
  const countTolak = daftarLaporan?.filter(i => i.status === 'DITOLAK').length || 0;

  const filteredData = daftarLaporan?.filter((item) => {
    const matchStatus = item.status === filterStatus;
    const matchSearch =
      item.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.pengaju?.name ?? '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#F4F6F4] text-gray-800">
      
      {/* Figma Desktop Header / Navigation Bar */}
      <header className="bg-white border-b border-gray-200 px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="font-extrabold text-emerald-800 tracking-wider text-base">REKAN</span>
        </div>
        
        <div className="flex items-center space-x-3 text-xs">
          <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-[11px]">
            YM
          </div>
          <span className="font-medium text-gray-700">Yayasan Mangrove Jakarta</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-8 py-8 space-y-6">
        
        {/* Title Section */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan Masuk</h1>
          <p className="text-xs text-gray-500 mt-1">
            Tinjau dan konfirmasi laporan kegiatan akhir dari inisiator program
          </p>
        </div>

        {/* Status Filter Tabs & Search Bar (Figma Frame 1 Style) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          
          {/* Filter Pills */}
          <div className="flex items-center space-x-2 bg-gray-200/60 p-1 rounded-full text-xs font-semibold">
            <button
              type="button"
              onClick={() => setFilterStatus('MENUNGGU')}
              className={`px-4 py-1.5 rounded-full transition-all flex items-center space-x-1.5 ${
                filterStatus === 'MENUNGGU'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Menunggu Verifikasi</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                filterStatus === 'MENUNGGU' ? 'bg-emerald-700 text-white' : 'bg-gray-300 text-gray-700'
              }`}>
                {countMenunggu}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setFilterStatus('DISETUJUI')}
              className={`px-4 py-1.5 rounded-full transition-all flex items-center space-x-1.5 ${
                filterStatus === 'DISETUJUI'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Disetujui</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                filterStatus === 'DISETUJUI' ? 'bg-emerald-700 text-white' : 'bg-gray-300 text-gray-700'
              }`}>
                {countDisetujui}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setFilterStatus('DITOLAK')}
              className={`px-4 py-1.5 rounded-full transition-all flex items-center space-x-1.5 ${
                filterStatus === 'DITOLAK'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>Tolak / Revisi</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                filterStatus === 'DITOLAK' ? 'bg-emerald-700 text-white' : 'bg-gray-300 text-gray-700'
              }`}>
                {countTolak}
              </span>
            </button>
          </div>

          {/* Search Box Figma */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama program..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>
        </div>

        {/* Table Content Figma */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-4 px-6">Nama Program</th>
                <th className="py-4 px-6">Lembaga / Inisiator</th>
                <th className="py-4 px-6">Tanggal Unggah</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">Memuat laporan masuk...</td>
                </tr>
              ) : !filteredData || filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">Tidak ada laporan yang cocok.</td>
                </tr>
              ) : (
                filteredData.map((laporan) => (
                  <tr key={laporan.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="py-4 px-6 font-bold text-gray-900">{laporan.judul}</td>
                    <td className="py-4 px-6 text-gray-600">
                      {laporan.pengaju?.name ?? 'Yayasan Mangrove Jakarta'}
                    </td>
                    <td className="py-4 px-6 text-gray-500">14 Nov 2026</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        laporan.status === 'DISETUJUI'
                          ? 'bg-emerald-100 text-emerald-800'
                          : laporan.status === 'DITOLAK'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {laporan.status === 'MENUNGGU' ? 'Menunggu Konfirmasi' : laporan.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Link
                        href={`/laporan/verifikasi/${laporan.id}`}
                        className="inline-flex items-center justify-center px-4 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-semibold text-xs transition-colors shadow-sm"
                      >
                        Tinjau
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}