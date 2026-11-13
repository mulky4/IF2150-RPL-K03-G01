"use client";

import { useState } from "react";

import { Badge } from "~/views/components/Badge";
import { Banner } from "~/views/components/Banner";
import { Button, ButtonLink } from "~/views/components/Button";
import { EmptyState } from "~/views/components/EmptyState";

import { useKelolaPendaftarPage } from "./useKelolaPendaftarPage";

type Props = { idProgram: string };

const labelStatus = {
  MENUNGGU: "Menunggu",
  DITERIMA: "Diterima",
  DITOLAK: "Ditolak",
} as const;

export function KelolaPendaftarView({ idProgram }: Props) {
  const [konfirmasiTerbuka, setKonfirmasiTerbuka] = useState(false);
  const {
    data,
    sedangMemuat,
    galat,
    pilihan,
    setPilihan,
    perubahan,
    semuaDiputuskan,
    sedangMenyimpan,
    sedangMengumumkan,
    galatMutasi,
    berhasilSimpan,
    berhasilUmumkan,
    simpanHasil,
    umumkanHasil,
  } = useKelolaPendaftarPage(idProgram);

  const dapatMengubah =
    data?.program.status === "AKTIF" &&
    data.program.hasilSeleksiDiumumkanAt === null;
  const belumDiputuskan =
    data?.pendaftar.filter((pendaftar) => pendaftar.status === "MENUNGGU")
      .length ?? 0;
  const dapatUmumkan =
    dapatMengubah && semuaDiputuskan && !sedangMenyimpan && !sedangMengumumkan;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8">
      <ButtonLink
        varian="ghost"
        href="/inisiator/program"
        className="self-start"
      >
        Kembali ke Program Saya
      </ButtonLink>
      <header>
        <h1 className="text-h1 text-text">Kelola Pendaftar</h1>
        {data && (
          <p className="text-body text-text-secondary mt-2">
            {data.program.namaProgram} · {data.pendaftar.length} pendaftar ·
            kuota {data.program.kuota}
          </p>
        )}
      </header>

      {sedangMemuat && <Banner>Memuat daftar pendaftar...</Banner>}
      {galat && <Banner nada="error">{galat}</Banner>}
      {galatMutasi && <Banner nada="error">{galatMutasi}</Banner>}
      {berhasilSimpan && (
        <Banner nada="sukses">Keputusan seleksi berhasil disimpan.</Banner>
      )}
      {berhasilUmumkan && (
        <Banner nada="sukses">
          Hasil diumumkan. Notifikasi telah dikirim kepada seluruh pendaftar.
        </Banner>
      )}
      {data && data.program.hasilSeleksiDiumumkanAt && (
        <Banner nada="info">Hasil seleksi program ini sudah diumumkan.</Banner>
      )}
      {data && data.program.status !== "AKTIF" && (
        <Banner nada="peringatan">
          Seleksi hanya tersedia untuk program yang berstatus Aktif.
        </Banner>
      )}

      {data && data.pendaftar.length === 0 ? (
        <EmptyState
          judul="Belum ada pendaftar"
          deskripsi="Daftar pendaftar akan muncul di sini setelah relawan mengirim permohonan."
        />
      ) : (
        data &&
        data.pendaftar.length > 0 && (
          <>
            <section className="bg-card shadow-card overflow-x-auto rounded-2xl">
              <table className="w-full min-w-[42rem] text-left">
                <thead className="text-label text-text-secondary border-border border-b">
                  <tr>
                    <th className="px-4 py-3">Relawan</th>
                    <th className="px-4 py-3">Domisili</th>
                    <th className="px-4 py-3">Keterampilan</th>
                    <th className="px-4 py-3">Ketersediaan</th>
                    <th className="px-4 py-3">Keputusan</th>
                  </tr>
                </thead>
                <tbody>
                  {data.pendaftar.map((pendaftar) => (
                    <tr
                      key={pendaftar.id}
                      className="border-border border-b last:border-b-0"
                    >
                      <td className="text-body-medium text-text px-4 py-4">
                        {pendaftar.relawan.nama || pendaftar.relawan.user.name}
                      </td>
                      <td className="text-body text-text-secondary px-4 py-4">
                        {pendaftar.relawan.domisili || "—"}
                      </td>
                      <td className="text-body text-text px-4 py-4">
                        {pendaftar.keterampilan}
                      </td>
                      <td className="text-body text-text px-4 py-4">
                        {pendaftar.ketersediaanWaktu}
                      </td>
                      <td className="px-4 py-4">
                        {pendaftar.status === "MENUNGGU" && dapatMengubah ? (
                          <label>
                            <span className="sr-only">
                              Keputusan untuk {pendaftar.relawan.nama}
                            </span>
                            <select
                              className="border-border bg-card text-text min-h-11 rounded-lg border px-3"
                              value={pilihan[pendaftar.id] ?? pendaftar.status}
                              disabled={sedangMenyimpan}
                              onChange={(event) => {
                                const status = event.currentTarget.value;
                                if (
                                  status === "MENUNGGU" ||
                                  status === "DITERIMA" ||
                                  status === "DITOLAK"
                                ) {
                                  setPilihan((sebelumnya) => ({
                                    ...sebelumnya,
                                    [pendaftar.id]: status,
                                  }));
                                }
                              }}
                            >
                              {Object.entries(labelStatus).map(
                                ([status, label]) => (
                                  <option key={status} value={status}>
                                    {label}
                                  </option>
                                ),
                              )}
                            </select>
                          </label>
                        ) : (
                          <Badge
                            nada={
                              pendaftar.status === "DITERIMA"
                                ? "sukses"
                                : pendaftar.status === "DITOLAK"
                                  ? "error"
                                  : "menunggu"
                            }
                          >
                            {labelStatus[pendaftar.status]}
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <p className="text-body text-text-secondary">
              {belumDiputuskan} pendaftar masih menunggu keputusan. Keputusan
              yang diterima akan divalidasi terhadap kuota program. Keputusan
              yang sudah disimpan tidak dapat diubah.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={simpanHasil}
                disabled={
                  perubahan.length === 0 ||
                  sedangMenyimpan ||
                  !dapatMengubah
                }
              >
                {sedangMenyimpan ? "Menyimpan..." : "Simpan Keputusan"}
              </Button>
              {semuaDiputuskan && !data.program.hasilSeleksiDiumumkanAt && (
                <Button
                  varian="secondary"
                  onClick={() => setKonfirmasiTerbuka(true)}
                  disabled={!dapatUmumkan}
                >
                  Umumkan Hasil
                </Button>
              )}
            </div>
          </>
        )
      )}
      {konfirmasiTerbuka && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="judul-konfirmasi-hasil"
            aria-describedby="deskripsi-konfirmasi-hasil"
            className="bg-card shadow-card w-full max-w-md rounded-2xl p-6"
          >
            <h2 id="judul-konfirmasi-hasil" className="text-h3 text-text">
              Umumkan hasil seleksi?
            </h2>
            <p
              id="deskripsi-konfirmasi-hasil"
              className="text-body text-text-secondary mt-3"
            >
              Hasil tidak dapat diubah setelah diumumkan. Semua pendaftar akan
              menerima notifikasi.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button
                varian="secondary"
                onClick={() => setKonfirmasiTerbuka(false)}
                disabled={sedangMengumumkan}
              >
                Batal
              </Button>
              <Button
                onClick={() => {
                  umumkanHasil();
                  setKonfirmasiTerbuka(false);
                }}
                disabled={sedangMengumumkan}
              >
                {sedangMengumumkan ? "Mengumumkan..." : "Ya, umumkan"}
              </Button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
