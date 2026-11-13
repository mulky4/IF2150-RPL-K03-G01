"use client";

import { rentangWaktu } from "~/lib/waktu";
import { api } from "~/trpc/react";
import { Badge, type NadaBadge } from "~/views/components/Badge";
import { Button, ButtonLink } from "~/views/components/Button";
import { EmptyState } from "~/views/components/EmptyState";
import { FotoProgram } from "~/views/components/FotoProgram";
import { Ikon } from "~/views/components/Ikon";

import { useEksplorasiProgramPage } from "./useEksplorasiProgramPage";

const NADA_WAKTU: Record<string, NadaBadge> = {
  "Belum dimulai": "peringatan",
  "Sedang berlangsung": "sukses",
  "Sudah selesai": "menunggu",
};

/**
 * I-05 Detail Program (C16 EksplorasiProgramPage), UC04, KF02.
 * Tombol situs resmi aktif kalau tautan valid; kalau tidak, dinonaktifkan
 * (Algo-C16-09 nonaktifkanTautan()).
 * Program SELESAI menampilkan capaian dari LaporanProgram.showSummary() dan
 * showDokumentasi() (UC07 langkah 3).
 */
export function DetailProgram({ idProgram }: { idProgram: string }) {
  const { klikTautanSitusResmi } = useEksplorasiProgramPage();
  const {
    data: program,
    error,
    isPending,
  } = api.program.detail.useQuery(
    { idProgram },
    // Program yang tidak ada tidak perlu dicoba ulang; langsung tampilkan "tidak ditemukan".
    { retry: false },
  );

  if (isPending && !error) {
    return (
      <p role="status" className="text-body text-text-secondary px-4 py-10">
        Memuat program…
      </p>
    );
  }

  if (error ?? !program) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <EmptyState
          judul="Program tidak ditemukan"
          deskripsi="Program yang kamu cari tidak ada atau belum dibuka."
          aksi={<ButtonLink href="/program">Kembali ke Eksplorasi</ButtonLink>}
        />
      </div>
    );
  }

  const bisaDaftar =
    program.status === "AKTIF" &&
    program.kuotaTersedia &&
    program.keteranganWaktu !== "Sudah selesai";
  const labelDaftar = !program.kuotaTersedia
    ? "Kuota Penuh"
    : bisaDaftar
      ? "Daftar Program"
      : "Pendaftaran Ditutup";
  const sisa = Math.max(program.kuota - program.jumlahDiterima, 0);

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 md:py-10">
      <ButtonLink href="/program" varian="ghost" className="self-start">
        <Ikon nama="back" ukuran={20} />
        Kembali ke Eksplorasi
      </ButtonLink>

      <div className="bg-card shadow-card overflow-hidden rounded-2xl">
        <FotoProgram kategori={program.kategori} />
        <div className="flex flex-col gap-4 p-5 md:p-8">
          <div className="flex flex-wrap gap-2">
            <Badge nada="kategori">
              {program.kategori === "JAGA_ALAM" ? "Jaga Alam" : "Jaga Iklim"}
            </Badge>
            <Badge nada={NADA_WAKTU[program.keteranganWaktu] ?? "menunggu"}>
              {program.keteranganWaktu}
            </Badge>
          </div>

          <h1 className="text-h2 md:text-h1 text-text">
            {program.namaProgram}
          </h1>
          <p className="text-label text-text-secondary flex items-center gap-1.5">
            {program.namaLembaga ?? "Lembaga tidak diketahui"}
            {program.lembagaTerverifikasi && (
              <Ikon
                nama="shield"
                ukuran={16}
                className="text-primary"
                label="Lembaga terverifikasi"
              />
            )}
          </p>

          <dl className="text-body text-text flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <dt className="sr-only">Lokasi</dt>
              <Ikon nama="pin" ukuran={20} className="text-primary" />
              <dd>{program.tempatPelaksanaan}</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="sr-only">Waktu pelaksanaan</dt>
              <Ikon nama="calendar" ukuran={20} className="text-primary" />
              <dd>{rentangWaktu(program.waktuMulai, program.waktuSelesai)}</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="sr-only">Kuota relawan</dt>
              <Ikon nama="users" ukuran={20} className="text-primary" />
              <dd>
                {program.jumlahDiterima}/{program.kuota} relawan
                {" · "}
                {sisa > 0 ? `${sisa} kuota tersisa` : "Kuota penuh"}
              </dd>
            </div>
          </dl>

          <section className="flex flex-col gap-1.5">
            <h2 className="text-h3 text-text">Deskripsi</h2>
            <p className="text-body text-text-secondary whitespace-pre-line">
              {program.deskripsi}
            </p>
          </section>

          <section className="flex flex-col gap-1.5">
            <h2 className="text-h3 text-text">Syarat dan Ketentuan</h2>
            <p className="text-body text-text-secondary whitespace-pre-line">
              {program.syaratKetentuan}
            </p>
          </section>

          {program.capaian && (
            <section
              aria-labelledby="judul-capaian"
              className="bg-subtle flex flex-col gap-2 rounded-xl p-4"
            >
              <h2 id="judul-capaian" className="text-h3 text-text">
                Capaian Program
              </h2>
              <p className="text-body text-text-secondary whitespace-pre-line">
                {program.capaian.ringkasan}
              </p>
              {program.capaian.dokumentasi.length > 0 && (
                <ul className="text-label flex flex-col gap-1">
                  {program.capaian.dokumentasi.map((url, i) => (
                    <li key={url}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                      >
                        Dokumentasi {i + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <ButtonLink
              href={`/program/${program.idProgram}/daftar`}
              nonaktif={!bisaDaftar}
              lebarPenuh
            >
              {labelDaftar}
            </ButtonLink>

            {program.tautanSitusResmi ? (
              <Button
                varian="secondary"
                lebarPenuh
                onClick={() => klikTautanSitusResmi(program.tautanSitusResmi)}
              >
                Kunjungi Situs Resmi
              </Button>
            ) : (
              <Button
                varian="secondary"
                lebarPenuh
                disabled
                title="Lembaga ini belum mencantumkan situs resmi"
              >
                Situs Resmi Tidak Tersedia
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
