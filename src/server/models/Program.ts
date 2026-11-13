import {
  StatusProgram,
  type KategoriProgram as TipeKategoriProgram,
  type StatusProgram as TipeStatusProgram,
} from "~/server/models/enums";
import type { InisiatorProgram } from "~/server/models/InisiatorProgram";
import type { Pendaftaran } from "~/server/models/Pendaftaran";
import type { Relawan } from "~/server/models/Relawan";

/** Kolom tbl_program yang dibutuhkan untuk membentuk objek Program. */
export type BarisProgram = {
  id: string;
  namaProgram: string;
  deskripsi: string;
  kategori: TipeKategoriProgram;
  tempatPelaksanaan: string;
  waktuMulai: Date;
  waktuSelesai: Date;
  kuota: number;
  syaratKetentuan: string;
  status: TipeStatusProgram;
};

type DataProgram = {
  idProgram: string;
  namaProgram: string;
  deskripsi: string;
  kategori: TipeKategoriProgram;
  tempatPelaksanaan: string;
  waktuMulai: Date;
  waktuSelesai: Date;
  kuota: number;
  syaratKetentuan: string;
  status: TipeStatusProgram;
  pendaftar?: Pendaftaran[];
  pengelola?: InisiatorProgram;
  relawanDiterima?: Relawan[];
};

export class Program {
  private readonly idProgram: string;
  private readonly namaProgram: string;
  private readonly deskripsi: string;
  private readonly kategori: TipeKategoriProgram;
  private readonly tempatPelaksanaan: string;
  private readonly waktuMulai: Date;
  private readonly waktuSelesai: Date;
  private readonly kuota: number;
  private readonly syaratKetentuan: string;
  private status: TipeStatusProgram;
  private readonly pendaftar: Pendaftaran[];
  private readonly pengelola?: InisiatorProgram;
  private readonly relawanDiterima: Relawan[];

  constructor(data: DataProgram) {
    this.idProgram = data.idProgram;
    this.namaProgram = data.namaProgram;
    this.deskripsi = data.deskripsi;
    this.kategori = data.kategori;
    this.tempatPelaksanaan = data.tempatPelaksanaan;
    this.waktuMulai = data.waktuMulai;
    this.waktuSelesai = data.waktuSelesai;
    this.kuota = data.kuota;
    this.syaratKetentuan = data.syaratKetentuan;
    this.status = data.status;
    this.pendaftar = data.pendaftar ?? [];
    this.pengelola = data.pengelola;
    this.relawanDiterima = data.relawanDiterima ?? [];
  }

  static dariBaris(
    baris: BarisProgram,
    relasi: Pick<DataProgram, "pengelola" | "relawanDiterima"> = {},
  ): Program {
    return new Program({
      idProgram: baris.id,
      namaProgram: baris.namaProgram,
      deskripsi: baris.deskripsi,
      kategori: baris.kategori,
      tempatPelaksanaan: baris.tempatPelaksanaan,
      waktuMulai: baris.waktuMulai,
      waktuSelesai: baris.waktuSelesai,
      kuota: baris.kuota,
      syaratKetentuan: baris.syaratKetentuan,
      status: baris.status,
      ...relasi,
    });
  }

  cekKuotaTersedia(jumlahTambahan: number): boolean {
    if (jumlahTambahan < 0) throw new Error("Jumlah relawan tidak valid");
    return this.hitungJumlahDiterima() + jumlahTambahan <= this.kuota;
  }

  private hitungJumlahDiterima(): number {
    return this.pendaftar.filter((pendaftaran) => pendaftaran.isDiterima())
      .length;
  }

  ajukanKonfirmasi(): TipeStatusProgram {
    if (this.status !== StatusProgram.AKTIF) {
      throw new Error("Program tidak dapat diajukan konfirmasi");
    }
    this.status = StatusProgram.MENUNGGU_KONFIRMASI;
    return this.status;
  }

  selesaikan(): TipeStatusProgram {
    if (this.status !== StatusProgram.MENUNGGU_KONFIRMASI) {
      throw new Error("Program belum diajukan konfirmasi");
    }
    this.status = StatusProgram.SELESAI;
    return this.status;
  }

  mintaRevisi(): TipeStatusProgram {
    if (this.status !== StatusProgram.MENUNGGU_KONFIRMASI) {
      throw new Error("Program belum diajukan konfirmasi");
    }
    this.status = StatusProgram.PERLU_REVISI;
    return this.status;
  }

  cekDalamWaktuPelaksanaan(waktu: Date): boolean {
    return waktu >= this.waktuMulai && waktu <= this.waktuSelesai;
  }

  keteranganWaktu(sekarang = new Date()): string {
    if (sekarang < this.waktuMulai) return "Belum dimulai";
    if (sekarang <= this.waktuSelesai) return "Sedang berlangsung";
    return "Sudah selesai";
  }

  hitungDurasiJam(): number {
    return (
      (this.waktuSelesai.getTime() - this.waktuMulai.getTime()) / 3_600_000
    );
  }

  getTautan(): string {
    return this.ambilPengelola().getTautan();
  }

  ambilPengelola(): InisiatorProgram {
    if (!this.pengelola) throw new Error("Pengelola program tidak ditemukan");
    return this.pengelola;
  }

  daftarPendaftar(): Pendaftaran[] {
    return [...this.pendaftar];
  }

  daftarRelawanDiterima(): Relawan[] {
    return [...this.relawanDiterima];
  }

  static cari(
    _kataKunci: string,
    _kategori: TipeKategoriProgram | null,
  ): Program[] {
    throw new Error(
      "Pencarian program harus dilakukan melalui repositori data",
    );
  }

  getIdProgram(): string {
    return this.idProgram;
  }

  getNamaProgram(): string {
    return this.namaProgram;
  }

  getKategori(): TipeKategoriProgram {
    return this.kategori;
  }

  getTempatPelaksanaan(): string {
    return this.tempatPelaksanaan;
  }

  getWaktuMulai(): Date {
    return this.waktuMulai;
  }

  getWaktuSelesai(): Date {
    return this.waktuSelesai;
  }

  getStatus(): TipeStatusProgram {
    return this.status;
  }
}
