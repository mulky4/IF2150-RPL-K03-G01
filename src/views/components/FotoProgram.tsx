import { cn } from "~/lib/cn";

import { Logo } from "./Logo";

export type KategoriFoto = "JAGA_ALAM" | "JAGA_IKLIM";

const latar: Record<KategoriFoto, string> = {
  JAGA_ALAM: "bg-brand-light",
  JAGA_IKLIM: "bg-subtle",
};

type FotoProgramProps = {
  kategori: KategoriFoto;
  className?: string;
};

/** Program belum punya kolom foto, jadi sementara pakai placeholder per kategori. */
export function FotoProgram({ kategori, className }: FotoProgramProps) {
  return (
    <div
      role="img"
      aria-label={`Foto program ${kategori === "JAGA_ALAM" ? "Jaga Alam" : "Jaga Iklim"}`}
      className={cn(
        "flex h-50 w-full items-center justify-center",
        latar[kategori],
        className,
      )}
    >
      <Logo bentuk="ikon" className="opacity-35" />
    </div>
  );
}
