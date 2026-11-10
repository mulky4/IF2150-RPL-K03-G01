import { belumDiimplementasi } from "~/lib/belumDiimplementasi";
import type { Notifikasi } from "~/server/models/Notifikasi";

/**
 * C04 Pengguna «entity» (abstract) – superkelas Relawan, InisiatorProgram, Verifikator.
 * Data akunnya ada di tabel `user` Better Auth (SPEC §7 no. 7).
 */
export abstract class Pengguna {
  protected constructor(
    protected idPengguna: string,
    protected email: string,
  ) {}

  /** Algo-C04-01. Mengambil daftar notifikasi milik pengguna. */
  async lihatNotifikasi(): Promise<Notifikasi[]> {
    return belumDiimplementasi(
      "Pengguna.lihatNotifikasi",
      this.idPengguna,
      this.email,
    );
  }
}
