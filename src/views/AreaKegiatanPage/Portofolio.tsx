"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

import { cn } from "~/lib/cn";
import { angkaJam, bulanTahun, tanggal } from "~/lib/waktu";
import { Badge } from "~/views/components/Badge";
import { Banner } from "~/views/components/Banner";
import { ButtonLink } from "~/views/components/Button";
import { Chip } from "~/views/components/Chip";
import { EmptyState } from "~/views/components/EmptyState";
import { Ikon, type NamaIkon } from "~/views/components/Ikon";
import { inisial } from "~/views/components/navigasi";

import {
  usePortofolio,
  type ItemRiwayat,
  type KegiatanDiLayar,
} from "./useAreaKegiatanPage";

const LABEL_KATEGORI = { JAGA_ALAM: "Jaga Alam", JAGA_IKLIM: "Jaga Iklim" };

type Tab = "selesai" | "diikuti";

export function Portofolio() {
  const halaman = usePortofolio();
  const [tab, setTab] = useState<Tab>("selesai");

  if (halaman.memuat) return <KerangkaMemuat />;

  if (halaman.gagalMemuat || halaman.profil === null) {
    return (
      <Tata>
        <Banner nada="error">
          Portofolio gagal dimuat. Coba muat ulang halaman.
        </Banner>
      </Tata>
    );
  }

  const { profil, riwayat, sedangDiikuti } = halaman;

  return (
    <Tata>
      {/* Di mobile judulnya sudah ada di bottom nav, jadi cuma untuk pembaca layar. */}
      <h1 className="text-h1 text-text sr-only md:not-sr-only">
        Portofolio Saya
      </h1>

      <section
        aria-label="Profil relawan"
        className="bg-card shadow-card flex items-center gap-4 rounded-2xl p-4 md:gap-5 md:p-6"
      >
        <span
          aria-hidden
          className="bg-brand-light text-primary-hover flex size-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold md:size-18 md:text-xl"
        >
          {inisial(profil.nama)}
        </span>
        <div className="flex min-w-0 flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h2 className="text-h3 md:text-h2 text-text">{profil.nama}</h2>
            {profil.terverifikasi && (
              <Badge nada="kategori">Relawan terverifikasi</Badge>
            )}
          </div>
          <p className="text-caption text-text-secondary flex items-center gap-1.5">
            <Ikon nama="pin" ukuran={16} className="shrink-0" />
            {[
              profil.domisili,
              `relawan sejak ${bulanTahun(profil.relawanSejak)}`,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3 md:gap-6">
        <PanelStatistik
          ikon="clock"
          angka={angkaJam(halaman.totalJamAksi)}
          satuan="jam aksi"
          keterangan="Total jam aksi"
        />
        <PanelStatistik
          ikon="award"
          angka={String(riwayat.length)}
          satuan="program"
          keterangan="Program selesai"
        />
      </div>

      <Banner nada="info">
        Jam aksi hanya bertambah untuk program yang kamu hadiri (sudah check-in)
        dan laporannya disetujui Verifikator.
      </Banner>

      <div role="group" aria-label="Jenis program" className="flex gap-2">
        <Chip aktif={tab === "selesai"} onClick={() => setTab("selesai")}>
          Riwayat Selesai ({riwayat.length})
        </Chip>
        <Chip aktif={tab === "diikuti"} onClick={() => setTab("diikuti")}>
          Sedang Diikuti ({sedangDiikuti.length})
        </Chip>
      </div>

      {tab === "selesai" ? (
        <DaftarRiwayat riwayat={riwayat} />
      ) : (
        <DaftarDiikuti daftar={sedangDiikuti} />
      )}
    </Tata>
  );
}

function Tata({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-10 lg:px-30">
      {children}
    </div>
  );
}

function PanelStatistik({
  ikon,
  angka,
  satuan,
  keterangan,
}: {
  ikon: NamaIkon;
  angka: string;
  satuan: string;
  keterangan: string;
}) {
  return (
    <section className="bg-card shadow-card flex flex-col gap-2 rounded-2xl p-4 md:gap-3 md:p-6">
      <span className="bg-brand-light text-primary-hover flex size-10 items-center justify-center rounded-lg">
        <Ikon nama={ikon} ukuran={22} />
      </span>
      <p className="text-text flex flex-wrap items-baseline gap-x-1.5">
        <span className="md:text-stat text-[28px] leading-9 font-bold">
          {angka}
        </span>
        <span className="text-body-medium">{satuan}</span>
      </p>
      <p className="text-caption text-text-secondary">{keterangan}</p>
    </section>
  );
}

function DaftarRiwayat({ riwayat }: { riwayat: ItemRiwayat[] }) {
  if (riwayat.length === 0) {
    return (
      <EmptyState
        ikon="leaf"
        judul="Belum ada program yang selesai diikuti"
        deskripsi="Ikuti program aksi lingkungan dan lakukan check-in saat kegiatan untuk mengumpulkan jam aksi."
        aksi={<ButtonLink href="/program">Cari Program</ButtonLink>}
      />
    );
  }
  return (
    <ul className="flex flex-col gap-3">
      {riwayat.map((item) => (
        <li key={item.idProgram}>
          <KartuProgram
            href={`/program/${encodeURIComponent(item.idProgram)}`}
            kategori={item.kategori}
            nama={item.namaProgram}
            keterangan={`${tanggal(item.waktuMulai)} · ${item.namaLembaga}`}
            samping={
              <>
                <Badge nada="sukses">Hadir</Badge>
                <span className="text-caption text-primary">
                  +{angkaJam(item.jamAksi)} jam
                </span>
              </>
            }
          />
        </li>
      ))}
    </ul>
  );
}

function DaftarDiikuti({ daftar }: { daftar: KegiatanDiLayar[] }) {
  if (daftar.length === 0) {
    return (
      <EmptyState
        ikon="calendar"
        judul="Belum ada program yang sedang diikuti"
        deskripsi="Program yang pendaftarannya sudah diterima akan muncul di sini."
        aksi={<ButtonLink href="/program">Cari Program</ButtonLink>}
      />
    );
  }
  return (
    <ul className="flex flex-col gap-3">
      {daftar.map((item) => (
        <li key={item.idProgram}>
          <KartuProgram
            href={`/kegiatan?program=${encodeURIComponent(item.idProgram)}`}
            kategori={item.kategori}
            nama={item.namaProgram}
            keterangan={`${tanggal(item.waktuMulai)} · ${item.tempatPelaksanaan}`}
            samping={
              <Ikon nama="next" ukuran={20} className="text-text-secondary" />
            }
          />
        </li>
      ))}
    </ul>
  );
}

function KartuProgram({
  href,
  kategori,
  nama,
  keterangan,
  samping,
}: {
  href: string;
  kategori: ItemRiwayat["kategori"];
  nama: string;
  keterangan: string;
  samping: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="border-border bg-card hover:bg-background focus-visible:outline-primary flex items-center gap-4 rounded-2xl border p-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 md:gap-4 md:p-4"
    >
      <span
        className={cn(
          "text-primary flex size-14 shrink-0 items-center justify-center rounded-xl md:size-18",
          kategori === "JAGA_ALAM" ? "bg-brand-light" : "bg-subtle",
        )}
      >
        <Ikon nama="image" ukuran={22} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col items-start gap-1">
        <Badge nada="kategori">{LABEL_KATEGORI[kategori]}</Badge>
        <span className="text-body-medium text-text">{nama}</span>
        <span className="text-text-secondary text-xs leading-4">
          {keterangan}
        </span>
      </span>
      <span className="flex shrink-0 flex-col items-end gap-2">{samping}</span>
    </Link>
  );
}

function KerangkaMemuat() {
  return (
    <Tata>
      <div className="bg-card h-10 w-64 animate-pulse rounded-lg" aria-busy />
      <div className="bg-card h-28 animate-pulse rounded-2xl" />
      <div className="grid grid-cols-2 gap-3 md:gap-6">
        <div className="bg-card h-40 animate-pulse rounded-2xl" />
        <div className="bg-card h-40 animate-pulse rounded-2xl" />
      </div>
      <div className="bg-card h-24 animate-pulse rounded-2xl" />
    </Tata>
  );
}
