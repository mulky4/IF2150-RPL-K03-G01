"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { cn } from "~/lib/cn";
import { Banner } from "~/views/components/Banner";
import { Button, ButtonLink } from "~/views/components/Button";
import { FileDropzone } from "~/views/components/FileDropzone";
import { Input } from "~/views/components/Input";
import { Logo } from "~/views/components/Logo";
import { PasswordInput } from "~/views/components/PasswordInput";
import { Select } from "~/views/components/Select";

import { DAFTAR_DOMISILI } from "./daftarDomisili";
import { useKelolaAkunPage } from "./useKelolaAkunPage";

type Peran = "RELAWAN" | "INISIATOR";

const PILIHAN_PERAN: { nilai: Peran; label: string }[] = [
  { nilai: "RELAWAN", label: "Relawan" },
  { nilai: "INISIATOR", label: "Inisiator" },
];

const POIN_PROMO = [
  "Temukan program lingkungan di dekatmu",
  "Daftar dan pantau kegiatanmu di satu tempat",
  "Dapatkan sertifikat setelah kegiatan selesai",
];

type Isian = {
  nama: string;
  namaLembaga: string;
  email: string;
  kataSandi: string;
  noTelepon: string;
  domisili: string;
  domisiliLain: string;
  tautanSitusResmi: string;
  setuju: boolean;
};

const ISIAN_AWAL: Isian = {
  nama: "",
  namaLembaga: "",
  email: "",
  kataSandi: "",
  noTelepon: "",
  domisili: "",
  domisiliLain: "",
  tautanSitusResmi: "",
  setuju: false,
};

/** I-01 Registrasi (C12 KelolaAkunPage). */
export function Registrasi() {
  const { kirimPendaftaran, pesanError, sedangMengirim } = useKelolaAkunPage();
  const [peran, setPeran] = useState<Peran>("RELAWAN");
  const [isian, setIsian] = useState<Isian>(ISIAN_AWAL);
  const [berkas, setBerkas] = useState<File | null>(null);
  const [berhasil, setBerhasil] = useState(false);

  const ubah =
    <K extends keyof Isian>(kunci: K) =>
    (nilai: Isian[K]) =>
      setIsian((lama) => ({ ...lama, [kunci]: nilai }));
  const relawan = peran === "RELAWAN";

  async function kirim(e: FormEvent) {
    e.preventDefault();
    const formulir = new FormData();
    formulir.set("peran", peran);
    formulir.set("email", isian.email);
    formulir.set("kataSandi", isian.kataSandi);
    formulir.set("noTelepon", isian.noTelepon);
    if (relawan) {
      formulir.set("nama", isian.nama);
      formulir.set(
        "domisili",
        isian.domisili === "Lainnya" && isian.domisiliLain.trim()
          ? isian.domisiliLain
          : isian.domisili,
      );
      formulir.set("jenisDokumen", "Kartu identitas");
      if (berkas) formulir.set("berkas", berkas);
    } else {
      formulir.set("nama", isian.nama);
      formulir.set("namaLembaga", isian.namaLembaga);
      if (isian.tautanSitusResmi) {
        formulir.set("tautanSitusResmi", isian.tautanSitusResmi);
      }
    }
    if (await kirimPendaftaran(formulir)) setBerhasil(true);
  }

  return (
    <div className="mx-auto grid min-h-[calc(100dvh-4.5rem)] w-full max-w-6xl gap-6 px-4 py-8 lg:grid-cols-2 lg:py-12">
      <aside className="bg-primary text-on-primary hidden flex-col justify-between gap-10 rounded-2xl p-10 lg:flex">
        <Logo warna="putih" />
        <div className="flex flex-col gap-6">
          <h2 className="text-h1">Satu aksi kecil, dampak besar untuk bumi.</h2>
          <ul className="flex flex-col gap-3">
            {POIN_PROMO.map((poin) => (
              <li key={poin} className="text-body flex items-start gap-3">
                <span aria-hidden className="mt-0.5">
                  ✓
                </span>
                {poin}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <section className="bg-card shadow-card flex flex-col gap-6 rounded-2xl p-6 md:p-8">
        {berhasil ? (
          <div className="flex flex-col gap-5">
            <Banner nada="sukses">Akun berhasil dibuat.</Banner>
            <p className="text-body text-text-secondary">
              Tautan verifikasi email untuk {isian.email} sudah dibuat
              (sementara dicetak di terminal server, belum dikirim lewat
              surel). Kamu sudah bisa masuk untuk mulai memakai RekanBumi.
            </p>
            <ButtonLink href="/login" lebarPenuh>
              Lanjut ke halaman masuk
            </ButtonLink>
          </div>
        ) : (
          <form onSubmit={kirim} noValidate className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h1 className="text-h2 text-text">Buat Akun</h1>
              <p className="text-body text-text-secondary">
                Pilih jenis akun, lalu lengkapi data dirimu.
              </p>
            </div>

            <div
              role="radiogroup"
              aria-label="Jenis akun"
              className="bg-subtle grid grid-cols-2 gap-1 rounded-xl p-1"
            >
              {PILIHAN_PERAN.map((p) => (
                <button
                  key={p.nilai}
                  type="button"
                  role="radio"
                  aria-checked={peran === p.nilai}
                  disabled={sedangMengirim}
                  onClick={() => setPeran(p.nilai)}
                  className={cn(
                    "text-button focus-visible:outline-primary min-h-11 rounded-lg px-4 transition-colors focus-visible:outline-2",
                    peran === p.nilai
                      ? "bg-primary text-on-primary"
                      : "text-text-secondary hover:bg-brand-light",
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {pesanError.length > 0 && (
              <Banner nada="error">
                {pesanError.length === 1 ? (
                  pesanError[0]
                ) : (
                  <ul className="list-disc pl-4">
                    {pesanError.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
              </Banner>
            )}
            {!relawan && (
              <Banner nada="info">
                Dokumen legalitas lembaga diunggah saat mendaftarkan program
                (I-08).
              </Banner>
            )}

            <Input
              label={relawan ? "Nama lengkap" : "Nama penanggung jawab"}
              autoComplete="name"
              bantuan={relawan ? "Sesuai kartu identitas" : undefined}
              value={isian.nama}
              onChange={(e) => ubah("nama")(e.target.value)}
              disabled={sedangMengirim}
            />
            {!relawan && (
              <Input
                label="Nama lembaga"
                autoComplete="organization"
                value={isian.namaLembaga}
                onChange={(e) => ubah("namaLembaga")(e.target.value)}
                disabled={sedangMengirim}
              />
            )}
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              bantuan="Dipakai untuk masuk"
              value={isian.email}
              onChange={(e) => ubah("email")(e.target.value)}
              disabled={sedangMengirim}
            />
            <PasswordInput
              label="Kata sandi"
              autoComplete="new-password"
              bantuan="Minimal 8 karakter"
              value={isian.kataSandi}
              onChange={(e) => ubah("kataSandi")(e.target.value)}
              disabled={sedangMengirim}
            />
            <Input
              label="Nomor telepon"
              type="tel"
              autoComplete="tel"
              bantuan="Untuk dihubungi lembaga"
              value={isian.noTelepon}
              onChange={(e) => ubah("noTelepon")(e.target.value)}
              disabled={sedangMengirim}
            />
            {relawan ? (
              <>
                <Select
                  label="Domisili"
                  placeholder="Pilih kota/kabupaten"
                  bantuan="Kota/kabupaten tempat tinggal"
                  opsi={DAFTAR_DOMISILI}
                  value={isian.domisili}
                  onChange={(e) => ubah("domisili")(e.target.value)}
                  disabled={sedangMengirim}
                />
                {isian.domisili === "Lainnya" && (
                  <Input
                    label="Kota/kabupaten domisili"
                    placeholder="Tulis kota atau kabupaten tempat tinggalmu"
                    value={isian.domisiliLain}
                    onChange={(e) => ubah("domisiliLain")(e.target.value)}
                    disabled={sedangMengirim}
                  />
                )}
                <FileDropzone
                  label="Dokumen verifikasi"
                  bantuan="Kartu identitas · PDF, JPG, atau PNG · maksimal 2 MB"
                  accept=".pdf,.jpg,.jpeg,.png"
                  namaBerkas={berkas ? [berkas.name] : []}
                  onPilihBerkas={(daftar) => setBerkas(daftar[0] ?? null)}
                  disabled={sedangMengirim}
                />
              </>
            ) : (
              <Input
                label="Tautan situs resmi (opsional)"
                type="url"
                placeholder="https://"
                value={isian.tautanSitusResmi}
                onChange={(e) => ubah("tautanSitusResmi")(e.target.value)}
                disabled={sedangMengirim}
              />
            )}

            <label className="text-body text-text flex items-start gap-3">
              <input
                type="checkbox"
                checked={isian.setuju}
                onChange={(e) => ubah("setuju")(e.target.checked)}
                disabled={sedangMengirim}
                className="accent-primary mt-1 size-5 shrink-0"
              />
              Saya menyetujui syarat dan ketentuan serta kebijakan privasi
              RekanBumi.
            </label>

            <Button
              type="submit"
              lebarPenuh
              disabled={sedangMengirim || !isian.setuju}
            >
              {sedangMengirim ? "Mendaftarkan…" : "Daftar"}
            </Button>

            <p className="text-body text-text-secondary text-center">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="text-button text-primary hover:text-primary-hover hover:underline"
              >
                Masuk
              </Link>
            </p>
          </form>
        )}
      </section>
    </div>
  );
}
