import type { ReactNode } from "react";

import { cn } from "~/lib/cn";

/** Props yang sama untuk semua komponen form. */
export type PropsField = {
  label: string;
  /** Teks kecil di bawah field. */
  bantuan?: string;
  /** Kalau diisi, field jadi merah dan teks bantuan diganti pesan ini. */
  error?: string;
};

/** Gaya kotak dasar untuk semua field. */
export function kelasKotak({ error }: { error?: string }) {
  return cn(
    "w-full rounded-xl bg-card px-4 text-body text-text placeholder:text-text-secondary",
    "focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-primary",
    "has-disabled:bg-disabled-bg has-disabled:text-disabled",
    error ? "border-[1.5px] border-error" : "border border-border",
  );
}

type FieldProps = PropsField & {
  id: string;
  children: ReactNode;
  className?: string;
};

export function Field({
  id,
  label,
  bantuan,
  error,
  children,
  className,
}: FieldProps) {
  const pesan = error ?? bantuan;
  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-label text-text">
        {label}
      </label>
      {children}
      {pesan && (
        <p
          id={`${id}-pesan`}
          className={cn(
            "text-caption",
            error ? "text-error" : "text-text-secondary",
          )}
        >
          {pesan}
        </p>
      )}
    </div>
  );
}
