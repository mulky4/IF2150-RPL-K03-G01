import { cn } from "~/lib/cn";

/** Angka merah kecil di pojok ikon lonceng. */
export function BadgeJumlah({
  jumlah,
  className,
}: {
  jumlah: number;
  className?: string;
}) {
  if (jumlah <= 0) return null;
  return (
    <span
      className={cn(
        "border-card bg-error text-on-primary absolute flex h-4.5 min-w-4.5 items-center justify-center rounded-full border-2 px-[5px] text-[11px] leading-none font-bold",
        className,
      )}
    >
      {jumlah > 99 ? "99+" : jumlah}
    </span>
  );
}
