"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { BadgeJumlah } from "./BadgeJumlah";
import { Ikon } from "./Ikon";
import { Logo } from "./Logo";

type TopBarProps =
  | {
      /** Untuk halaman utama: logo dan ikon notifikasi. */
      jenis?: "logo";
      tampilkanNotifikasi?: boolean;
      jumlahNotifikasiBelumDibaca?: number;
    }
  | {
      /** Untuk halaman turunan: tombol kembali dan judul. */
      jenis: "kembali";
      judul: string;
      /** Kalau kosong, tombol kembali pakai router.back(). */
      href?: string;
    };

/** Header atas, cuma muncul di mobile. */
export function TopBar(props: TopBarProps) {
  const router = useRouter();

  if (props.jenis === "kembali") {
    const kelasTombol =
      "flex size-11 items-center justify-center rounded-full text-text hover:bg-background";
    return (
      <header className="border-border bg-card sticky top-0 z-30 flex h-14 items-center gap-2 border-b px-4 md:hidden">
        {props.href ? (
          <Link href={props.href} aria-label="Kembali" className={kelasTombol}>
            <Ikon nama="back" ukuran={22} />
          </Link>
        ) : (
          <button
            type="button"
            aria-label="Kembali"
            onClick={() => router.back()}
            className={kelasTombol}
          >
            <Ikon nama="back" ukuran={22} />
          </button>
        )}
        <h1 className="text-h3 text-text truncate">{props.judul}</h1>
      </header>
    );
  }

  const jumlah = props.jumlahNotifikasiBelumDibaca ?? 0;
  return (
    <header className="border-border bg-card sticky top-0 z-30 flex h-14 items-center justify-between border-b px-4 md:hidden">
      <Link href="/" aria-label="Beranda RekanBumi">
        <Logo />
      </Link>
      {props.tampilkanNotifikasi && (
        <Link
          href="/notifikasi"
          aria-label={
            jumlah > 0 ? `Notifikasi, ${jumlah} belum dibaca` : "Notifikasi"
          }
          className="text-text-secondary hover:bg-background relative flex size-11 items-center justify-center rounded-full"
        >
          <Ikon nama="bell" ukuran={22} />
          <BadgeJumlah jumlah={jumlah} className="top-1 left-6" />
        </Link>
      )}
    </header>
  );
}
