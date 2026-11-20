import { describe, expect, it } from "vitest";
import { StatusProgram } from "~/server/models/enums";
import type { InisiatorProgram } from "~/server/models/InisiatorProgram";
import type { Pendaftaran } from "~/server/models/Pendaftaran";
import { Pendaftaran as KelasPendaftaran } from "~/server/models/Pendaftaran";
import { Program } from "~/server/models/Program";
import type { Relawan } from "~/server/models/Relawan";

// Unit test kelas Program (C01), HIUPL 4.2. Satu test per kasus dengan ID C01-UTnn
// supaya keluaran test runner bisa dicocokkan dengan Tabel 4.2.x. Program berdurasi
// 4 jam: 5 Des 2026, 08.00-12.00 UTC.

const MULAI = new Date("2026-12-05T08:00:00.000Z");
const SELESAI = new Date("2026-12-05T12:00:00.000Z");

type Tambahan = {
  kuota?: number;
  pendaftar?: Pendaftaran[];
  pengelola?: InisiatorProgram;
  relawanDiterima?: Relawan[];
  waktuMulai?: Date;
  waktuSelesai?: Date;
};

function buatProgram(status: StatusProgram, tambahan: Tambahan = {}) {
  return new Program({
    idProgram: "p1",
    namaProgram: "Tanam Pohon",
    deskripsi: "Menanam pohon di lahan kritis",
    kategori: "JAGA_ALAM",
    tempatPelaksanaan: "Bandung",
    waktuMulai: tambahan.waktuMulai ?? MULAI,
    waktuSelesai: tambahan.waktuSelesai ?? SELESAI,
    kuota: tambahan.kuota ?? 10,
    syaratKetentuan: "Membawa botol minum",
    status,
    pendaftar: tambahan.pendaftar,
    pengelola: tambahan.pengelola,
    relawanDiterima: tambahan.relawanDiterima,
  });
}

function buatPendaftar(
  status: "MENUNGGU" | "DITERIMA" | "DITOLAK",
  id: string,
): Pendaftaran {
  return new KelasPendaftaran({
    idPendaftaran: id,
    keterampilan: "-",
    ketersediaanWaktu: "-",
    status,
    waktuDaftar: new Date("2026-11-07T01:00:00.000Z"),
  });
}

/** Pengelola tiruan: C01 hanya meneruskan getTautan() ke objek ini. */
function buatPengelola(tautan: string): InisiatorProgram {
  return { getTautan: () => tautan } as unknown as InisiatorProgram;
}

describe("Program.ajukanKonfirmasi (Algo-C01-01)", () => {
  it("C01-UT01 AKTIF diajukan konfirmasi menjadi MENUNGGU_KONFIRMASI", () => {
    const program = buatProgram(StatusProgram.AKTIF);
    expect(program.ajukanKonfirmasi()).toBe(StatusProgram.MENUNGGU_KONFIRMASI);
    expect(program.getStatus()).toBe(StatusProgram.MENUNGGU_KONFIRMASI);
  });

  it("C01-UT02 program yang masih MENUNGGU_VERIFIKASI ditolak", () => {
    const program = buatProgram(StatusProgram.MENUNGGU_VERIFIKASI);
    expect(() => program.ajukanKonfirmasi()).toThrow(
      "Program tidak dapat diajukan konfirmasi",
    );
    expect(program.getStatus()).toBe(StatusProgram.MENUNGGU_VERIFIKASI);
  });

  it("C01-UT03 diajukan dua kali: pengajuan kedua ditolak dan status tetap", () => {
    const program = buatProgram(StatusProgram.AKTIF);
    program.ajukanKonfirmasi();
    expect(() => program.ajukanKonfirmasi()).toThrow(
      "Program tidak dapat diajukan konfirmasi",
    );
    expect(program.getStatus()).toBe(StatusProgram.MENUNGGU_KONFIRMASI);
  });
});

describe("Program.selesaikan (Algo-C01-02)", () => {
  it("C01-UT04 MENUNGGU_KONFIRMASI diselesaikan menjadi SELESAI", () => {
    const program = buatProgram(StatusProgram.MENUNGGU_KONFIRMASI);
    expect(program.selesaikan()).toBe(StatusProgram.SELESAI);
    expect(program.getStatus()).toBe(StatusProgram.SELESAI);
  });

  it("C01-UT05 program AKTIF yang belum diajukan konfirmasi ditolak", () => {
    const program = buatProgram(StatusProgram.AKTIF);
    expect(() => program.selesaikan()).toThrow(
      "Program belum diajukan konfirmasi",
    );
    expect(program.getStatus()).toBe(StatusProgram.AKTIF);
  });

  it("C01-UT06 program yang sudah SELESAI tidak bisa diselesaikan lagi", () => {
    const program = buatProgram(StatusProgram.MENUNGGU_KONFIRMASI);
    program.selesaikan();
    expect(() => program.selesaikan()).toThrow(
      "Program belum diajukan konfirmasi",
    );
    expect(program.getStatus()).toBe(StatusProgram.SELESAI);
  });
});

describe("Program.mintaRevisi (Algo-C01-03)", () => {
  it("C01-UT07 MENUNGGU_KONFIRMASI dikembalikan menjadi PERLU_REVISI", () => {
    const program = buatProgram(StatusProgram.MENUNGGU_KONFIRMASI);
    expect(program.mintaRevisi()).toBe(StatusProgram.PERLU_REVISI);
    expect(program.getStatus()).toBe(StatusProgram.PERLU_REVISI);
  });

  it("C01-UT08 program AKTIF yang laporannya belum diajukan ditolak", () => {
    const program = buatProgram(StatusProgram.AKTIF);
    expect(() => program.mintaRevisi()).toThrow(
      "Program belum diajukan konfirmasi",
    );
    expect(program.getStatus()).toBe(StatusProgram.AKTIF);
  });

  it("C01-UT09 program yang sudah PERLU_REVISI tidak bisa diminta revisi lagi", () => {
    const program = buatProgram(StatusProgram.MENUNGGU_KONFIRMASI);
    program.mintaRevisi();
    expect(() => program.mintaRevisi()).toThrow(
      "Program belum diajukan konfirmasi",
    );
    expect(program.getStatus()).toBe(StatusProgram.PERLU_REVISI);
  });
});

describe("Program.cekKuotaTersedia dan hitungJumlahDiterima (Algo-C01-04, Algo-C01-07)", () => {
  it("C01-UT10 kuota masih tersedia: 1 diterima dari kuota 3, tambah 1 relawan", () => {
    const program = buatProgram(StatusProgram.AKTIF, {
      kuota: 3,
      pendaftar: [buatPendaftar("DITERIMA", "a")],
    });
    expect(program.cekKuotaTersedia(1)).toBe(true);
  });

  it("C01-UT11 batas: tambahan yang tepat memenuhi kuota masih diizinkan, lebih satu ditolak", () => {
    const program = buatProgram(StatusProgram.AKTIF, {
      kuota: 3,
      pendaftar: [buatPendaftar("DITERIMA", "a")],
    });
    expect(program.cekKuotaTersedia(2)).toBe(true);
    expect(program.cekKuotaTersedia(3)).toBe(false);
  });

  it("C01-UT12 jumlah tambahan negatif ditolak dengan galat", () => {
    const program = buatProgram(StatusProgram.AKTIF);
    expect(() => program.cekKuotaTersedia(-1)).toThrow(
      "Jumlah relawan tidak valid",
    );
  });

  it("C01-UT13 hanya pendaftar DITERIMA yang dihitung (MENUNGGU dan DITOLAK diabaikan)", () => {
    const program = buatProgram(StatusProgram.AKTIF, {
      kuota: 2,
      pendaftar: [
        buatPendaftar("MENUNGGU", "a"),
        buatPendaftar("DITOLAK", "b"),
        buatPendaftar("DITERIMA", "c"),
      ],
    });
    expect(program.cekKuotaTersedia(1)).toBe(true);
    expect(program.cekKuotaTersedia(2)).toBe(false);
  });

  it("C01-UT14 batas: program tanpa pendaftar, seluruh kuota tersedia dan jumlah tambahan 0 selalu boleh", () => {
    const program = buatProgram(StatusProgram.AKTIF, { kuota: 5 });
    expect(program.cekKuotaTersedia(5)).toBe(true);
    expect(program.cekKuotaTersedia(6)).toBe(false);
    expect(program.cekKuotaTersedia(0)).toBe(true);
  });
});

describe("Program.cekDalamWaktuPelaksanaan (Algo-C01-05)", () => {
  const program = buatProgram(StatusProgram.AKTIF);

  it("C01-UT15 waktu di tengah rentang pelaksanaan dinyatakan di dalam", () => {
    expect(
      program.cekDalamWaktuPelaksanaan(new Date("2026-12-05T10:00:00.000Z")),
    ).toBe(true);
  });

  it("C01-UT16 batas: tepat di waktu mulai dan tepat di waktu selesai masih di dalam", () => {
    expect(program.cekDalamWaktuPelaksanaan(MULAI)).toBe(true);
    expect(program.cekDalamWaktuPelaksanaan(SELESAI)).toBe(true);
  });

  it("C01-UT17 satu milidetik sebelum mulai dan sesudah selesai dinyatakan di luar", () => {
    expect(
      program.cekDalamWaktuPelaksanaan(new Date("2026-12-05T07:59:59.999Z")),
    ).toBe(false);
    expect(
      program.cekDalamWaktuPelaksanaan(new Date("2026-12-05T12:00:00.001Z")),
    ).toBe(false);
  });
});

describe("Program.hitungDurasiJam (Algo-C01-06)", () => {
  it("C01-UT18 program 08.00 sampai 12.00 berdurasi 4 jam", () => {
    expect(buatProgram(StatusProgram.AKTIF).hitungDurasiJam()).toBe(4);
  });

  it("C01-UT19 batas: durasi pecahan 30 menit dan durasi lintas hari 48 jam", () => {
    const setengahJam = buatProgram(StatusProgram.AKTIF, {
      waktuSelesai: new Date("2026-12-05T08:30:00.000Z"),
    });
    const duaHari = buatProgram(StatusProgram.AKTIF, {
      waktuSelesai: new Date("2026-12-07T08:00:00.000Z"),
    });
    expect(setengahJam.hitungDurasiJam()).toBe(0.5);
    expect(duaHari.hitungDurasiJam()).toBe(48);
  });

  it("C01-UT20 batas: waktu mulai sama dengan waktu selesai berdurasi 0 jam", () => {
    const program = buatProgram(StatusProgram.AKTIF, { waktuSelesai: MULAI });
    expect(program.hitungDurasiJam()).toBe(0);
  });
});

describe("Program.keteranganWaktu (Algo-C01-08)", () => {
  const program = buatProgram(StatusProgram.AKTIF);

  it("C01-UT21 waktu di tengah rentang: Sedang berlangsung", () => {
    expect(program.keteranganWaktu(new Date("2026-12-05T10:00:00.000Z"))).toBe(
      "Sedang berlangsung",
    );
  });

  it("C01-UT22 batas: tepat saat mulai dan tepat saat selesai masih Sedang berlangsung", () => {
    expect(program.keteranganWaktu(MULAI)).toBe("Sedang berlangsung");
    expect(program.keteranganWaktu(SELESAI)).toBe("Sedang berlangsung");
  });

  it("C01-UT23 sebelum mulai: Belum dimulai, sesudah selesai: Sudah selesai", () => {
    expect(program.keteranganWaktu(new Date("2026-12-05T07:59:59.999Z"))).toBe(
      "Belum dimulai",
    );
    expect(program.keteranganWaktu(new Date("2026-12-05T12:00:00.001Z"))).toBe(
      "Sudah selesai",
    );
  });
});

describe("Program.ambilPengelola dan getTautan (Algo-C01-09, Algo-C01-13)", () => {
  it("C01-UT24 ambilPengelola mengembalikan pengelola yang sama dengan yang diberikan", () => {
    const pengelola = buatPengelola("https://hijau.example");
    const program = buatProgram(StatusProgram.AKTIF, { pengelola });
    expect(program.ambilPengelola()).toBe(pengelola);
  });

  it("C01-UT25 ambilPengelola pada program tanpa pengelola melempar galat", () => {
    expect(() => buatProgram(StatusProgram.AKTIF).ambilPengelola()).toThrow(
      "Pengelola program tidak ditemukan",
    );
  });

  it("C01-UT26 getTautan meneruskan tautan situs resmi milik pengelola", () => {
    const program = buatProgram(StatusProgram.AKTIF, {
      pengelola: buatPengelola("https://hijau.example"),
    });
    expect(program.getTautan()).toBe("https://hijau.example");
  });

  it("C01-UT27 batas: pengelola tanpa situs resmi menghasilkan tautan kosong", () => {
    const program = buatProgram(StatusProgram.AKTIF, {
      pengelola: buatPengelola(""),
    });
    expect(program.getTautan()).toBe("");
  });

  it("C01-UT28 getTautan pada program tanpa pengelola melempar galat", () => {
    expect(() => buatProgram(StatusProgram.AKTIF).getTautan()).toThrow(
      "Pengelola program tidak ditemukan",
    );
  });
});

describe("Program.daftarPendaftar dan daftarRelawanDiterima (Algo-C01-10, Algo-C01-11)", () => {
  it("C01-UT29 daftarPendaftar mengembalikan semua pendaftaran program", () => {
    const a = buatPendaftar("MENUNGGU", "a");
    const b = buatPendaftar("DITERIMA", "b");
    const program = buatProgram(StatusProgram.AKTIF, { pendaftar: [a, b] });
    expect(program.daftarPendaftar()).toEqual([a, b]);
  });

  it("C01-UT30 batas: program tanpa pendaftar dan tanpa relawan diterima menghasilkan daftar kosong", () => {
    const program = buatProgram(StatusProgram.AKTIF);
    expect(program.daftarPendaftar()).toEqual([]);
    expect(program.daftarRelawanDiterima()).toEqual([]);
  });

  it("C01-UT31 daftar yang dikembalikan adalah salinan: mengubahnya tidak mengubah isi program", () => {
    const a = buatPendaftar("MENUNGGU", "a");
    const relawan = { id: "r1" } as unknown as Relawan;
    const program = buatProgram(StatusProgram.AKTIF, {
      pendaftar: [a],
      relawanDiterima: [relawan],
    });
    program.daftarPendaftar().pop();
    program.daftarRelawanDiterima().pop();
    expect(program.daftarPendaftar()).toHaveLength(1);
    expect(program.daftarRelawanDiterima()).toHaveLength(1);
  });

  it("C01-UT32 daftarRelawanDiterima mengembalikan relawan yang diterima sesuai urutan", () => {
    const r1 = { id: "r1" } as unknown as Relawan;
    const r2 = { id: "r2" } as unknown as Relawan;
    const program = buatProgram(StatusProgram.AKTIF, {
      relawanDiterima: [r1, r2],
    });
    expect(program.daftarRelawanDiterima()).toEqual([r1, r2]);
  });
});

describe("Program.cari (Algo-C01-12)", () => {
  it("C01-UT33 pencarian lewat model ditolak: pencarian dilakukan oleh ProgramController lewat basis data", () => {
    expect(() => Program.cari("mangrove", null)).toThrow(
      "Pencarian program harus dilakukan melalui repositori data",
    );
  });

  it("C01-UT34 galat yang sama untuk pencarian dengan kategori JAGA_ALAM", () => {
    expect(() => Program.cari("mangrove", "JAGA_ALAM")).toThrow(
      "Pencarian program harus dilakukan melalui repositori data",
    );
  });

  it("C01-UT35 batas: kata kunci kosong dan kategori JAGA_IKLIM tetap ditolak dengan galat yang sama", () => {
    expect(() => Program.cari("", "JAGA_IKLIM")).toThrow(
      "Pencarian program harus dilakukan melalui repositori data",
    );
  });
});

describe("Program.aktifkan dan Program.dariBaris (operasi tambahan)", () => {
  it("C01-UT36 aktifkan mengubah MENUNGGU_VERIFIKASI menjadi AKTIF", () => {
    const program = buatProgram(StatusProgram.MENUNGGU_VERIFIKASI);
    expect(program.aktifkan()).toBe(StatusProgram.AKTIF);
    expect(program.getStatus()).toBe(StatusProgram.AKTIF);
  });

  it.each([
    StatusProgram.AKTIF,
    StatusProgram.MENUNGGU_KONFIRMASI,
    StatusProgram.PERLU_REVISI,
    StatusProgram.SELESAI,
  ])("C01-UT37 aktifkan ditolak kalau status program %s", (status) => {
    expect(() => buatProgram(status).aktifkan()).toThrow(
      "Program tidak sedang menunggu verifikasi",
    );
  });

  it("C01-UT38 dariBaris membentuk objek Program dari baris tabel beserta relasinya", () => {
    const pengelola = buatPengelola("https://hijau.example");
    const program = Program.dariBaris(
      {
        id: "prog-9",
        namaProgram: "Bersih Pantai",
        deskripsi: "Memungut sampah pantai",
        kategori: "JAGA_IKLIM",
        tempatPelaksanaan: "Pantai Indah",
        waktuMulai: MULAI,
        waktuSelesai: SELESAI,
        kuota: 20,
        syaratKetentuan: "Membawa sarung tangan",
        status: StatusProgram.AKTIF,
      },
      { pengelola },
    );
    expect(program.getIdProgram()).toBe("prog-9");
    expect(program.getNamaProgram()).toBe("Bersih Pantai");
    expect(program.getKategori()).toBe("JAGA_IKLIM");
    expect(program.getTempatPelaksanaan()).toBe("Pantai Indah");
    expect(program.getWaktuMulai()).toBe(MULAI);
    expect(program.getWaktuSelesai()).toBe(SELESAI);
    expect(program.getStatus()).toBe(StatusProgram.AKTIF);
    expect(program.ambilPengelola()).toBe(pengelola);
  });
});
