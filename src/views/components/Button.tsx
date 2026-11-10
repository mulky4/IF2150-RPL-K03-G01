import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "~/lib/cn";

export type VarianButton = "primary" | "secondary" | "danger" | "ghost";

const dasar =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-button whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none";

const gayaVarian: Record<VarianButton, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-hover disabled:bg-disabled-bg disabled:text-disabled aria-disabled:bg-disabled-bg aria-disabled:text-disabled",
  secondary:
    "border-[1.5px] border-primary bg-card text-primary hover:bg-subtle hover:text-primary-hover disabled:border-border disabled:bg-card disabled:text-disabled aria-disabled:border-border aria-disabled:bg-card aria-disabled:text-disabled",
  danger:
    "border-[1.5px] border-error bg-card text-error hover:bg-error-bg disabled:border-border disabled:bg-card disabled:text-disabled aria-disabled:border-border aria-disabled:bg-card aria-disabled:text-disabled",
  ghost:
    "text-primary hover:bg-subtle hover:text-primary-hover disabled:bg-transparent disabled:text-disabled aria-disabled:bg-transparent aria-disabled:text-disabled",
};

type OpsiGaya = { varian?: VarianButton; lebarPenuh?: boolean };

export function kelasButton({
  varian = "primary",
  lebarPenuh = false,
}: OpsiGaya = {}) {
  return cn(dasar, gayaVarian[varian], lebarPenuh && "w-full");
}

type ButtonProps = ComponentProps<"button"> & OpsiGaya;

export function Button({
  varian,
  lebarPenuh,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(kelasButton({ varian, lebarPenuh }), className)}
      {...props}
    />
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> &
  OpsiGaya & { nonaktif?: boolean };

/** Sama seperti Button, tapi berupa link. */
export function ButtonLink({
  varian,
  lebarPenuh,
  nonaktif,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      aria-disabled={nonaktif || undefined}
      tabIndex={nonaktif ? -1 : undefined}
      className={cn(kelasButton({ varian, lebarPenuh }), className)}
      {...props}
    />
  );
}
