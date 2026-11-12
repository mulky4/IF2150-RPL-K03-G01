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
