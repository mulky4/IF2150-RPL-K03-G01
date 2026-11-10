"use client";

import { useId, useRef, useState, type DragEvent } from "react";

import { cn } from "~/lib/cn";

import { Ikon } from "./Ikon";

type FileDropzoneProps = {
  label: string;
  /** Contoh: "PDF, JPG, atau PNG · maksimal 2 MB". */
  bantuan?: string;
  error?: string;
  /** Contoh: ".pdf,.jpg,.png". */
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  /** Validasi tipe dan ukuran berkas tetap dilakukan di server. */
  onPilihBerkas: (berkas: File[]) => void;
  /** Ditampilkan setelah user memilih berkas. */
  namaBerkas?: string[];
  className?: string;
};

/** Area unggah berkas, bisa drag-and-drop atau lewat tombol. */
export function FileDropzone({
  label,
  bantuan,
  error,
  accept,
  multiple,
  disabled,
  onPilihBerkas,
  namaBerkas = [],
  className,
}: FileDropzoneProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [diseret, setDiseret] = useState(false);

  function terimaBerkas(daftar: FileList | null) {
    if (!daftar || daftar.length === 0) return;
    onPilihBerkas(Array.from(daftar));
  }

  function saatDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDiseret(false);
    if (!disabled) terimaBerkas(e.dataTransfer.files);
  }

  const pesan = error ?? bantuan;

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-label text-text">
        {label}
      </label>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDiseret(true);
        }}
        onDragLeave={() => setDiseret(false)}
        onDrop={saatDrop}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-xl border-[1.5px] border-dashed px-4 py-6 text-center",
          error ? "border-error" : "border-secondary",
          diseret ? "bg-subtle" : "bg-background",
          disabled && "cursor-not-allowed opacity-60",
        )}
      >
        <Ikon nama="upload" ukuran={28} className="text-primary" />
        <p className="text-body text-text">
          Seret &amp; lepas berkas di sini, atau
        </p>
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className="text-button text-primary hover:text-primary-hover focus-visible:outline-primary rounded-lg px-2 hover:underline focus-visible:outline-2 disabled:cursor-not-allowed"
        >
          Pilih berkas
        </button>
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={pesan ? `${id}-pesan` : undefined}
          onChange={(e) => {
            terimaBerkas(e.target.files);
            e.target.value = "";
          }}
          className="sr-only"
        />
        {namaBerkas.length > 0 && (
          <ul className="text-caption text-text-secondary mt-1">
            {namaBerkas.map((nama) => (
              <li key={nama}>{nama}</li>
            ))}
          </ul>
        )}
      </div>
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
