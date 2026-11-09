'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft
} from 'lucide-react';
import { api } from '~/trpc/react'; 

export default function LaporanPage() {
  const [judul, setJudul] = useState('');
  const [ringkasan, setRingkasan] = useState('');
  const [berkas, setBerkas] = useState<File | null>(null);
  const [pesanSukses, setPesanSukses] = useState(false);

  // Hook Mutation tRPC
  const submitLaporan = api.laporan.create.useMutation({
    onSuccess: () => {
      setPesanSukses(true);
      setJudul('');
      setRingkasan('');
      setBerkas(null);
    },
    onError: (err) => {
      alert(`Gagal mengirim laporan: ${err.message}`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !ringkasan) return;

    submitLaporan.mutate({
      judul,
      deskripsi: ringkasan,
      tautanDokumen: berkas ? berkas.name : undefined,
    });
  };

  return (
    <div className="min-h-screen bg-emerald-50/40 flex justify-center py-8 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 md:p-8 flex flex-col justify-between">
        
        <div>
          {/* Header Bar */}
          <div className="flex items-center space-x-3 pb-6 border-b border-gray-100 mb-6">
            <button 
              type="button"
              onClick={() => window.history.back()}
              className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Unggah Laporan Akhir</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Kirim dokumentasi dan ringkasan capaian kegiatan program
              </p>
            </div>
          </div>

          {/* Banner Sukses */}
          {pesanSukses && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-emerald-900">Laporan Berhasil Dikirim!</h4>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Laporan Anda telah masuk dan menunggu proses peninjauan oleh verifikator.
                </p>
              </div>
            </div>
          )}

          {/* Form Laporan */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Judul Laporan / Program <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Contoh: Laporan Akhir Aksi Tanam 1000 Mangrove"
                required
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Ringkasan Capaian & Hasil <span className="text-red-500">*</span>
              </label>
              <textarea
                value={ringkasan}
                onChange={(e) => setRingkasan(e.target.value)}
                rows={4}
                placeholder="Jelaskan secara ringkas hasil kegiatan, jumlah partisipan, dan dampak yang dicapai..."
                required
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all text-gray-900 placeholder:text-gray-400 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Unggah Berkas / Dokumentasi (PDF / Gambar)
              </label>
              <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-emerald-500 hover:bg-emerald-50/20 transition-all group cursor-pointer">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setBerkas(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full group-hover:scale-110 transition-transform">
                    {berkas ? <FileText className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
                  </div>
                  {berkas ? (
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{berkas.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{(berkas.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Klik atau seret berkas laporan ke sini
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Format disarankan: PDF, JPG, atau PNG (Maks. 5 MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={submitLaporan.isPending}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {submitLaporan.isPending ? (
                  <span>Mengirim Laporan...</span>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Kirim Laporan</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <span>RekanBumi — Modul Laporan & Verifikator</span>
          <span className="flex items-center space-x-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Pastikan data valid</span>
          </span>
        </div>

      </div>
    </div>
  );
}