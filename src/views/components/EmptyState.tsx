import type { ReactNode } from "react";

import { cn } from "~/lib/cn";

import { Ikon, type NamaIkon } from "./Ikon";

type EmptyStateProps = {
  judul: string;
  deskripsi?: string;
  ikon?: NamaIkon;
  /** Opsional, misalnya tombol "Cari Program". */
  aksi?: ReactNode;
  className?: string;
};

export function EmptyState({
  judul,
  deskripsi,
  ikon = "compass",
  aksi,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "bg-card shadow-card flex flex-col items-center gap-3 rounded-2xl px-6 py-10 text-center",
        className,
      )}
    >
      <span className="bg-subtle text-primary flex size-14 items-center justify-center rounded-full">
        <Ikon nama={ikon} ukuran={28} />
      </span>
      <h2 className="text-h3 text-text">{judul}</h2>
      {deskripsi && (
        <p className="text-body text-text-secondary max-w-md">{deskripsi}</p>
      )}
      {aksi && <div className="mt-2">{aksi}</div>}
    </div>
  );
}
