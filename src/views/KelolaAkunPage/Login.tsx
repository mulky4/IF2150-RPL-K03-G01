"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";

import { Banner } from "~/views/components/Banner";
import { Button } from "~/views/components/Button";
import { Input } from "~/views/components/Input";
import { Logo } from "~/views/components/Logo";
import { PasswordInput } from "~/views/components/PasswordInput";

import { urlKembaliAman, useKelolaAkunPage } from "./useKelolaAkunPage";

function FormLogin() {
  const parameter = useSearchParams();
  const urlKembali = urlKembaliAman(parameter.get("urlKembali"));
  const { terimaInputKredensial, pesanError, diblokir, sedangMengirim } =
    useKelolaAkunPage();
  const [email, setEmail] = useState("");
  const [kataSandi, setKataSandi] = useState("");

  const nonaktif = diblokir || sedangMengirim;

  async function kirim(e: FormEvent) {
    e.preventDefault();
    await terimaInputKredensial(email, kataSandi, urlKembali);
  }

  return (
    <form onSubmit={kirim} noValidate className="flex flex-col gap-5">
      {urlKembali && (
        <Banner nada="info">
          Masuk dulu untuk mendaftar program dan melanjutkan kegiatanmu.
        </Banner>
      )}
      {diblokir && (
        <Banner nada="error">
          IP kamu diblokir sementara selama 5 menit karena terlalu banyak
          percobaan masuk. Coba lagi nanti.
        </Banner>
      )}
      {pesanError.length > 0 && !diblokir && (
        <Banner nada="error">{pesanError.join(". ")}</Banner>
      )}

      <Input
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="nama@email.com"
        bantuan="Email yang terdaftar"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={nonaktif}
        required
      />
      <PasswordInput
        label="Kata sandi"
        autoComplete="current-password"
        placeholder="Masukkan kata sandi"
        bantuan="Ketuk ikon mata untuk melihat kata sandi"
        value={kataSandi}
        onChange={(e) => setKataSandi(e.target.value)}
        disabled={nonaktif}
        required
      />

      <Button type="submit" lebarPenuh disabled={nonaktif}>
        {sedangMengirim ? "Memeriksa…" : "Masuk"}
      </Button>

      <p className="text-body text-text-secondary text-center">
        Belum punya akun?{" "}
        <Link
          href="/registrasi"
          className="text-button text-primary hover:text-primary-hover hover:underline"
        >
          Daftar
        </Link>
      </p>
    </form>
  );
}

/** I-02 Login (C12 KelolaAkunPage). */
export function Login() {
  return (
    <div className="flex min-h-[calc(100dvh-4.5rem)] items-center justify-center px-4 py-10">
      <div className="bg-card shadow-card flex w-full max-w-[480px] flex-col gap-6 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <Logo />
          <h1 className="text-h2 text-text">Masuk ke RekanBumi</h1>
          <p className="text-body text-text-secondary">
            Masuk untuk mendaftar program dan memantau kegiatanmu.
          </p>
        </div>
        <Suspense fallback={null}>
          <FormLogin />
        </Suspense>
      </div>
    </div>
  );
}
