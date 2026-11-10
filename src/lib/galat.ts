/**
 * Dilempar controller saat isian pengguna tidak valid. Berisi semua pesan galat sekaligus
 * (bukan satu per satu) supaya layar bisa menampilkannya sebagai daftar (I01-MSG-Error).
 * Router mengubahnya menjadi TRPCError BAD_REQUEST dan errorFormatter mengirim
 * `data.daftarGalat` ke views/.
 */
export class GalatValidasi extends Error {
  constructor(public readonly daftarGalat: string[]) {
    super(daftarGalat.join("; "));
    this.name = "GalatValidasi";
  }
}
