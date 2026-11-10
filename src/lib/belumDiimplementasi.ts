/**
 * Dipakai di kerangka kelas: operasi sudah ada sesuai Tabel 4.1 DPPL,
 * isinya menyusul di issue fitur masing-masing.
 */
export function belumDiimplementasi(
  namaOperasi: string,
  ...argumen: unknown[]
): never {
  void argumen;
  throw new Error(`Belum diimplementasi: ${namaOperasi}`);
}
