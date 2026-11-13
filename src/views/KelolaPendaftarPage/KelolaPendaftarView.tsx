"use client";

import { useState } from "react";

import { Badge } from "~/views/components/Badge";
import { Banner } from "~/views/components/Banner";
import { Button, ButtonLink } from "~/views/components/Button";
import { Chip } from "~/views/components/Chip";
import { EmptyState } from "~/views/components/EmptyState";
import { Modal } from "~/views/components/Modal";
import { Select } from "~/views/components/Select";

import { useKelolaPendaftarPage } from "./useKelolaPendaftarPage";

type Props = { idProgram: string };

const labelStatus = {
  MENUNGGU: "Menunggu",
  DITERIMA: "Diterima",
  DITOLAK: "Ditolak",
} as const;

const opsiStatus = [
  { nilai: "MENUNGGU", label: "Menunggu" },
  { nilai: "DITERIMA", label: "Terima" },
  { nilai: "DITOLAK", label: "Tolak" },
];

const opsiFilter = [
  { nilai: "SEMUA", label: "Semua" },
  { nilai: "MENUNGGU", label: "Menunggu" },
  { nilai: "DITERIMA", label: "Diterima" },
  { nilai: "DITOLAK", label: "Ditolak" },
] as const;

const formatWaktuDaftar = (waktu: Date | string) =>
  new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(new Date(waktu));

export function KelolaPendaftarView({ idProgram }: Props) {
  const [konfirmasiTerbuka, setKonfirmasiTerbuka] = useState(false);
  const [filter, setFilter] =
    useState<(typeof opsiFilter)[number]["nilai"]>("SEMUA");
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

  const dapatMengubah = data?.program.status === "AKTIF";
  const belumDiputuskan =
    data?.pendaftar.filter((pendaftar) => pendaftar.status === "MENUNGGU")
      .length ?? 0;
  const dapatUmumkan =
    dapatMengubah &&
    semuaDiputuskan &&
    data?.pendaftar.some(
      (pendaftar) =>
        pendaftar.status !== "MENUNGGU" &&
        pendaftar.notifikasiTerkirimAt === null,
    ) === true &&
    !sedangMenyimpan &&
    !sedangMengumumkan;
  const jumlahDiterima =
    data?.pendaftar.filter(
      (pendaftar) =>
        (pendaftar.status === "MENUNGGU"
          ? pilihan[pendaftar.id]
          : pendaftar.status) === "DITERIMA",
    ).length ?? 0;
  const persenKuota = data
    ? Math.min(100, Math.round((jumlahDiterima / data.program.kuota) * 100))
    : 0;
  const pendaftarTerfilter =
    data?.pendaftar.filter((pendaftar) => {
      if (filter === "SEMUA") return true;
      return (
        (pendaftar.status === "MENUNGGU"
          ? pilihan[pendaftar.id]
          : pendaftar.status) === filter
      );
    }) ?? [];

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
          <div className="text-body text-text-secondary mt-2 flex flex-wrap gap-x-2">
            <span>{data.program.namaProgram}</span>
            <span aria-hidden="true">·</span>
            <span>{data.pendaftar.length} pendaftar</span>
          </div>
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
          Notifikasi hasil seleksi dikirim kepada pendaftar yang belum pernah
          menerimanya.
        </Banner>
      )}
      {data && data.program.status !== "AKTIF" && (
        <Banner nada="peringatan">
          Seleksi hanya tersedia untuk program yang berstatus Aktif.
        </Banner>
      )}
      {data && (
        <section
          aria-label="Penggunaan kuota"
          className="bg-card shadow-card flex flex-col gap-3 rounded-2xl p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-h3 text-text">Kuota diterima</h2>
            <span className="text-body-medium text-text">
              {jumlahDiterima}/{data.program.kuota}
            </span>
          </div>
          <div
            role="progressbar"
            aria-label="Kuota diterima"
            aria-valuemin={0}
            aria-valuemax={data.program.kuota}
            aria-valuenow={Math.min(jumlahDiterima, data.program.kuota)}
            className="bg-subtle h-2 overflow-hidden rounded-full"
          >
            <div
              className="bg-primary h-full rounded-full transition-[width]"
              style={{ width: `${persenKuota}%` }}
            />
          </div>
          <p className="text-caption text-text-secondary">
            Termasuk keputusan yang belum disimpan.
          </p>
        </section>
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
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter status pendaftar"
            >
              {opsiFilter.map((opsi) => (
                <Chip
                  key={opsi.nilai}
                  aktif={filter === opsi.nilai}
                  onClick={() => setFilter(opsi.nilai)}
                >
                  {opsi.label}
                </Chip>
              ))}
            </div>
            {pendaftarTerfilter.length === 0 ? (
              <EmptyState
                judul="Tidak ada pendaftar"
                deskripsi="Tidak ada pendaftar dengan status ini."
                ikon="search"
                aksi={
                  <Button varian="secondary" onClick={() => setFilter("SEMUA")}>
                    Tampilkan Semua
                  </Button>
                }
              />
            ) : (
              <section className="bg-card shadow-card overflow-x-auto rounded-2xl">
                <table className="w-full min-w-[58rem] text-left">
                  <thead className="text-label text-text-secondary border-border border-b">
                    <tr>
                      <th className="px-4 py-3">Relawan</th>
                      <th className="px-4 py-3">Tanggal Daftar</th>
                      <th className="px-4 py-3">Domisili</th>
                      <th className="px-4 py-3">Keterampilan</th>
                      <th className="px-4 py-3">Ketersediaan</th>
                      <th className="px-4 py-3">Keputusan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendaftarTerfilter.map((pendaftar) => (
                      <tr
                        key={pendaftar.id}
                        className="border-border border-b last:border-b-0"
                      >
                        <td className="text-body-medium text-text px-4 py-4">
                          {pendaftar.relawan.nama ||
                            pendaftar.relawan.user.name}
                        </td>
                        <td className="text-body text-text-secondary px-4 py-4">
                          {formatWaktuDaftar(pendaftar.waktuDaftar)}
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
                            <Select
                              label={`Keputusan untuk ${pendaftar.relawan.nama}`}
                              className="min-w-36"
                              opsi={opsiStatus}
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
                            />
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
            )}

            {belumDiputuskan > 0 && (
              <Banner nada="peringatan">
                Masih ada {belumDiputuskan} pendaftar yang belum diputuskan.
                Putuskan semuanya sebelum mengumumkan hasil. Keputusan yang
                diterima akan divalidasi terhadap kuota program.
              </Banner>
            )}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={simpanHasil}
                disabled={
                  perubahan.length === 0 || sedangMenyimpan || !dapatMengubah
                }
              >
                {sedangMenyimpan ? "Menyimpan..." : "Simpan Hasil Seleksi"}
              </Button>
              {semuaDiputuskan &&
                data.pendaftar.some(
                  (pendaftar) =>
                    pendaftar.status !== "MENUNGGU" &&
                    pendaftar.notifikasiTerkirimAt === null,
                ) && (
                  <Button
                    varian="secondary"
                    onClick={() => setKonfirmasiTerbuka(true)}
                    disabled={!dapatUmumkan}
                  >
                    Konfirmasi & Kirim Notifikasi
                  </Button>
                )}
            </div>
          </>
        )
      )}
      <Modal
        terbuka={konfirmasiTerbuka}
        onTutup={() => setKonfirmasiTerbuka(false)}
        judul="Konfirmasi hasil seleksi"
        aksi={
          <>
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
              {sedangMengumumkan
                ? "Mengirim notifikasi..."
                : "Konfirmasi & Kirim Notifikasi"}
            </Button>
          </>
        }
      >
        Semua pendaftar harus sudah diputuskan. Notifikasi hanya dikirim kepada
        pendaftar yang belum pernah menerima hasil.
      </Modal>
    </main>
  );
}
