import { cn } from "~/lib/cn";

export type NamaIkon =
  | "alert-error"
  | "alert-info"
  | "alert-peringatan"
  | "award"
  | "back"
  | "bell"
  | "calendar"
  | "check-sukses"
  | "chevron-down"
  | "clipboard"
  | "clock"
  | "compass"
  | "eye"
  | "file"
  | "image"
  | "next"
  | "pin"
  | "plus"
  | "search"
  | "shield"
  | "target"
  | "upload"
  | "user"
  | "users";

type IkonProps = {
  nama: NamaIkon;
  /** Dalam px. */
  ukuran?: number;
  /** Pakai warna asli SVG, untuk ikon status seperti alert dan centang. */
  berwarna?: boolean;
  className?: string;
  label?: string;
};

/**
 * Warna ikon mengikuti warna teks (pakai CSS mask), jadi cukup kasih kelas
 * `text-*` untuk mengganti warnanya.
 */
export function Ikon({
  nama,
  ukuran = 20,
  berwarna = false,
  className,
  label,
}: IkonProps) {
  const src = `/icons/${nama}.svg`;
  const aksesibilitas = label
    ? { role: "img", "aria-label": label }
    : { "aria-hidden": true };

  if (berwarna) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        width={ukuran}
        height={ukuran}
        alt={label ?? ""}
        className={cn("shrink-0", className)}
      />
    );
  }

  return (
    <span
      {...aksesibilitas}
      className={cn("inline-block shrink-0 bg-current", className)}
      style={{
        width: ukuran,
        height: ukuran,
        mask: `url(${src}) center / contain no-repeat`,
        WebkitMask: `url(${src}) center / contain no-repeat`,
      }}
    />
  );
}
