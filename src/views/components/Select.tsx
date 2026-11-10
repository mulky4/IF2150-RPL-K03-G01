"use client";

import { useId, type ComponentProps } from "react";

import { cn } from "~/lib/cn";

import { Field, kelasKotak, type PropsField } from "./Field";
import { Ikon } from "./Ikon";

export type OpsiSelect = { nilai: string; label: string };

type SelectProps = Omit<ComponentProps<"select">, "id" | "children"> &
  PropsField & {
    id?: string;
    opsi: OpsiSelect[];
    /** Opsi kosong di paling atas, contoh: "Pilih kategori". */
    placeholder?: string;
  };

export function Select({
  label,
  bantuan,
  error,
  id,
  className,
  opsi,
  placeholder,
  ...props
}: SelectProps) {
  const idOtomatis = useId();
  const idField = id ?? idOtomatis;
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
        className={cn(kelasKotak({ error }), "relative flex h-12 items-center")}
      >
        <select
          id={idField}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={adaPesan ? `${idField}-pesan` : undefined}
          className="h-full w-full min-w-0 appearance-none bg-transparent pr-8 outline-none disabled:cursor-not-allowed"
          {...props}
        >
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {opsi.map((o) => (
            <option key={o.nilai} value={o.nilai}>
              {o.label}
            </option>
          ))}
        </select>
        <Ikon
          nama="chevron-down"
          ukuran={20}
          className="text-text-secondary pointer-events-none absolute right-4"
        />
      </div>
    </Field>
  );
}
