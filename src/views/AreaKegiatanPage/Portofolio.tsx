"use client";

import { EmptyState } from "~/views/components/EmptyState";

/** Halaman Portofolio. Masih kerangka, total jam aksi dan riwayat menyusul. */
export function Portofolio() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 md:px-8">
      <h1 className="text-h1 text-text">Portofolio</h1>
      <EmptyState
        ikon="award"
        judul="Halaman sedang disiapkan"
        deskripsi="Total jam aksi dan riwayat program akan muncul di sini."
      />
    </section>
  );
}
