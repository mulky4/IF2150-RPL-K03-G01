"use client";

import { useId, useState, type ComponentProps } from "react";

import { cn } from "~/lib/cn";

import { Field, kelasKotak, type PropsField } from "./Field";
import { Ikon } from "./Ikon";

type PasswordInputProps = Omit<ComponentProps<"input">, "id" | "type"> &
  PropsField & { id?: string };

/** Input kata sandi, ada tombol mata untuk menampilkan isinya. */
export function PasswordInput({
  label,
  bantuan,
  error,
  id,
  className,
  disabled,
  ...props
}: PasswordInputProps) {
  const idOtomatis = useId();
  const idField = id ?? idOtomatis;
  const [terlihat, setTerlihat] = useState(false);
  const adaPesan = Boolean(error ?? bantuan);
  return (
    <Field
      id={idField}
      label={label}
      bantuan={bantuan}
      error={error}
      className={className}
    >
      <div
        className={cn(
          kelasKotak({ error }),
          "flex h-12 items-center gap-2 pr-1",
        )}
      >
        <input
          id={idField}
          type={terlihat ? "text" : "password"}
          disabled={disabled}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={adaPesan ? `${idField}-pesan` : undefined}
          className="h-full w-full min-w-0 bg-transparent outline-none disabled:cursor-not-allowed"
          {...props}
        />
        <button
          type="button"
          onClick={() => setTerlihat((v) => !v)}
          disabled={disabled}
          aria-label={
            terlihat ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
          }
          aria-pressed={terlihat}
          className="text-text-secondary hover:bg-subtle flex size-10 shrink-0 items-center justify-center rounded-lg disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          <Ikon nama="eye" ukuran={20} />
        </button>
      </div>
    </Field>
  );
}
