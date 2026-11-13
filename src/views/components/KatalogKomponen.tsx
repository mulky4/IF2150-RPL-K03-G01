"use client";

import { useState, type ReactNode } from "react";

import { Badge } from "./Badge";
import { Banner } from "./Banner";
import { Button, ButtonLink } from "./Button";
import { Chip } from "./Chip";
import { EmptyState } from "./EmptyState";
import { FileDropzone } from "./FileDropzone";
import { Input } from "./Input";
import { Logo } from "./Logo";
import { Modal } from "./Modal";
import { NotifikasiItem } from "./NotifikasiItem";
import { PasswordInput } from "./PasswordInput";
import { ProgramCard } from "./ProgramCard";
import { Select } from "./Select";
import { TextArea } from "./TextArea";

/** Halaman contoh semua komponen, bisa dibuka di /design-system. */
export function KatalogKomponen() {
  const [chip, setChip] = useState("Semua");
  const [modal, setModal] = useState(false);
  const [berkas, setBerkas] = useState<string[]>([]);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-8 md:px-6">
      <h1 className="text-h1">Design System — RekanBumi</h1>

      <Bagian judul="Logo">
        <Logo />
        <span className="bg-primary-hover rounded-lg p-2">
          <Logo warna="putih" />
        </span>
        <Logo bentuk="ikon" />
      </Bagian>

      <Bagian judul="Tipografi" kolom>
        <p className="text-h1">H1 — Jaga Bumi, Mulai dari Sekarang.</p>
        <p className="text-h2">H2 — Jaga Bumi, Mulai dari Sekarang.</p>
        <p className="text-h3">H3 — Jaga Bumi, Mulai dari Sekarang.</p>
        <p className="text-body">Body — Jaga Bumi, Mulai dari Sekarang.</p>
        <p className="text-body-medium">
          Body Medium — Jaga Bumi, Mulai dari Sekarang.
        </p>
        <p className="text-label">Label — Jaga Bumi, Mulai dari Sekarang.</p>
        <p className="text-caption text-text-secondary">
          Caption — Jaga Bumi, Mulai dari Sekarang.
        </p>
        <p className="text-stat text-primary">128 jam</p>
      </Bagian>

      <Bagian judul="Button">
        <Button>Primary</Button>
        <Button varian="secondary">Secondary</Button>
        <Button varian="danger">Danger</Button>
        <Button varian="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
        <Button varian="secondary" disabled>
          Disabled
        </Button>
        <ButtonLink href="/program" varian="secondary">
          Link
        </ButtonLink>
      </Bagian>

      <Bagian judul="Badge Status">
        <Badge nada="sukses">Diterima</Badge>
        <Badge nada="peringatan">Akan datang</Badge>
        <Badge nada="error">Ditolak</Badge>
        <Badge nada="menunggu">Menunggu</Badge>
        <Badge nada="kategori">Jaga Alam</Badge>
      </Bagian>

      <Bagian judul="Chip Filter">
        {["Semua", "Jaga Alam", "Jaga Iklim"].map((c) => (
          <Chip key={c} aktif={chip === c} onClick={() => setChip(c)}>
            {c}
          </Chip>
        ))}
      </Bagian>

      <Bagian judul="Input" grid>
        <Input
          label="Nama lengkap"
          placeholder="Rani Pratiwi"
          bantuan="Sesuai KTP"
        />
        <Input
          label="Email"
          placeholder="nama@email.com"
          error="Email wajib diisi"
        />
        <Input label="Disabled" placeholder="Tidak bisa diubah" disabled />
        <PasswordInput label="Kata sandi" placeholder="Minimal 8 karakter" />
        <TextArea label="Keterampilan" placeholder="Ceritakan keterampilanmu" />
        <Select
          label="Kategori"
          placeholder="Pilih kategori"
          opsi={[
            { nilai: "JAGA_ALAM", label: "Jaga Alam" },
            { nilai: "JAGA_IKLIM", label: "Jaga Iklim" },
          ]}
        />
      </Bagian>

      <Bagian judul="File Upload" grid>
        <FileDropzone
          label="Unggah dokumen"
          bantuan="PDF, JPG, atau PNG · maksimal 2 MB"
          accept=".pdf,.jpg,.jpeg,.png"
          namaBerkas={berkas}
          onPilihBerkas={(daftar) => setBerkas(daftar.map((f) => f.name))}
        />
      </Bagian>

      <Bagian judul="Banner / Toast" kolom>
        <Banner nada="sukses">Check-in berhasil dicatat.</Banner>
        <Banner nada="peringatan">
          Check-in hanya dapat dilakukan pada 07.00–12.00 WIB.
        </Banner>
        <Banner nada="error">Kuota program sudah penuh.</Banner>
        <Banner nada="info">Notifikasi diperbarui saat menu dibuka.</Banner>
      </Bagian>

      <Bagian judul="Program Card" grid>
        <ProgramCard
          href="/program"
          nama="Tanam Mangrove Pantai Indah"
          kategori="JAGA_ALAM"
          lembaga="Yayasan Hijau Lestari"
          lembagaTerverifikasi
          lokasi="Jakarta Utara"
          tanggal="15 Nov 2026 · 07.00–12.00 WIB"
          kuota={30}
          jumlahDiterima={18}
        />
        <ProgramCard
          href="/program"
          nama="Bersih Sungai Cikapundung"
          kategori="JAGA_IKLIM"
          lembaga="Komunitas Sungai Bersih"
          lokasi="Bandung"
          tanggal="20 Nov 2026 · 08.00–11.00 WIB"
          kuota={20}
          jumlahDiterima={20}
        />
      </Bagian>

      <Bagian judul="Item Notifikasi" kolom>
        <NotifikasiItem
          pesan="Pendaftaranmu diterima."
          waktu="2 jam lalu"
          dibaca={false}
        />
        <NotifikasiItem pesan="Program sudah selesai." waktu="Kemarin" dibaca />
      </Bagian>

      <Bagian judul="Modal & Empty State" kolom>
        <div>
          <Button varian="secondary" onClick={() => setModal(true)}>
            Buka modal
          </Button>
        </div>
        <EmptyState
          judul="Belum ada riwayat"
          deskripsi="Ikuti program dan check-in untuk mulai mengumpulkan jam aksi."
          ikon="award"
          aksi={<ButtonLink href="/program">Cari Program</ButtonLink>}
        />
      </Bagian>

      <Modal
        terbuka={modal}
        onTutup={() => setModal(false)}
        judul="Setujui laporan akhir?"
        aksi={
          <>
            <Button varian="secondary" onClick={() => setModal(false)}>
              Batal
            </Button>
            <Button onClick={() => setModal(false)}>Ya, Setujui</Button>
          </>
        }
      >
        Status program akan menjadi Selesai.
      </Modal>
    </div>
  );
}

function Bagian({
  judul,
  children,
  kolom,
  grid,
}: {
  judul: string;
  children: ReactNode;
  kolom?: boolean;
  grid?: boolean;
}) {
  const tata = grid
    ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    : kolom
      ? "flex flex-col gap-3"
      : "flex flex-wrap items-center gap-3";
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-h2">{judul}</h2>
      <div className={tata}>{children}</div>
    </section>
  );
}
