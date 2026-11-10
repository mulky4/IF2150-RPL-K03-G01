import { belumDiimplementasi } from "~/lib/belumDiimplementasi";
import type { StatusVerifikasi, Peran } from "~/server/models/enums";
import type { Notifikasi } from "~/server/models/Notifikasi";
import type { Pengguna } from "~/server/models/Pengguna";

/** Isian formulir registrasi (tipe FormData pada DPPL). */
export type DataDiri = {
  peran: Extract<Peran, "RELAWAN" | "INISIATOR">;
  email: string;
  kataSandi: string;
  // Relawan
  nama?: string;
  noTelepon?: string;
  domisili?: string;
  jenisDokumen?: string;
  // InisiatorProgram
  namaLembaga?: string;
  tautanSitusResmi?: string;
};

/** Berkas unggahan (tipe File pada DPPL). */
export type BerkasUnggahan = File | null;

/**
 * C13 AuthController «control» (Tabel 4.1 DPPL2).
 * Registrasi (UC01), login + blokir IP (UC02, KNF06), dan notifikasi akun (UC06).
 */
export class AuthController {
  // Blokir IP disimpan di memori (SPEC §1), dipakai bersama semua request.
  private static percobaanGagal = new Map<string, number>();
  private static waktuBlokir = new Map<string, Date>();
  private static readonly BATAS_PERCOBAAN = 5;
  private static readonly DURASI_BLOKIR_MENIT = 5;

  /** Algo-C13-01 */
  static async buatAkunBaru(
    dataDiri: DataDiri,
    berkas: BerkasUnggahan,
  ): Promise<Pengguna> {
    return belumDiimplementasi("AuthController.buatAkunBaru", dataDiri, berkas);
  }

  /** Algo-C13-02. Mengembalikan daftar pesan galat (kosong kalau valid). */
  private static validasiKelengkapanData(
    dataDiri: DataDiri,
    berkas: BerkasUnggahan,
  ): string[] {
    return belumDiimplementasi(
      "AuthController.validasiKelengkapanData",
      dataDiri,
      berkas,
    );
  }

  /** Algo-C13-03 */
  private static cekStatusVerifikasi(dataDiri: DataDiri): StatusVerifikasi {
    return belumDiimplementasi("AuthController.cekStatusVerifikasi", dataDiri);
  }

  /** Algo-C13-04 */
  static async cekSesi(): Promise<boolean> {
    return belumDiimplementasi("AuthController.cekSesi");
  }

  /** Algo-C13-05 */
  static async validasiKredensial(
    email: string,
    kataSandi: string,
    ip: string,
  ): Promise<boolean> {
    return belumDiimplementasi(
      "AuthController.validasiKredensial",
      email,
      kataSandi,
      ip,
    );
  }

  /** Algo-C13-06 */
  private static cekStatusBlokir(ip: string): boolean {
    return belumDiimplementasi(
      "AuthController.cekStatusBlokir",
      ip,
      AuthController.waktuBlokir,
    );
  }

  /** Algo-C13-07 */
  private static catatPercobaanGagal(ip: string): number {
    return belumDiimplementasi(
      "AuthController.catatPercobaanGagal",
      ip,
      AuthController.percobaanGagal,
      AuthController.BATAS_PERCOBAAN,
    );
  }

  /** Algo-C13-08 */
  private static blokirIP(ip: string): void {
    belumDiimplementasi(
      "AuthController.blokirIP",
      ip,
      AuthController.DURASI_BLOKIR_MENIT,
    );
  }

  /** Algo-C13-09 */
  private static resetPercobaanGagal(ip: string): void {
    belumDiimplementasi("AuthController.resetPercobaanGagal", ip);
  }

  /** Algo-C13-10. Mengembalikan token sesi. */
  private static async mulaiSesi(idPengguna: string): Promise<string> {
    return belumDiimplementasi("AuthController.mulaiSesi", idPengguna);
  }

  /** Algo-C13-11 */
  static async ambilNotifikasi(idPengguna: string): Promise<Notifikasi[]> {
    return belumDiimplementasi("AuthController.ambilNotifikasi", idPengguna);
  }

  /** Algo-C13-12 */
  static async bacaNotifikasi(idNotifikasi: string): Promise<Notifikasi> {
    return belumDiimplementasi("AuthController.bacaNotifikasi", idNotifikasi);
  }
}
