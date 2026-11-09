"use client";

import { useId, type ComponentProps } from "react";

import { cn } from "~/lib/cn";

import { Field, kelasKotak, type PropsField } from "./Field";

type InputProps = Omit<ComponentProps<"input">, "id"> &
  PropsField & { id?: string };

export function Input({
  label,
  bantuan,
  error,
  id,
  className,
  ...props
}: InputProps) {
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
      <div className={cn(kelasKotak({ error }), "flex h-12 items-center")}>
        <input
          id={idField}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={adaPesan ? `${idField}-pesan` : undefined}
          className="h-full w-full min-w-0 bg-transparent outline-none disabled:cursor-not-allowed"
          {...props}
        />
      </div>
    </Field>
  );
}
