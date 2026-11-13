"use client";

import { labelKategori } from "~/lib/programSaya";
import { rentangWaktu } from "~/lib/waktu";
import { Badge } from "~/views/components/Badge";
import { Banner } from "~/views/components/Banner";
import { Button } from "~/views/components/Button";
import { EmptyState } from "~/views/components/EmptyState";
import { Modal } from "~/views/components/Modal";

import { useDashboardVerifikator } from "./useDashboardVerifikator";

export function DashboardVerifikator() {
  const v = useDashboardVerifikator();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-h1 text-text">Verifikasi Program</h1>
        <p className="text-body text-text-secondary">
          Program yang menunggu persetujuan sebelum bisa dilihat relawan.
        </p>
      </header>

      {v.pesanSukses && <Banner nada="sukses">{v.pesanSukses}</Banner>}
      {v.galatAksi && <Banner nada="error">{v.galatAksi}</Banner>}

      {v.sedangMemuat ? (
        <Banner nada="info">Memuat program...</Banner>
      ) : v.galat ? (
        <Banner nada="error">{v.galat}</Banner>
      ) : v.daftar.length === 0 ? (
        <EmptyState
          ikon="shield"
          judul="Tidak ada program yang menunggu"
          deskripsi="Semua program sudah diverifikasi. Program baru dari inisiator akan muncul di sini."
        />
      ) : (
        <>
          <div className="bg-card shadow-card overflow-x-auto rounded-2xl">
            <table className="w-full min-w-[56rem] text-left">
              <thead className="text-label text-text-secondary border-border border-b">
                <tr>
                  <th className="px-4 py-3">Program</th>
                  <th className="px-4 py-3">Lembaga</th>
                  <th className="px-4 py-3">Kategori</th>
                  <th className="px-4 py-3">Jadwal</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {v.daftar.map((p) => (
                  <tr
                    key={p.id}
                    className="border-border border-b last:border-b-0"
                  >
                    <td className="px-4 py-4">
                      <p className="text-body-medium text-text">
                        {p.namaProgram}
                      </p>
                      <p className="text-body text-text-secondary">
                        Kuota {p.kuota} relawan
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-body text-text">{p.namaLembaga}</p>
                      {p.urlDokumenLegalitas ? (
                        <a
                          href={p.urlDokumenLegalitas}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-hover text-label underline"
                        >
                          Dokumen legalitas
                        </a>
                      ) : (
                        <p className="text-body text-text-secondary">
                          Dokumen belum tersedia
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <Badge nada="kategori">{labelKategori(p.kategori)}</Badge>
                    </td>
                    <td className="text-body text-text px-4 py-4">
                      {rentangWaktu(
                        new Date(p.waktuMulai),
                        new Date(p.waktuSelesai),
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <Badge nada="menunggu">Menunggu verifikasi</Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Button onClick={() => v.pilihProgram(p.id)}>
                        Setujui
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-body text-text-secondary">
            Dokumen legalitas terhubung ke lembaga, bukan ke program, jadi
            program dari lembaga yang sama menampilkan dokumen yang sama.
          </p>
        </>
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
