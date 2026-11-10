"use client";

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";

import { authClient } from "~/lib/auth-client";

import { BottomNav } from "./BottomNav";
import { Button } from "./Button";
import { Footer } from "./Footer";
import { Modal } from "./Modal";
import { Navbar } from "./Navbar";
import type { PeranNavigasi } from "./navigasi";
import { TopBar } from "./TopBar";

const PERAN_VALID: PeranNavigasi[] = ["RELAWAN", "INISIATOR", "VERIFIKATOR"];

/**
 * Layout utama: navbar di desktop, top bar + bottom nav di mobile.
 * Menu yang muncul menyesuaikan peran user yang sedang login.
 *
 * TODO: jumlah notifikasi masih 0, nanti ambil dari router notifikasi.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: sesi, isPending } = authClient.useSession();
  const [konfirmasiKeluar, setKonfirmasiKeluar] = useState(false);

  const peranSesi = (sesi?.user as { peran?: string } | undefined)?.peran;
  const peran: PeranNavigasi =
    sesi && PERAN_VALID.includes(peranSesi as PeranNavigasi)
      ? (peranSesi as PeranNavigasi)
      : sesi
        ? "RELAWAN"
        : "PENGUNJUNG";
  const pengguna = sesi
    ? { nama: sesi.user.name, email: sesi.user.email }
    : undefined;
  const jumlahNotifikasiBelumDibaca = 0;

  async function keluar() {
    setKonfirmasiKeluar(false);
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#konten"
        className="focus:bg-card focus:text-label focus:shadow-card sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:px-4 focus:py-2"
      >
        Lewati ke konten
      </a>

      {isPending ? (
        <div
          aria-hidden
          className="border-border bg-card h-14 border-b md:h-18"
        />
      ) : (
        <>
          <Navbar
            peran={peran}
            pengguna={pengguna}
            jumlahNotifikasiBelumDibaca={jumlahNotifikasiBelumDibaca}
            onKeluar={() => setKonfirmasiKeluar(true)}
          />
          <TopBar
            tampilkanNotifikasi={peran !== "PENGUNJUNG"}
            jumlahNotifikasiBelumDibaca={jumlahNotifikasiBelumDibaca}
          />
        </>
      )}

      <main id="konten" className="flex-1 pb-19 md:pb-0">
        {children}
      </main>

      {!isPending && peran === "PENGUNJUNG" && <Footer />}
      {!isPending && (
        <BottomNav
          peran={peran}
          jumlahNotifikasiBelumDibaca={jumlahNotifikasiBelumDibaca}
          onAkun={() => setKonfirmasiKeluar(true)}
        />
      )}

      <Modal
        terbuka={konfirmasiKeluar}
        onTutup={() => setKonfirmasiKeluar(false)}
        judul="Keluar dari akun?"
        aksi={
          <>
            <Button
              varian="secondary"
              onClick={() => setKonfirmasiKeluar(false)}
            >
              Batal
            </Button>
            <Button varian="danger" onClick={keluar}>
              Keluar
            </Button>
          </>
        }
      >
        {pengguna ? `Kamu masuk sebagai ${pengguna.email}.` : null}
      </Modal>
    </div>
  );
}
