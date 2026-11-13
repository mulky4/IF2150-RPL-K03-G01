import { db } from "~/server/db";
import { Notifikasi } from "~/server/models/Notifikasi";

/**
 * C04 Pengguna «entity» (abstract) – superkelas Relawan, InisiatorProgram, Verifikator.
 * Data akunnya ada di tabel `user` Better Auth (SPEC §7 no. 7).
 */
export abstract class Pengguna {
  protected constructor(
    protected idPengguna: string,
    protected email: string,
  ) {}

  /**
   * DB_SERVICE.findPenggunaByID pada Algo-C13-11. Mengembalikan null kalau tidak ada.
   * Objeknya hanya membawa data milik Pengguna (cukup untuk operasi notifikasi).
   */
  static async cari(idPengguna: string): Promise<Pengguna | null> {
    const user = await db.user.findUnique({
      where: { id: idPengguna },
      select: { id: true, email: true },
    });
    return user ? new AkunPengguna(user.id, user.email) : null;
  }

  /** Algo-C04-01, Q-C13-04. Notifikasi milik pengguna, terbaru di atas. */
  async lihatNotifikasi(): Promise<Notifikasi[]> {
    const dataList = await db.notifikasi.findMany({
      where: { userId: this.idPengguna },
      orderBy: { waktuKirim: "desc" },
    });
    return dataList.map((data) => Notifikasi.dariBaris(data));
  }
}

/** Pengguna tanpa data khusus peran. Dipakai Pengguna.cari(). */
class AkunPengguna extends Pengguna {
  constructor(idPengguna: string, email: string) {
    super(idPengguna, email);
  }
}
