"use client";

import { useState } from "react";

import { waktuLengkap, waktuRelatif } from "~/lib/waktu";
import { Banner } from "~/views/components/Banner";
import { Button } from "~/views/components/Button";
import { EmptyState } from "~/views/components/EmptyState";
import { Ikon } from "~/views/components/Ikon";
import { NotifikasiItem } from "~/views/components/NotifikasiItem";

import { useNotifikasiPage } from "./useKelolaAkunPage";

type Terpilih = { id: string; pesan: string; waktuKirim: Date };

/** I-03 Notifikasi (C12 KelolaAkunPage). */
export function Notifikasi() {
  const {
    daftar,
    sedangMemuat,
    galatMemuat,
    muatUlang,
    pilihNotifikasi,
    galatMembuka,
  } = useNotifikasiPage();
  const [terpilih, setTerpilih] = useState<Terpilih | null>(null);

  const belumDibaca = daftar?.filter((n) => !n.statusDibaca).length ?? 0;

  async function buka(id: string) {
    try {
      const hasil = await pilihNotifikasi(id);
      setTerpilih({
        id: hasil.idNotifikasi,
        pesan: hasil.detail,
        waktuKirim: hasil.waktuKirim,
      });
    } catch {
      // pesan galat ditampilkan lewat galatMembuka
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-h1 text-text">Notifikasi</h1>
        {daftar && daftar.length > 0 && (
          <p className="text-body text-text-secondary">
            {belumDibaca > 0
              ? `${belumDibaca} notifikasi belum dibaca`
              : "Semua notifikasi sudah dibaca"}
          </p>
        )}
      </header>

      {galatMemuat.length > 0 && (
        <Banner nada="error">
          <span>{galatMemuat.join(". ")} </span>
          <Button varian="ghost" onClick={muatUlang}>
            Coba lagi
          </Button>
        </Banner>
      )}
      {galatMembuka.length > 0 && (
        <Banner nada="error">{galatMembuka.join(". ")}</Banner>
      )}

      {sedangMemuat ? (
        <p className="text-body text-text-secondary" role="status">
          Memuat notifikasi…
        </p>
      ) : daftar && daftar.length === 0 ? (
        <EmptyState
          ikon="bell"
          judul="Belum ada notifikasi"
          deskripsi="Kabar tentang pendaftaran dan kegiatanmu akan muncul di sini."
        />
      ) : daftar ? (
        <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <ul className="bg-card shadow-card flex flex-col gap-1 rounded-2xl p-2">
            {daftar.map((n) => (
              <li key={n.idNotifikasi}>
                <NotifikasiItem
                  pesan={n.pesan}
                  waktu={waktuRelatif(n.waktuKirim)}
                  dibaca={n.statusDibaca}
                  onClick={() => void buka(n.idNotifikasi)}
                />
              </li>
            ))}
          </ul>

          <section
            aria-label="Detail notifikasi"
            className="bg-card shadow-card rounded-2xl p-6 md:sticky md:top-24 md:self-start"
          >
            {terpilih ? (
              <div className="flex flex-col gap-3">
                <h2 className="text-h3 text-text">Detail notifikasi</h2>
                <p className="text-caption text-text-secondary flex items-center gap-2">
                  <Ikon nama="calendar" ukuran={16} />
                  {waktuLengkap(terpilih.waktuKirim)}
                </p>
                <p className="text-body text-text">{terpilih.pesan}</p>
              </div>
            ) : (
              <p className="text-body text-text-secondary">
                Pilih notifikasi untuk melihat detailnya.
              </p>
            )}
          </section>
        </div>
      ) : null}
    </div>
  );
}
