"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cn } from "~/lib/cn";

import { BadgeJumlah } from "./BadgeJumlah";
import { ButtonLink } from "./Button";
import { Ikon } from "./Ikon";
import { Logo } from "./Logo";
import { cariItemAktif, inisial, MENU, type PeranNavigasi } from "./navigasi";

export type Pengguna = { nama: string; email?: string };

type NavbarProps = {
  peran: PeranNavigasi;
  pengguna?: Pengguna;
  jumlahNotifikasiBelumDibaca?: number;
  onKeluar?: () => void;
};

/** Navbar atas, cuma muncul di desktop. */
export function Navbar({
  peran,
  pengguna,
  jumlahNotifikasiBelumDibaca = 0,
  onKeluar,
}: NavbarProps) {
  const pathname = usePathname();
  const items = MENU[peran];
  const aktif = cariItemAktif(items, pathname);
  const notifikasiAktif = aktif === "/notifikasi";

  return (
    <header className="border-border bg-card sticky top-0 z-30 hidden border-b md:block">
      <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between gap-6 px-6 lg:px-30">
        <Link href="/" aria-label="Beranda RekanBumi" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Menu utama" className="flex items-center gap-2">
          {items
            .filter((item) => item.desktop !== false)
            .map((item) => {
              const isAktif = item.href === aktif;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isAktif ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2.5 whitespace-nowrap transition-colors",
                    isAktif
                      ? "bg-subtle text-button text-primary-hover"
                      : "text-body-medium text-text-secondary hover:bg-background hover:text-text",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          {peran === "PENGUNJUNG" ? (
            <>
              <ButtonLink href="/login" varian="ghost">
                Masuk
              </ButtonLink>
              <ButtonLink href="/registrasi">Daftar</ButtonLink>
            </>
          ) : (
            <>
              <Link
                href="/notifikasi"
                aria-label={
                  jumlahNotifikasiBelumDibaca > 0
                    ? `Notifikasi, ${jumlahNotifikasiBelumDibaca} belum dibaca`
                    : "Notifikasi"
                }
                aria-current={notifikasiAktif ? "page" : undefined}
                className={cn(
                  "hover:bg-background relative flex size-11 items-center justify-center rounded-full transition-colors",
                  notifikasiAktif
                    ? "bg-subtle text-primary-hover"
                    : "text-text-secondary",
                )}
              >
                <Ikon nama="bell" ukuran={22} />
                <BadgeJumlah
                  jumlah={jumlahNotifikasiBelumDibaca}
                  className="top-1 left-6"
                />
              </Link>
              {pengguna && (
                <MenuProfil pengguna={pengguna} onKeluar={onKeluar} />
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function MenuProfil({
  pengguna,
  onKeluar,
}: {
  pengguna: Pengguna;
  onKeluar?: () => void;
}) {
  const [terbuka, setTerbuka] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!terbuka) return;
    function tutup(e: MouseEvent | KeyboardEvent) {
      if (
        e instanceof KeyboardEvent
          ? e.key === "Escape"
          : !ref.current?.contains(e.target as Node)
      ) {
        setTerbuka(false);
      }
    }
    document.addEventListener("mousedown", tutup);
    document.addEventListener("keydown", tutup);
    return () => {
      document.removeEventListener("mousedown", tutup);
      document.removeEventListener("keydown", tutup);
    };
  }, [terbuka]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={terbuka}
        onClick={() => setTerbuka((v) => !v)}
        className="hover:bg-background flex items-center gap-2.5 rounded-full py-0.5 pr-2 pl-1"
      >
        <span className="bg-brand-light text-label text-primary-hover flex size-10 items-center justify-center rounded-full font-semibold">
          {inisial(pengguna.nama)}
        </span>
        <span className="text-label text-text">{pengguna.nama}</span>
        <Ikon nama="chevron-down" ukuran={18} className="text-text-secondary" />
      </button>
      {terbuka && (
        <div
          role="menu"
          className="border-border bg-card shadow-card absolute right-0 mt-2 w-56 rounded-xl border p-2"
        >
          {pengguna.email && (
            <p className="text-caption text-text-secondary truncate px-3 py-2">
              {pengguna.email}
            </p>
          )}
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setTerbuka(false);
              onKeluar?.();
            }}
            className="text-label text-error hover:bg-error-bg w-full rounded-lg px-3 py-2 text-left"
          >
            Keluar
          </button>
        </div>
      )}
    </div>
  );
}