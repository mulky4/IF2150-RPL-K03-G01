import { cn } from "~/lib/cn";

import { Badge } from "./Badge";
import { ButtonLink } from "./Button";
import { FotoProgram, type KategoriFoto } from "./FotoProgram";
import { Ikon } from "./Ikon";

type ProgramCardProps = {
  href: string;
  nama: string;
  kategori: KategoriFoto;
  lembaga: string;
  /** Kalau true, muncul ikon perisai di samping nama lembaga. */
  lembagaTerverifikasi?: boolean;
  lokasi: string;
  /** Sudah diformat, contoh: "12 Nov 2026 · 07.00–12.00 WIB". */
  tanggal: string;
  kuota: number;
  jumlahDiterima: number;
  className?: string;
};

const labelKategori: Record<KategoriFoto, string> = {
  JAGA_ALAM: "Jaga Alam",
  JAGA_IKLIM: "Jaga Iklim",
};

/** Kartu program di halaman eksplorasi. */
export function ProgramCard({
  href,
  nama,
  kategori,
  lembaga,
  lembagaTerverifikasi = false,
  lokasi,
  tanggal,
  kuota,
  jumlahDiterima,
  className,
}: ProgramCardProps) {
  const sisa = Math.max(kuota - jumlahDiterima, 0);
  const persen = kuota > 0 ? Math.min((jumlahDiterima / kuota) * 100, 100) : 0;

  return (
    <article
      className={cn(
        "bg-card shadow-card flex w-full flex-col overflow-hidden rounded-2xl",
        className,
      )}
    >
      <FotoProgram kategori={kategori} />
      <div className="flex flex-col items-start gap-2.5 p-5">
        <Badge nada="kategori">{labelKategori[kategori]}</Badge>
        <h3 className="text-h3 text-text">{nama}</h3>
        <p className="text-label text-text-secondary flex items-center gap-1.5">
          {lembaga}
          {lembagaTerverifikasi && (
            <Ikon
              nama="shield"
              ukuran={16}
              className="text-primary"
              label="Lembaga terverifikasi"
            />
          )}
        </p>
        <p className="text-caption text-text flex items-center gap-2">
          <Ikon nama="pin" ukuran={18} className="text-primary" />
          {lokasi}
        </p>
        <p className="text-caption text-text flex items-center gap-2">
          <Ikon nama="calendar" ukuran={18} className="text-primary" />
          {tanggal}
        </p>
        <p className="text-caption text-text flex items-center gap-2">
          <Ikon nama="users" ukuran={18} className="text-primary" />
          {jumlahDiterima}/{kuota} relawan
        </p>
        <div className="flex w-full flex-col gap-1.5">
          <div
            role="progressbar"
            aria-label="Kuota relawan terisi"
            aria-valuemin={0}
            aria-valuemax={kuota}
            aria-valuenow={jumlahDiterima}
            className="bg-brand-light h-2 w-full overflow-hidden rounded-full"
          >
            <div
              className="bg-primary h-full rounded-full"
              style={{ width: `${persen}%` }}
            />
          </div>
          <p className="text-caption text-text-secondary">
            {sisa > 0 ? `${sisa} kuota tersisa` : "Kuota penuh"}
          </p>
        </div>
        <ButtonLink href={href} varian="secondary" lebarPenuh>
          Lihat Detail
        </ButtonLink>
      </div>
    </article>
  );
}
