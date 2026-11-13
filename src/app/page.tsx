import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "~/server/auth";
import { MENU, type PeranNavigasi } from "~/views/components/navigasi";

// Beranda tidak punya tampilan sendiri: pengunjung diarahkan ke Eksplorasi
// Program (I-04), pengguna yang sudah login ke menu pertama perannya.
export default async function Beranda() {
  const sesi = await auth.api.getSession({ headers: await headers() });
  const peran = (sesi?.user.peran ?? "PENGUNJUNG") as PeranNavigasi;
  const tujuan = MENU[peran]?.[0]?.href ?? "/program";
  redirect(tujuan);
}