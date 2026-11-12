"use client";

import { EmptyState } from "~/views/components/EmptyState";

/** Halaman Kegiatan Saya. Masih kerangka, daftar kegiatan dan check-in menyusul. */
export function AreaKegiatan() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 md:px-8">
      <h1 className="text-h1 text-text">Kegiatan Saya</h1>
      <EmptyState
        ikon="calendar"
        judul="Halaman sedang disiapkan"
        deskripsi="Daftar kegiatan dan tombol check-in akan muncul di sini."
      />
    </section>
  );
}
