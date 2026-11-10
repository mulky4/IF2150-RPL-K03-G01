import type { ComponentProps } from "react";

import { cn } from "~/lib/cn";

type ChipProps = ComponentProps<"button"> & { aktif?: boolean };

export function Chip({
  aktif = false,
  className,
  type = "button",
  ...props
}: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={aktif}
      className={cn(
        "text-label focus-visible:outline-primary inline-flex min-h-11 items-center rounded-full px-4 py-3 whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
        aktif
          ? "bg-primary text-on-primary"
          : "border-border bg-card text-primary hover:bg-subtle border",
        className,
      )}
      {...props}
    />
  );
}
