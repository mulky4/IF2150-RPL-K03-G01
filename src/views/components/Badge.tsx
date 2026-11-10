import type { ReactNode } from "react";

import { cn } from "~/lib/cn";

export type NadaBadge =
  "sukses" | "peringatan" | "error" | "menunggu" | "kategori";

const gayaNada: Record<NadaBadge, string> = {
  sukses: "bg-success-bg text-success",
  peringatan: "bg-warning-bg text-warning",
  error: "bg-error-bg text-error",
  menunggu: "bg-neutral-bg text-neutral",
  kategori: "bg-brand-light text-primary-hover",
};

type BadgeProps = {
  nada?: NadaBadge;
  children: ReactNode;
  className?: string;
};

export function Badge({ nada = "sukses", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "text-label inline-flex h-7 items-center rounded-full px-3 whitespace-nowrap",
        gayaNada[nada],
        className,
      )}
    >
      {children}
    </span>
  );
}
