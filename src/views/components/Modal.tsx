"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

type ModalProps = {
  terbuka: boolean;
  onTutup: () => void;
  judul: string;
  children?: ReactNode;
  /** Tombol di bagian bawah, misalnya Batal dan Ya. */
  aksi?: ReactNode;
};

/** Pakai <dialog> bawaan browser, jadi fokus dan tombol Esc sudah diurus otomatis. */
export function Modal({ terbuka, onTutup, judul, children, aksi }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const idJudul = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (terbuka && !dialog.open) dialog.showModal();
    if (!terbuka && dialog.open) dialog.close();
  }, [terbuka]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={idJudul}
      onClose={onTutup}
      onClick={(e) => {
        if (e.target === ref.current) onTutup();
      }}
      className="bg-card text-text shadow-card backdrop:bg-text/40 m-auto w-[calc(100%-32px)] max-w-md rounded-2xl p-0"
    >
      <div className="flex flex-col gap-4 p-6">
        <h2 id={idJudul} className="text-h3">
          {judul}
        </h2>
        {children && (
          <div className="text-body text-text-secondary">{children}</div>
        )}
        {aksi && (
          <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            {aksi}
          </div>
        )}
      </div>
    </dialog>
  );
}
