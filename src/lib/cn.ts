/** Gabungkan className dan abaikan yang kosong. */
export function cn(...kelas: Array<string | false | null | undefined>) {
  return kelas.filter(Boolean).join(" ");
}
