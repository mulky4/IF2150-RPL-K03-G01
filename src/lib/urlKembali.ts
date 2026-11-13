/**
 * Tujuan kembali setelah login (I02-InfoRedirect). Hanya path internal yang diterima:
 * diurai dengan URL parser terhadap origin palsu, lalu origin hasilnya harus tetap sama.
 * Menolak `//host`, `/\host`, `https://host`, `javascript:`, dan path yang mengandung karakter kontrol.
 */
const ORIGIN_UJI = "http://rekanbumi.invalid";

export function urlKembaliAman(url: string | null | undefined): string | null {
  if (!url?.startsWith("/") || url.startsWith("//")) return null;
  if (url.includes("\\") || /[\u0000-\u001f\u007f]/.test(url)) return null;
  try {
    const hasil = new URL(url, ORIGIN_UJI);
    if (hasil.origin !== ORIGIN_UJI) return null;
    return hasil.pathname + hasil.search + hasil.hash;
  } catch {
    return null;
  }
}
