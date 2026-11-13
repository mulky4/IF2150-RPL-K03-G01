"use client";

import { rentangWaktu } from "~/lib/waktu";

import { Badge } from "../components/Badge";
import { Banner } from "../components/Banner";
import { Button } from "../components/Button";
import { EmptyState } from "../components/EmptyState";
import { Modal } from "../components/Modal";
import { useVerifikasiProgram } from "./useVerifikasiProgram";

const LABEL_KATEGORI = {
  JAGA_ALAM: "Jaga Alam",
  JAGA_IKLIM: "Jaga Iklim",
} as const;

export function VerifikatorDashboardView() {
  const v = useVerifikasiProgram();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 md:px-8 md:py-10">
      <header className="flex flex-col gap-1">
        <h1 className="text-h3 text-text">Verifikasi Program</h1>
        <p className="text-body text-text-secondary">
          Program yang menunggu persetujuan sebelum bisa dilihat relawan.
        </p>
      </header>

      {v.pesanSukses && <Banner nada="sukses">{v.pesanSukses}</Banner>}
      {v.galatAksi && <Banner nada="error">{v.galatAksi}</Banner>}

      {v.sedangMemuat ? (
        <p className="text-body text-text-secondary">Memuat program...</p>
      ) : v.galat ? (
        <Banner nada="error">{v.galat}</Banner>
      ) : v.daftar.length === 0 ? (
        <EmptyState
          ikon="shield"
          judul="Tidak ada program yang menunggu"
          deskripsi="Semua program sudah diverifikasi. Program baru dari inisiator akan muncul di sini."
        />
      ) : (
        <ul className="flex flex-col gap-4">
          {v.daftar.map((p) => (
            <li
              key={p.id}
              className="bg-card shadow-card flex flex-col gap-4 rounded-2xl p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 flex-col gap-1">
                  <h2 className="text-h3 text-text">{p.namaProgram}</h2>
                  <p className="text-body text-text-secondary">
                    {p.namaLembaga}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge nada="kategori">{LABEL_KATEGORI[p.kategori]}</Badge>
                  <Badge nada="menunggu">Menunggu verifikasi</Badge>
                </div>
              </div>

              <dl className="text-body text-text-secondary grid gap-2 sm:grid-cols-3">
                <div>
                  <dt className="text-label text-text">Jadwal</dt>
                  <dd>{rentangWaktu(p.waktuMulai, p.waktuSelesai)}</dd>
                </div>
                <div>
                  <dt className="text-label text-text">Tempat</dt>
                  <dd>{p.tempatPelaksanaan}</dd>
                </div>
                <div>
                  <dt className="text-label text-text">Kuota</dt>
                  <dd>{p.kuota} relawan</dd>
                </div>
              </dl>

              <div className="flex flex-wrap items-center justify-between gap-3">
                {p.urlDokumenLegalitas ? (
                  <a
                    href={p.urlDokumenLegalitas}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-hover text-label underline"
                  >
                    Lihat dokumen legalitas
                  </a>
                ) : (
                  <span className="text-body text-text-secondary">
                    Dokumen legalitas belum tersedia
                  </span>
                )}
                <Button onClick={() => v.pilihProgram(p.id)}>Setujui</Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal
        terbuka={v.programTerpilih !== null}
        onTutup={v.batalPilih}
        judul="Setujui program ini?"
        aksi={
          <>
            <Button
              varian="secondary"
              onClick={v.batalPilih}
              disabled={v.sedangMenyetujui}
            >
              Batal
            </Button>
            <Button onClick={v.konfirmasiSetujui} disabled={v.sedangMenyetujui}>
              {v.sedangMenyetujui ? "Menyimpan..." : "Ya, setujui"}
            </Button>
          </>
        }
      >
        {v.programTerpilih
          ? `"${v.programTerpilih.namaProgram}" akan menjadi aktif dan inisiator akan diberi notifikasi.`
          : null}
      </Modal>
    </div>
  );
}
