"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "~/lib/cn";

import { BadgeJumlah } from "./BadgeJumlah";
import { Ikon } from "./Ikon";
import {
  cariItemAktif,
  MENU,
  type ItemMenu,
  type PeranNavigasi,
} from "./navigasi";

type BottomNavProps = {
  peran: PeranNavigasi;
  jumlahNotifikasiBelumDibaca?: number;
  /** Dipanggil waktu tombol "Akun" ditekan (khusus inisiator dan verifikator). */
  onAkun?: () => void;
};

/** Navigasi bawah, cuma muncul di mobile. */
export function BottomNav({
  peran,
  jumlahNotifikasiBelumDibaca = 0,
  onAkun,
}: BottomNavProps) {
  const pathname = usePathname();
  const items: ItemMenu[] =
    peran === "PENGUNJUNG"
      ? [...MENU.PENGUNJUNG, { label: "Masuk", href: "/login", ikon: "user" }]
      : MENU[peran];
  const aktif = cariItemAktif(items, pathname);
  const adaAkun = peran === "INISIATOR" || peran === "VERIFIKATOR";

  return (
    <nav
      aria-label="Menu utama"
      className="border-border bg-card fixed inset-x-0 bottom-0 z-30 flex h-19 border-t p-2 md:hidden"
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={item.href === aktif ? "page" : undefined}
          className="flex-1"
        >
          <IsiItem
            label={item.labelMobile ?? item.label}
            ikon={<Ikon nama={item.ikon} ukuran={22} />}
            aktif={item.href === aktif}
            jumlah={
              item.href === "/notifikasi" ? jumlahNotifikasiBelumDibaca : 0
            }
          />
        </Link>
      ))}
      {adaAkun && (
        <button type="button" onClick={onAkun} className="flex-1">
          <IsiItem
            label="Akun"
            ikon={<Ikon nama="user" ukuran={22} />}
            aktif={false}
            jumlah={0}
          />
        </button>
      )}
    </nav>
  );
}

function IsiItem({
  label,
  ikon,
  aktif,
  jumlah,
}: {
  label: string;
  ikon: ReactNode;
  aktif: boolean;
  jumlah: number;
}) {
  return (
    <span className="flex h-full flex-col items-center justify-center gap-1">
      <span
        className={cn(
          "relative flex h-8 w-14 items-center justify-center rounded-full",
          aktif ? "bg-subtle text-primary-hover" : "text-text-secondary",
        )}
      >
        {ikon}
        <BadgeJumlah jumlah={jumlah} className="top-0 right-2.5" />
      </span>
      <span
        className={cn(
          "text-label",
          aktif ? "text-primary-hover" : "text-text-secondary",
        )}
      >
        {label}
      </span>
    </span>
  );
}
