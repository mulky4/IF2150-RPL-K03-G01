"use client";

import { keepPreviousData } from "@tanstack/react-query";

import { MAKS_DIMUAT } from "~/lib/pencarianProgram";
import { rentangWaktu } from "~/lib/waktu";
import { api } from "~/trpc/react";
import { Banner } from "~/views/components/Banner";
import { Button } from "~/views/components/Button";
import { Chip } from "~/views/components/Chip";
import { EmptyState } from "~/views/components/EmptyState";
import { Input } from "~/views/components/Input";
import { ProgramCard } from "~/views/components/ProgramCard";

import {
  useEksplorasiProgramPage,
  type FilterKategori,
} from "./useEksplorasiProgramPage";

const FILTER: { label: string; nilai: FilterKategori }[] = [
  { label: "Semua", nilai: null },
  { label: "Jaga Alam", nilai: "JAGA_ALAM" },
  { label: "Jaga Iklim", nilai: "JAGA_IKLIM" },
];

/** Halaman Eksplorasi Program: cari dan filter program aktif, lalu buka detailnya. */
export function Eksplorasi() {
  const {
    masukanPencarian,
    kataKunciPencarian,
    filterKategori,
    terimaInputPencarian,
    batas,
    muatLebihBanyak,
  } = useEksplorasiProgramPage();

  const {
    data: hasil,
    error,
    isPending,
    isFetching,
  } = api.program.cari.useQuery(
    { kataKunci: kataKunciPencarian, kategori: filterKategori, batas },
    { placeholderData: keepPreviousData },
  );
  const daftar = hasil?.daftar ?? [];
  const adaLagi = hasil?.adaLagi ?? false;
  const adaPencarian =
    masukanPencarian.trim() !== "" || filterKategori !== null;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:px-8 md:py-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-h2 md:text-h1 text-text">Eksplorasi Program</h1>
        <p className="text-body text-text-secondary">
          Temukan program aksi lingkungan dan bergabunglah sebagai relawan.
        </p>
      </header>

      <div className="flex flex-col gap-4">
        <Input
          label="Cari program"
          type="search"
          placeholder="Cari nama atau deskripsi program"
          value={masukanPencarian}
          onChange={(e) => terimaInputPencarian(e.target.value, filterKategori)}
        />
        <div
          role="group"
          aria-label="Filter kategori"
          className="flex flex-wrap gap-2"
        >
          {FILTER.map(({ label, nilai }) => (
            <Chip
              key={label}
              aktif={filterKategori === nilai}
              onClick={() => terimaInputPencarian(masukanPencarian, nilai)}
            >
              {label}
            </Chip>
          ))}
        </div>
      </div>

      {error ? (
        <Banner nada="error">
          Program belum bisa dimuat. Coba muat ulang halaman.
        </Banner>
      ) : isPending ? (
        <p role="status" className="text-body text-text-secondary">
          Memuat program…
        </p>
      ) : daftar.length === 0 ? (
        <EmptyState
          judul="Program tidak ditemukan"
          deskripsi="Coba kata kunci lain atau ubah filter kategori."
          aksi={
            adaPencarian ? (
              <Button onClick={() => terimaInputPencarian("", null)}>
                Lihat Semua Program
              </Button>
            ) : undefined
          }
        />
      ) : (
        <>
          <p role="status" className="text-label text-text-secondary">
            Menampilkan {daftar.length} program
          </p>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {daftar.map((program) => (
              <li key={program.idProgram} className="flex">
                <ProgramCard
                  href={`/program/${program.idProgram}`}
                  nama={program.namaProgram}
                  kategori={program.kategori}
                  lembaga={program.namaLembaga ?? "Lembaga tidak diketahui"}
                  lembagaTerverifikasi={program.lembagaTerverifikasi}
                  lokasi={program.tempatPelaksanaan}
                  tanggal={rentangWaktu(
                    program.waktuMulai,
                    program.waktuSelesai,
                  )}
                  kuota={program.kuota}
                  jumlahDiterima={program.jumlahDiterima}
                />
              </li>
            ))}
          </ul>
          {adaLagi && daftar.length < MAKS_DIMUAT && (
            <Button
              varian="secondary"
              className="self-center"
              onClick={muatLebihBanyak}
              disabled={isFetching}
            >
              {isFetching ? "Memuat…" : "Muat Lebih Banyak"}
            </Button>
          )}
          {adaLagi && daftar.length >= MAKS_DIMUAT && (
            <p className="text-body text-text-secondary text-center">
              Masih ada program lain. Persempit pencarian dengan kata kunci atau
              kategori.
            </p>
          )}
        </>
      )}
    </div>
  );
}
