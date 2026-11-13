import type { Prisma } from "@prisma/client";

import { db } from "~/server/db";
import {
  StatusVerifikasi,
  type StatusVerifikasi as TipeStatusVerifikasi,
} from "~/server/models/enums";
import { InisiatorProgram } from "~/server/models/InisiatorProgram";
import { Kehadiran } from "~/server/models/Kehadiran";
import { Program } from "~/server/models/Program";
import { Pengguna } from "~/server/models/Pengguna";
import { RiwayatKontribusi } from "~/server/models/RiwayatKontribusi";

/**
 * Relasi yang ikut diambil setiap kali membentuk objek Relawan: catatan
 * kehadiran untuk cek hadir, dan riwayat kontribusi beserta programnya
 * (terbaru di atas) untuk portofolio.
 */
export const SERTAKAN_RELAWAN = {
  user: { select: { email: true } },
  kehadiran: true,
  riwayatKontribusi: {
    include: {
      programSelesai: {
        orderBy: { program: { waktuSelesai: "desc" } },
        include: {
          program: {
            include: {
              inisiatorProgram: {
                include: { user: { select: { email: true } } },
              },
            },
          },
        },
      },
    },
  },
} satisfies Prisma.RelawanInclude;

export type BarisRelawan = Prisma.RelawanGetPayload<{
  include: typeof SERTAKAN_RELAWAN;
}>;

type DataRelawan = {
  idPengguna: string;
  email: string;
  idRelawan: string;
  nama: string;
  noTelepon: string | null;
  domisili: string | null;
  statusVerifikasi: TipeStatusVerifikasi;
  kehadiran?: Kehadiran[];
  riwayatKontribusi?: RiwayatKontribusi;
};

export class Relawan extends Pengguna {
  private readonly idRelawan: string;
  private readonly nama: string;
  private readonly noTelepon: string | null;
  private readonly domisili: string | null;
  private readonly statusVerifikasi: TipeStatusVerifikasi;
  private readonly kehadiran: Kehadiran[];
  private riwayatKontribusi?: RiwayatKontribusi;

  constructor(data: DataRelawan) {
    super(data.idPengguna, data.email);
    this.idRelawan = data.idRelawan;
    this.nama = data.nama;
    this.noTelepon = data.noTelepon;
    this.domisili = data.domisili;
    this.statusVerifikasi = data.statusVerifikasi;
    this.kehadiran = data.kehadiran ?? [];
    this.riwayatKontribusi = data.riwayatKontribusi;
  }

  cekKelengkapanData(): boolean {
    return Boolean(
      this.nama.trim() && this.noTelepon?.trim() && this.domisili?.trim(),
    );
  }

  cekStatusKelayakan(): boolean {
    return (
      this.cekKelengkapanData() &&
      this.statusVerifikasi === StatusVerifikasi.TERVERIFIKASI
    );
  }

  /**
   * Relawan yang baru mendaftar belum punya riwayat di database. Untuk mereka
   * dipakai riwayat kosong, nanti disimpan saat jam aksi pertamanya dicatat.
   */
  lihatPortofolio(): RiwayatKontribusi {
    this.riwayatKontribusi ??= RiwayatKontribusi.kosong();
    return this.riwayatKontribusi;
  }

  catatKontribusi(program: Program): boolean {
    if (!this.hadirPada(program)) return false;
    this.lihatPortofolio().tambahRiwayatProgram(program);
    return true;
  }

  /**
   * Dibuat public karena PresensiController juga butuh cek ini, untuk menolak
   * check-in ganda dan untuk memilih relawan yang dapat jam aksi.
   */
  hadirPada(program: Program): boolean {
    return this.kehadiran.some((catatan) => catatan.untukProgram(program));
  }

  /**
   * Ambil relawan beserta catatan kehadiran dan riwayat kontribusinya dari
   * database. Hasilnya null kalau id relawan tidak ada.
   */
  static async cari(idRelawan: string): Promise<Relawan | null> {
    const baris = await db.relawan.findUnique({
      where: { id: idRelawan },
      include: SERTAKAN_RELAWAN,
    });
    return baris === null ? null : Relawan.dariBaris(baris);
  }

  static dariBaris(baris: BarisRelawan): Relawan {
    const riwayat = baris.riwayatKontribusi;
    return new Relawan({
      idPengguna: baris.userId,
      email: baris.user.email,
      idRelawan: baris.id,
      nama: baris.nama,
      noTelepon: baris.noTelepon,
      domisili: baris.domisili,
      statusVerifikasi: baris.statusVerifikasi,
      kehadiran: baris.kehadiran.map((data) => Kehadiran.dariBaris(data)),
      riwayatKontribusi:
        riwayat === null
          ? undefined
          : new RiwayatKontribusi({
              idRiwayat: riwayat.id,
              totalJamAksi: riwayat.totalJamAksi,
              programSelesai: riwayat.programSelesai.map(({ program }) =>
                Program.dariBaris(program, {
                  pengelola: new InisiatorProgram({
                    idPengguna: program.inisiatorProgram.userId,
                    email: program.inisiatorProgram.user.email,
                    idInisiator: program.inisiatorProgram.id,
                    namaLembaga: program.inisiatorProgram.namaLembaga,
                    tautanSitusResmi: program.inisiatorProgram.tautanSitusResmi,
                    statusVerifikasi: program.inisiatorProgram.statusVerifikasi,
                  }),
                }),
              ),
            }),
    });
  }

  getIdRelawan(): string {
    return this.idRelawan;
  }

  getNama(): string {
    return this.nama;
  }

  getDomisili(): string | null {
    return this.domisili;
  }

  /** Total jam aksi selalu dibaca dari riwayat kontribusi. */
  getTotalJamAksi(): number {
    return this.lihatPortofolio().getTotalJamAksi();
  }
}
