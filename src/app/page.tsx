import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "~/server/auth";
import {
  MENU,
  PERAN_VALID,
  type PeranNavigasi,
} from "~/views/components/navigasi";

// Beranda tidak punya tampilan sendiri: pengunjung diarahkan ke Eksplorasi
// Program, pengguna yang sudah login ke menu pertama perannya.
export default async function Beranda() {
  const sesi = await auth.api.getSession({ headers: await headers() });
  const peranSesi = sesi?.user.peran as PeranNavigasi | undefined;
  const peran: PeranNavigasi =
    peranSesi && PERAN_VALID.includes(peranSesi) ? peranSesi : "PENGUNJUNG";
  redirect(MENU[peran][0]?.href ?? "/program");
}
