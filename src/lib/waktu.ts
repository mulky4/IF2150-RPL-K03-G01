/**
 * Format waktu yang dipakai di layar, selalu dalam WIB supaya sama untuk semua
 * pengguna. Contoh hasil: "Sab, 14 Nov 2026 · 07.00".
 */

const ZONA = "Asia/Jakarta";

const formatTanggal = new Intl.DateTimeFormat("id-ID", {
  timeZone: ZONA,
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});

const formatJamMenit = new Intl.DateTimeFormat("id-ID", {
  timeZone: ZONA,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const formatBulanTahun = new Intl.DateTimeFormat("id-ID", {
  timeZone: ZONA,
  month: "short",
  year: "numeric",
});

const formatAngkaJam = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 1,
});

/** "Sab, 14 Nov 2026" */
export function tanggal(waktu: Date): string {
  const bagian = formatTanggal.formatToParts(waktu);
  const ambil = (tipe: Intl.DateTimeFormatPartTypes) =>
    bagian.find((b) => b.type === tipe)?.value ?? "";
  return `${ambil("weekday")}, ${ambil("day")} ${ambil("month")} ${ambil("year")}`;
}

/** "07.12" */
export function jam(waktu: Date): string {
  return formatJamMenit.format(waktu).replace(":", ".");
}

/** "Sab, 14 Nov 2026 · 07.00" */
export function tanggalJam(waktu: Date): string {
  return `${tanggal(waktu)} · ${jam(waktu)}`;
}

/**
 * "Sab, 14 Nov 2026 · 07.00–12.00 WIB". Kalau selesainya beda hari, tanggal
 * selesai ikut ditulis.
 */
export function rentangWaktu(mulai: Date, selesai: Date): string {
  if (tanggal(mulai) === tanggal(selesai)) {
    return `${tanggalJam(mulai)}–${jam(selesai)} WIB`;
  }
  return `${tanggalJam(mulai)} – ${tanggalJam(selesai)} WIB`;
}

/** "Mar 2026" */
export function bulanTahun(waktu: Date): string {
  return formatBulanTahun.format(waktu);
}

/** Jumlah jam dengan paling banyak satu angka desimal: 4 → "4", 2.5 → "2,5". */
export function angkaJam(jumlah: number): string {
  return formatAngkaJam.format(jumlah);
}

// Waktu relatif untuk notifikasi.

const MENIT = 60_000;
const JAM = 60 * MENIT;
const HARI = 24 * JAM;

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
