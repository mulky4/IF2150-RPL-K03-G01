import bcrypt from "bcryptjs";

/**
 * C22 BetterAuth «library» – pembungkus pustaka Better Auth.
 * Menyimpan & memverifikasi kredensial serta mengelola sesi tanpa membaca kelas Pengguna
 * (Tabel 4.1 DPPL2). Konfigurasi pustakanya ada di server/auth.ts.
 *
 * Catatan visibilitas: hashKataSandi() dan cocokkanHash() di DPPL bersifat private.
 * Di sini dibuat static agar bisa dipasang ke opsi `password` Better Auth (KNF02, bcrypt).
 */
export class BetterAuth {
  private static readonly PUTARAN_SALT = 10;

  /** Algo-C22-01. Mengembalikan idPengguna akun baru. */
  static async daftarkanKredensial(
    email: string,
    kataSandi: string,
  ): Promise<string> {
    const { auth } = await import("~/server/auth");
    const hasil = await auth.api.signUpEmail({
      body: { email, password: kataSandi, name: email },
    });
    return hasil.user.id;
  }

  /** Algo-C22-02. Hash bcrypt (KNF02). */
  static async hashKataSandi(kataSandi: string): Promise<string> {
    return bcrypt.hash(kataSandi, BetterAuth.PUTARAN_SALT);
  }

  /** Algo-C22-03. Mengembalikan idPengguna bila email & kata sandi cocok, selain itu null. */
  static async verifikasiKredensial(
    email: string,
    kataSandi: string,
  ): Promise<string | null> {
    const { db } = await import("~/server/db");
    const pengguna = await db.user.findUnique({
      where: { email },
      include: { accounts: { where: { providerId: "credential" } } },
    });
    const hash = pengguna?.accounts[0]?.password;
    if (!pengguna || !hash) return null;
    return (await BetterAuth.cocokkanHash(kataSandi, hash))
      ? pengguna.id
      : null;
  }

  /** Algo-C22-04. */
  static async cocokkanHash(
    kataSandi: string,
    hashKataSandi: string,
  ): Promise<boolean> {
    return bcrypt.compare(kataSandi, hashKataSandi);
  }

  /** Algo-C22-05. Membuat sesi untuk pengguna dan mengembalikan token sesi. Diisi bersama I-02 (login). */
  static async buatSesiMasuk(idPengguna: string): Promise<string> {
    throw new Error(
      `Belum diimplementasi: BetterAuth.buatSesiMasuk(${idPengguna})`,
    );
  }

  /** Algo-C22-06. Mengembalikan token sesi aktif dari cookie request, atau null. */
  static async ambilSesi(): Promise<string | null> {
    const { auth } = await import("~/server/auth");
    const { headers } = await import("next/headers");
    const sesi = await auth.api.getSession({ headers: await headers() });
    return sesi?.session.token ?? null;
  }
}
