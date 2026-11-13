import type { ReactNode } from "react";

import { cn } from "~/lib/cn";

import { Ikon, type NamaIkon } from "./Ikon";

export type NadaBanner = "sukses" | "peringatan" | "error" | "info";

const gaya: Record<NadaBanner, { kelas: string; ikon: NamaIkon }> = {
  sukses: { kelas: "bg-success-bg", ikon: "check-sukses" },
  peringatan: { kelas: "bg-warning-bg", ikon: "alert-peringatan" },
  error: { kelas: "bg-error-bg", ikon: "alert-error" },
  info: { kelas: "bg-neutral-bg", ikon: "alert-info" },
};

type BannerProps = {
  nada?: NadaBanner;
  children: ReactNode;
  className?: string;
};

export function Banner({ nada = "info", children, className }: BannerProps) {
  const { kelas, ikon } = gaya[nada];
  return (
    <div
      role={nada === "error" ? "alert" : "status"}
      className={cn(
        "text-body text-text flex items-start gap-3 rounded-xl px-4 py-3",
        kelas,
        className,
      )}
    >
      <Ikon nama={ikon} ukuran={24} berwarna />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
