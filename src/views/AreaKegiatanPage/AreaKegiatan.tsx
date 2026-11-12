"use client";

import Link from "next/link";
import { Suspense, useEffect, useState, type ReactNode } from "react";

import { cn } from "~/lib/cn";
import { jam, rentangWaktu, tanggalJam } from "~/lib/waktu";
import { Badge, type NadaBadge } from "~/views/components/Badge";
import { Banner } from "~/views/components/Banner";
import { Button, ButtonLink } from "~/views/components/Button";
import { EmptyState } from "~/views/components/EmptyState";
import { Ikon } from "~/views/components/Ikon";

import {
  useAreaKegiatanPage,
  type KegiatanDiLayar,
} from "./useAreaKegiatanPage";

const LABEL_KATEGORI = { JAGA_ALAM: "Jaga Alam", JAGA_IKLIM: "Jaga Iklim" };

const STATUS_PENDAFTARAN: Record<
  KegiatanDiLayar["statusPendaftaran"],
  { label: string; nada: NadaBadge }
> = {
  DITERIMA: { label: "Diterima", nada: "sukses" },
  MENUNGGU: { label: "Menunggu", nada: "menunggu" },
  DITOLAK: { label: "Ditolak", nada: "error" },
};

/** Jam sekarang yang diperbarui tiap 30 detik. Null sampai halaman tampil di browser. */
function useSekarang() {
  const [sekarang, setSekarang] = useState<Date | null>(null);
  useEffect(() => {
    setSekarang(new Date());
    const id = setInterval(() => setSekarang(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return sekarang;
}

function statusWaktu(kegiatan: KegiatanDiLayar, sekarang: Date | null) {
  if (sekarang === null) return null;
  if (sekarang < kegiatan.waktuMulai)
    return { label: "Akan datang", nada: "menunggu" as const };
  if (sekarang <= kegiatan.waktuSelesai)
    return { label: "Berlangsung", nada: "sukses" as const };
  return { label: "Selesai", nada: "menunggu" as const };
}

export function AreaKegiatan() {
  return (
    <Suspense fallback={<KerangkaMemuat />}>
      <IsiAreaKegiatan />
    </Suspense>
  );
}

function IsiAreaKegiatan() {
  const halaman = useAreaKegiatanPage();
  const sekarang = useSekarang();

  if (halaman.memuatDaftar) return <KerangkaMemuat />;

  if (halaman.gagalMemuat) {
    return (
      <Tata>
        <Banner nada="error">
          Daftar kegiatan gagal dimuat. Coba muat ulang halaman.
        </Banner>
      </Tata>
    );
  }

  if (halaman.kegiatan === null) {
    return (
      <Tata>
        <h1 className="text-h2 text-text">Kegiatan Saya</h1>
        <EmptyState
          ikon="calendar"
          judul="Belum ada kegiatan"
          deskripsi="Program yang kamu daftari akan muncul di sini, lengkap dengan tombol check-in saat kegiatan berlangsung."
          aksi={<ButtonLink href="/program">Cari Program</ButtonLink>}
        />
      </Tata>
    );
  }

  const kegiatan = halaman.kegiatan;

  return (
    <Tata>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8">
        <section
          aria-labelledby="judul-kegiatan"
          className="hidden w-80 shrink-0 flex-col gap-3 md:flex xl:w-95"
        >
          <h1 id="judul-kegiatan" className="text-h2 text-text">
            Kegiatan Saya
          </h1>
          <p className="text-caption text-text-secondary">
            Program yang kamu ikuti sebagai relawan.
          </p>
          <ul className="flex flex-col gap-3">
            {halaman.daftar.map((item) => (
              <li key={item.idProgram}>
                <ItemKegiatan
                  kegiatan={item}
                  dipilih={item.idProgram === kegiatan.idProgram}
                  sekarang={sekarang}
                  onPilih={() => halaman.bukaHalamanKegiatan(item.idProgram)}
                />
              </li>
            ))}
          </ul>
        </section>

        <h1 className="text-h2 text-text md:hidden">Kegiatan terdekat</h1>

        <div className="flex min-w-0 flex-1 flex-col gap-4 md:items-center md:gap-5">
          <RingkasanProgram kegiatan={kegiatan} />
          <PanelCheckIn
            kegiatan={kegiatan}
            halaman={halaman}
            sekarang={sekarang}
          />
          <Link
            href="/portofolio"
            className="text-button text-primary hover:text-primary-hover inline-flex items-center gap-1.5 self-start md:self-center"
          >
            Lihat Portofolio Saya
            <Ikon nama="next" ukuran={18} />
          </Link>
        </div>
      </div>
    </Tata>
  );
}

function Tata({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 py-4 md:px-6 md:py-10 lg:px-30">
      {children}
    </div>
  );
}

function ItemKegiatan({
  kegiatan,
  dipilih,
  sekarang,
  onPilih,
}: {
  kegiatan: KegiatanDiLayar;
  dipilih: boolean;
  sekarang: Date | null;
  onPilih: () => void;
}) {
  const status = statusWaktu(kegiatan, sekarang);
  return (
    <button
      type="button"
      onClick={onPilih}
      aria-current={dipilih ? "true" : undefined}
      className={cn(
        "flex w-full flex-col gap-1.5 rounded-xl p-4 text-left transition-colors",
        dipilih
          ? "border-primary bg-subtle border-2"
          : "border-border bg-card hover:bg-background border",
      )}
    >
      <span className="flex w-full items-center justify-between gap-3">
        <span className="text-label text-text min-w-0">
          {kegiatan.namaProgram}
        </span>
        {status && <Badge nada={status.nada}>{status.label}</Badge>}
      </span>
      <span className="text-caption text-text-secondary flex items-center gap-1.5">
        <Ikon nama="calendar" ukuran={16} />
        {tanggalJam(kegiatan.waktuMulai)}
      </span>
      <span className="text-caption text-text-secondary flex items-center gap-1.5">
        <Ikon nama="pin" ukuran={16} />
        {kegiatan.tempatPelaksanaan}
      </span>
    </button>
  );
}

function RingkasanProgram({ kegiatan }: { kegiatan: KegiatanDiLayar }) {
  const status = STATUS_PENDAFTARAN[kegiatan.statusPendaftaran];
  return (
    <article className="border-border bg-card flex w-full items-center gap-4 rounded-2xl border p-3">
      <span
        className={cn(
          "text-primary flex size-20 shrink-0 items-center justify-center rounded-xl",
          kegiatan.kategori === "JAGA_ALAM" ? "bg-brand-light" : "bg-subtle",
        )}
      >
        <Ikon nama="image" ukuran={22} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge nada="kategori">{LABEL_KATEGORI[kegiatan.kategori]}</Badge>
          <Badge nada={status.nada}>{status.label}</Badge>
        </div>
        <h2 className="text-body-medium text-text">{kegiatan.namaProgram}</h2>
        <p className="text-caption text-text-secondary flex items-center gap-1.5">
          <Ikon nama="pin" ukuran={16} className="shrink-0" />
          {kegiatan.tempatPelaksanaan}
        </p>
      </div>
    </article>
  );
}

function PanelCheckIn({
  kegiatan,
  halaman,
  sekarang,
}: {
  kegiatan: KegiatanDiLayar;
  halaman: ReturnType<typeof useAreaKegiatanPage>;
  sekarang: Date | null;
}) {
  const rentang = rentangWaktu(kegiatan.waktuMulai, kegiatan.waktuSelesai);
  const sudahHadir = halaman.waktuKehadiran !== null;

  return (
    <section
      aria-labelledby="judul-checkin"
      className="bg-card shadow-card flex w-full flex-col items-center gap-4 rounded-2xl p-5 text-center md:p-8"
    >
      {halaman.checkInBerhasil && halaman.waktuKehadiran && (
        <Banner nada="sukses" className="w-full text-left">
          Check-in berhasil pukul {jam(halaman.waktuKehadiran)} WIB. Terima
          kasih sudah hadir!
        </Banner>
      )}
      {halaman.pesanGagalCheckIn && (
        <Banner nada="error" className="w-full text-left">
          {halaman.pesanGagalCheckIn}
        </Banner>
      )}

      <h2 id="judul-checkin" className="text-h2 text-text">
        Check-in Kehadiran
      </h2>
      <p className="text-body text-text">Waktu pelaksanaan: {rentang}</p>

      {halaman.keteranganWaktu && (
        <StatusKegiatan keterangan={halaman.keteranganWaktu} />
      )}
      {sekarang && (
        <p className="text-text-secondary text-xs">
          Sekarang: {tanggalJam(sekarang)} WIB
        </p>
      )}

      {!halaman.memuatStatus && !halaman.statusRelawan && (
        <Banner nada="peringatan" className="w-full text-left">
          Check-in hanya untuk relawan yang pendaftarannya sudah diterima.
        </Banner>
      )}
      {!halaman.memuatStatus &&
        halaman.statusRelawan &&
        !halaman.waktuValid &&
        !sudahHadir && (
          <Banner nada="peringatan" className="w-full text-left">
            Check-in hanya dapat dilakukan pada {rentang}.
          </Banner>
        )}

      <Button
        lebarPenuh
        disabled={!halaman.tombolCheckInAktif}
        aria-busy={halaman.sedangCheckIn}
        onClick={halaman.klikCheckIn}
      >
        {sudahHadir && halaman.waktuKehadiran
          ? `Sudah check-in · ${jam(halaman.waktuKehadiran)} WIB`
          : halaman.sedangCheckIn
            ? "Mencatat kehadiran…"
            : "Check-in Sekarang"}
      </Button>

      <Banner nada="info" className="w-full text-left">
        Jam aksi ditambahkan ke portofolio setelah laporan akhir program
        disetujui Verifikator.
      </Banner>
    </section>
  );
}

function StatusKegiatan({ keterangan }: { keterangan: string }) {
  const berlangsung = keterangan === "Sedang berlangsung";
  return (
    <span
      className={cn(
        "text-label inline-flex items-center gap-2 rounded-full px-4 py-2",
        berlangsung
          ? "bg-success-bg text-success"
          : "bg-neutral-bg text-neutral",
      )}
    >
      <Ikon nama={berlangsung ? "target" : "clock"} ukuran={18} />
      Kegiatan {keterangan.toLowerCase()}
    </span>
  );
}

function KerangkaMemuat() {
  return (
    <Tata>
      <div className="flex flex-col gap-4 md:flex-row md:gap-8" aria-busy>
        <div className="bg-card hidden h-80 w-80 shrink-0 animate-pulse rounded-xl md:block xl:w-95" />
        <div className="flex flex-1 flex-col gap-4">
          <div className="bg-card h-28 animate-pulse rounded-2xl" />
          <div className="bg-card h-88 animate-pulse rounded-2xl" />
        </div>
      </div>
    </Tata>
  );
}
