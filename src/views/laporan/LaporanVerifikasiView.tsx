"use client";

import Link from "next/link";
import { api } from "~/trpc/react";

export function LaporanVerifikasiView() {
  const laporanQuery = api.laporan.ambilDaftar.useQuery(undefined, {
    retry: false,
  });

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Laporan Menunggu Verifikasi
        </h1>
        <p className="mb-6 text-gray-600">
          Pilih laporan untuk melihat dokumentasi dan memutuskan hasil
          peninjauan.
        </p>

        {laporanQuery.isLoading && (
          <p
            role="status"
            className="rounded-xl bg-white p-6 text-gray-600 shadow"
          >
            Memuat laporan...
          </p>
        )}

        {laporanQuery.isError && (
          <div role="alert" className="rounded-xl bg-red-50 p-6 text-red-700">
            <p className="font-semibold">Gagal memuat laporan:</p>
            <p className="text-sm">{laporanQuery.error.message}</p>
          </div>
        )}

        {!laporanQuery.isLoading &&
          !laporanQuery.isError &&
          laporanQuery.data?.length === 0 && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-gray-600 shadow-sm">
              Belum ada laporan yang diajukan.
            </div>
          )}

        <div className="space-y-4">
          {laporanQuery.data?.map((laporan) => (
            <article
              key={laporan.id}
              className="flex flex-col justify-between gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center"
            >
              <div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                  {laporan.statusPeninjauan}
                </span>
                <h2 className="mt-3 text-lg font-semibold text-gray-900">
                  {laporan.program.namaProgram}
                </h2>
                <p className="text-sm text-gray-600">
                  {laporan.program.inisiatorProgram.namaLembaga}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Diajukan{" "}
                  {new Date(laporan.waktuPengajuan).toLocaleString("id-ID")}
                </p>
              </div>
              <Link
                href={`/laporan/verifikasi/${laporan.id}`}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-emerald-700"
              >
                Tinjau Laporan
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}