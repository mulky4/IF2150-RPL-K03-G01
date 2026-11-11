"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export function LaporanDetailView({ id }: { id: string }) {
  const router = useRouter();
  const [catatan, setCatatan] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Jalankan query HANYA jika id valid (bukan string kosong dan bukan literal "[id]")
  const isValidId = Boolean(id) && id !== "[id]";
  const laporanQuery = api.laporan.tinjauLaporan.useQuery(
    { idLaporan: id },
    { enabled: isValidId }
  );

  const verifikasiMutation = api.laporan.verifikasiLaporan.useMutation({
    onSuccess: ({ statusProgram }) => {
      alert(`Peninjauan berhasil. Status program: ${statusProgram}.`);
      router.push("/laporan/verifikasi");
    },
    onError: (error) => setErrorMessage(error.message),
  });

  const verifikasi = (status: "DISETUJUI" | "DITOLAK") => {
    setErrorMessage("");
    if (status === "DITOLAK" && !catatan.trim()) {
      setErrorMessage("Catatan revisi wajib diisi untuk menolak laporan.");
      return;
    }
    verifikasiMutation.mutate({
      idLaporan: id,
      status,
      catatan: status === "DITOLAK" ? catatan.trim() : undefined,
    });
  };

  if (!isValidId) {
    return (
      <main className="p-8">
        <p role="alert" className="mb-4 text-red-700 font-semibold">
          ID Laporan tidak valid. Silakan pilih laporan dari daftar verifikasi.
        </p>
        <Link
          href="/laporan/verifikasi"
          className="text-emerald-700 hover:underline text-sm font-semibold"
        >
          ← Kembali ke daftar laporan
        </Link>
      </main>
    );
  }

  if (laporanQuery.isLoading) {
    return <p className="p-8 text-gray-600">Memuat detail laporan...</p>;
  }

  if (laporanQuery.isError) {
    return (
      <main className="p-8">
        <p role="alert" className="mb-4 text-red-700">
          Gagal memuat laporan: {laporanQuery.error.message}
        </p>
        <Link
          href="/laporan/verifikasi"
          className="text-emerald-700 hover:underline"
        >
          Kembali ke daftar laporan
        </Link>
      </main>
    );
  }

  if (!laporanQuery.data) return null;

  const laporan = laporanQuery.data;
  const masihMenunggu = laporan.statusPeninjauan === "MENUNGGU";

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <article className="mx-auto max-w-3xl space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div>
          <Link
            href="/laporan/verifikasi"
            className="text-sm font-semibold text-emerald-700 hover:underline"
          >
            ← Kembali ke daftar laporan
          </Link>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              {laporan.program.namaProgram}
            </h1>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
              {laporan.statusPeninjauan}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-600">
            {laporan.program.inisiatorProgram.namaLembaga} · Diajukan{" "}
            {new Date(laporan.waktuPengajuan).toLocaleString("id-ID")}
          </p>
        </div>

        <section>
          <h2 className="mb-2 font-semibold text-gray-900">
            Ringkasan capaian
          </h2>
          <p className="whitespace-pre-wrap text-gray-700">
            {laporan.ringkasanCapaian}
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-semibold text-gray-900">
            Dokumentasi akhir
          </h2>
          <ul className="list-inside list-disc space-y-1">
            {laporan.dokumentasiAkhir.map((url) => (
              <li key={url}>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-emerald-700 hover:underline"
                >
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {!masihMenunggu && laporan.catatanRevisi && (
          <section className="rounded-lg bg-amber-50 p-4 text-amber-900">
            <h2 className="font-semibold">Catatan revisi</h2>
            <p className="mt-1 whitespace-pre-wrap">{laporan.catatanRevisi}</p>
          </section>
        )}

        {masihMenunggu && (
          <section className="space-y-3 border-t border-gray-200 pt-5">
            {errorMessage && (
              <p role="alert" className="text-sm text-red-700">
                {errorMessage}
              </p>
            )}
            <label
              htmlFor="catatan"
              className="block text-sm font-semibold text-gray-900"
            >
              Catatan revisi (wajib jika laporan ditolak)
            </label>
            <textarea
              id="catatan"
              rows={3}
              value={catatan}
              onChange={(event) => setCatatan(event.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm"
              placeholder="Jelaskan bagian yang perlu diperbaiki..."
            />
            <div className="flex flex-wrap justify-end gap-3">
              <button
                type="button"
                disabled={verifikasiMutation.isPending}
                onClick={() => verifikasi("DITOLAK")}
                className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
              >
                {verifikasiMutation.isPending
                  ? "Memproses..."
                  : "Tolak dan minta revisi"}
              </button>
              <button
                type="button"
                disabled={verifikasiMutation.isPending}
                onClick={() => verifikasi("DISETUJUI")}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
              >
                {verifikasiMutation.isPending
                  ? "Memproses..."
                  : "Setujui laporan"}
              </button>
            </div>
          </section>
        )}
      </article>
    </main>
  );
}