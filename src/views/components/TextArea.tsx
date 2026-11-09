"use client";

import { useId, type ComponentProps } from "react";

import { cn } from "~/lib/cn";

import { Field, kelasKotak, type PropsField } from "./Field";

type TextAreaProps = Omit<ComponentProps<"textarea">, "id"> &
  PropsField & { id?: string };

export function TextArea({
  label,
  bantuan,
  error,
  id,
  className,
  ...props
}: TextAreaProps) {
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
      <textarea
        id={idField}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={adaPesan ? `${idField}-pesan` : undefined}
        className={cn(
          kelasKotak({ error }),
          "disabled:bg-disabled-bg disabled:text-disabled min-h-30 resize-y py-3 outline-none disabled:cursor-not-allowed",
        )}
        {...props}
      />
    </Field>
  );
}
