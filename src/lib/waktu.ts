const MENIT = 60_000;
const JAM = 60 * MENIT;
const HARI = 24 * JAM;
const ZONA = "Asia/Jakarta";

function tanggalWIB(waktu: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: ZONA }).format(waktu);
}

function jamWIB(waktu: Date): string {
  const bagian = new Intl.DateTimeFormat("id-ID", {
    timeZone: ZONA,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(waktu);
  const ambil = (jenis: string) =>
    bagian.find((b) => b.type === jenis)?.value ?? "00";
  return `${ambil("hour")}.${ambil("minute")}`;
}

function tanggalPanjang(waktu: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: ZONA,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(waktu);
}

/** Contoh: "5 menit lalu", "Kemarin", "3 hari lalu". Lebih dari seminggu jadi tanggal. */
export function waktuRelatif(waktu: Date, sekarang: Date = new Date()): string {
  const selisih = sekarang.getTime() - waktu.getTime();
  if (selisih < MENIT) return "Baru saja";
  if (selisih < JAM) return `${Math.floor(selisih / MENIT)} menit lalu`;
  if (selisih < HARI) return `${Math.floor(selisih / JAM)} jam lalu`;
  const hari = Math.floor(selisih / HARI);
  if (hari === 1) return "Kemarin";
  if (hari < 7) return `${hari} hari lalu`;
  return tanggalPanjang(waktu);
}

/** Contoh: "Hari ini, 09.12 WIB" atau "14 November 2026, 09.12 WIB". */
export function waktuLengkap(waktu: Date, sekarang: Date = new Date()): string {
  const hari =
    tanggalWIB(waktu) === tanggalWIB(sekarang)
      ? "Hari ini"
      : tanggalPanjang(waktu);
  return `${hari}, ${jamWIB(waktu)} WIB`;
}
