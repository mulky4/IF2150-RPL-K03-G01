"use client";

import { Badge } from "~/views/components/Badge";
import { Banner } from "~/views/components/Banner";
import { Button, ButtonLink } from "~/views/components/Button";
import { Chip } from "~/views/components/Chip";
import { EmptyState } from "~/views/components/EmptyState";
import {
  FILTER_PROGRAM,
  aksiProgram,
  labelKategori,
  labelStatus,
  nadaStatus,
  persenKuota,
} from "~/lib/programSaya";
import { tanggal } from "~/lib/waktu";

import { useProgramSaya } from "./useProgramSaya";

const HREF_DAFTAR_BARU = "/inisiator/program/baru";
const HREF_UNGGAH_LAPORAN = "/laporan"; // I-09
// I-11 milik Modul 3. Sesuaikan kalau rutenya berbeda.
// Ubah ke true setelah halaman I-11 ada (sementara 404).
const HALAMAN_KELOLA_PENDAFTAR_ADA = false;
const hrefKelolaPendaftar = (id: string) =>
  `/inisiator/program/${id}/pendaftar`;

const formatTanggal = (nilai: Date | string) => tanggal(new Date(nilai));

function KartuStatistik({ label, nilai }: { label: string; nilai: number }) {
  return (
    <div className="bg-card shadow-card rounded-2xl p-5">
      <p className="text-label text-text-secondary">{label}</p>
      <p className="text-h2 text-text mt-1">{nilai}</p>
    </div>
  );
}

function BarKuota({ diterima, kuota }: { diterima: number; kuota: number }) {
  const persen = persenKuota(diterima, kuota);
  return (
    <div className="min-w-32">
      <p className="text-body text-text">
        {diterima}/{kuota}
      </p>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={persen}
        aria-label="Kuota terisi"
        className="bg-subtle mt-1 h-2 overflow-hidden rounded-full"
      >
        <div className="bg-primary h-full" style={{ width: `${persen}%` }} />
      </div>
    </div>
  );
}

export function ProgramSayaView() {
  const { data, daftar, filter, setFilter, sedangMemuat, galat } =
    useProgramSaya();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-h1 text-text">Program Saya</h1>
          {data && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-body text-text-secondary">
                {data.lembaga.namaLembaga}
              </span>
              {data.lembaga.statusVerifikasi === "TERVERIFIKASI" ? (
                <Badge nada="sukses">Terverifikasi</Badge>
              ) : (
                <Badge nada="menunggu">Belum Terverifikasi</Badge>
              )}
            </div>
          )}
        </div>
        <ButtonLink href={HREF_DAFTAR_BARU}>
          + Daftarkan Program Baru
        </ButtonLink>
      </div>

      {sedangMemuat && <Banner nada="info">Memuat program...</Banner>}
      {galat && <Banner nada="error">{galat}</Banner>}

      {data && (
        <>
          <section className="grid gap-4 sm:grid-cols-3">
            <KartuStatistik
              label="Program aktif"
              nilai={data.statistik.programAktif}
            />
            <KartuStatistik
              label="Pendaftar menunggu seleksi"
              nilai={data.statistik.pendaftarMenunggu}
            />
            <KartuStatistik
              label="Laporan perlu revisi"
              nilai={data.statistik.laporanPerluRevisi}
            />
          </section>

          {data.program.length === 0 ? (
            <EmptyState
              judul="Belum ada program"
              deskripsi="Daftarkan program pertama lembagamu agar relawan bisa bergabung."
              aksi={
                <ButtonLink href={HREF_DAFTAR_BARU}>
                  + Daftarkan Program Baru
                </ButtonLink>
              }
            />
          ) : (
            <>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Filter status"
              >
                {FILTER_PROGRAM.map((f) => (
                  <Chip
                    key={f.nilai}
                    aktif={filter === f.nilai}
                    onClick={() => setFilter(f.nilai)}
                  >
                    {f.label}
                  </Chip>
                ))}
              </div>

              {daftar.length === 0 ? (
                <EmptyState
                  judul="Tidak ada program"
                  deskripsi="Belum ada program dengan status ini."
                  ikon="search"
                  aksi={
                    <Button
                      varian="secondary"
                      onClick={() => setFilter("SEMUA")}
                    >
                      Tampilkan Semua
                    </Button>
                  }
                />
              ) : (
                <div className="bg-card shadow-card overflow-x-auto rounded-2xl">
                  <table className="w-full min-w-[56rem] text-left">
                    <thead className="text-label text-text-secondary border-border border-b">
                      <tr>
                        <th className="px-4 py-3">Nama Program</th>
                        <th className="px-4 py-3">Kategori</th>
                        <th className="px-4 py-3">Jadwal</th>
                        <th className="px-4 py-3">Diterima/Kuota</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {daftar.map((p) => {
                        const aksi = aksiProgram(p.status);
                        return (
                          <tr
                            key={p.id}
                            className="border-border border-b last:border-b-0"
                          >
                            <td className="text-body-medium text-text px-4 py-4">
                              {p.namaProgram}
                            </td>
                            <td className="px-4 py-4">
                              <Badge nada="kategori">
                                {labelKategori(p.kategori)}
                              </Badge>
                            </td>
                            <td className="text-body text-text px-4 py-4">
                              {formatTanggal(p.waktuMulai)}
                            </td>
                            <td className="px-4 py-4">
                              <BarKuota diterima={p.diterima} kuota={p.kuota} />
                            </td>
                            <td className="px-4 py-4">
                              <Badge nada={nadaStatus(p.status)}>
                                {labelStatus(p.status)}
                              </Badge>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex flex-wrap gap-2">
                                <ButtonLink
                                  varian="secondary"
                                  href={hrefKelolaPendaftar(p.id)}
                                  nonaktif={
                                    !HALAMAN_KELOLA_PENDAFTAR_ADA ||
                                    !aksi.kelolaPendaftarAktif
                                  }
                                >
                                  Kelola Pendaftar
                                </ButtonLink>
                                {aksi.laporan && (
                                  <ButtonLink
                                    varian="ghost"
                                    href={HREF_UNGGAH_LAPORAN}
                                    nonaktif={!aksi.laporan.aktif}
                                  >
                                    {aksi.laporan.teks}
                                  </ButtonLink>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
}
