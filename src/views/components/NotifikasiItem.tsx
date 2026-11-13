import { cn } from "~/lib/cn";

import { Ikon } from "./Ikon";

type NotifikasiItemProps = {
  pesan: string;
  /** Contoh: "2 jam lalu". */
  waktu: string;
  dibaca: boolean;
  onClick?: () => void;
  className?: string;
};

/** Notifikasi yang belum dibaca diberi latar hijau dan titik. */
export function NotifikasiItem({
  pesan,
  waktu,
  dibaca,
  onClick,
  className,
}: NotifikasiItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "focus-visible:outline-primary flex w-full items-start gap-3 rounded-xl p-4 text-left transition-colors focus-visible:outline-2",
        dibaca
          ? "bg-card hover:bg-background"
          : "bg-subtle hover:bg-brand-light",
        className,
      )}
    >
      <span className="border-border bg-card text-primary flex size-10 shrink-0 items-center justify-center rounded-full border">
        <Ikon nama="bell" ukuran={20} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span
          className={cn("text-text", dibaca ? "text-body" : "text-body-medium")}
        >
          {pesan}
        </span>
        <span className="text-caption text-text-secondary">{waktu}</span>
      </span>
      {!dibaca && (
        <span className="bg-primary mt-1 size-2.5 shrink-0 rounded-full">
          <span className="sr-only">Belum dibaca</span>
        </span>
      )}
    </button>
  );
}
