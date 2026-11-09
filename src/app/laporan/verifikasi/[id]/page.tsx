'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, XCircle, FileText, Image as ImageIcon } from 'lucide-react';
import { api } from '~/trpc/react';

export default function DetailTinjauLaporanPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [catatanRevisi, setCatatanRevisi] = useState('');
  const [showModalTolak, setShowModalTolak] = useState(false);

  const { data: daftarLaporan } = api.laporan.getAll.useQuery();
  const laporan = daftarLaporan?.find((item) => item.id === id);

  const updateStatus = api.laporan.updateStatus.useMutation({
    onSuccess: () => {
      router.push('/laporan/verifikasi');
    },
    onError: (err) => {
      alert(`Gagal memperbarui status: ${err.message}`);
    }
  });

  const handleSetujui = () => {
    if (confirm('Apakah Anda yakin ingin menyetujui laporan ini? Status program akan menjadi SELESAI.')) {
      updateStatus.mutate({ id, status: 'DISETUJUI' });
    }
  };

  const handleTolak = () => {
    if (!catatanRevisi.trim()) {
      alert('Mohon isi catatan revisi untuk inisiator!');
      return;
    }
    updateStatus.mutate({ id, status: 'DITOLAK' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] py-8 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Back Link */}
        <Link href="/laporan/verifikasi" className="inline-flex items-center space-x-2 text-xs font-semibold text-gray-600 hover:text-emerald-700">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Laporan Masuk</span>
        </Link>

        {/* Header Title */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-gray-900">{laporan?.judul ?? 'Penanaman 1.000 Mangrove PIK'}</h1>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
                Menunggu Konfirmasi
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Pengaju: {laporan?.pengaju?.name ?? 'Yayasan Mangrove Jakarta'} • Sabtu, 14 Nov 2026</p>
          </div>
        </div>

        {/* Grid 2 Column Desktop Layout (Figma I-10 Frame 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column (2 Cols): Dokumentasi Foto & Ringkasan Capaian */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Foto Dokumentasi Activities (Grid 4 Frame) */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Dokumentasi Kegiatan Akhir</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((idx) => (
                  <div key={idx} className="aspect-square bg-emerald-50 border border-emerald-100 rounded-lg flex flex-col items-center justify-center text-emerald-600 p-2">
                    <ImageIcon className="w-6 h-6 mb-1 opacity-60" />
                    <span className="text-[10px] font-medium text-emerald-700">Foto {idx}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrik Capaian Impacts */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Metrik Capaian & Ringkasan Dampak</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <span className="text-xs text-gray-500">Bibit Ditanam</span>
                  <p className="text-xl font-bold text-gray-900 mt-0.5">1.000 <span className="text-xs font-normal text-gray-500">bibit</span></p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <span className="text-xs text-gray-500">Luas Area Hektar</span>
                  <p className="text-xl font-bold text-gray-900 mt-0.5">1,2 <span className="text-xs font-normal text-gray-500">ha</span></p>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-700">Deskripsi Capaian Dampak Lingkungan:</span>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                  {laporan?.deskripsi ?? '1.000 bibit mangrove telah tertanam sempurna di zona abrasi bersama 27 relawan. Tingkat hidup dipantau bulanan.'}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column (1 Col Sidebar): Action Box Verifikator */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-5 sticky top-6">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Data Program</h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Status Program:</span>
                  <span className="font-semibold text-emerald-700">AKTIF</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Total Relawan Hadir:</span>
                  <span className="font-semibold text-gray-900">27 Relawan</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={handleSetujui}
                  disabled={updateStatus.isPending}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center space-x-2 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Setujui Laporan</span>
                </button>

                <button
                  onClick={() => setShowModalTolak(true)}
                  disabled={updateStatus.isPending}
                  className="w-full py-2.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Tolak / Minta Revisi</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Modal Tolak / Minta Revisi */}
      {showModalTolak && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 border border-gray-100">
            <h3 className="text-base font-bold text-gray-900">Penolakan Laporan & Catatan Revisi</h3>
            <p className="text-xs text-gray-500">
              Menolak laporan akan mengubah status program menjadi <strong className="text-rose-600">PERLU_REVISI</strong> agar inisiator dapat mengunggah ulang.
            </p>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Catatan Revisi *</label>
              <textarea
                rows={4}
                value={catatanRevisi}
                onChange={(e) => setCatatanRevisi(e.target.value)}
                placeholder="Contoh: Foto penanaman kurang jelas dan jumlah bibit belum sesuai..."
                className="w-full p-3 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModalTolak(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleTolak}
                disabled={updateStatus.isPending}
                className="px-4 py-2 bg-rose-600 text-white rounded-lg text-xs font-semibold"
              >
                Kirim Revisi
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}