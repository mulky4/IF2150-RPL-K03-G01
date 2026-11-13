import { randomUUID } from "node:crypto";

import { BetterAuth } from "~/server/adapters/BetterAuth";
import { db } from "~/server/db";
import { Peran } from "~/server/models/enums";

const KATA_SANDI_UJI = "DemoRekanBumi2026!";

type AkunSeed = {
  email: string;
  nama: string;
  peran: Peran;
};

async function seedAkun({ email, nama, peran }: AkunSeed): Promise<string> {
  let user = await db.user.findUnique({ where: { email } });

  if (!user) {
    const userId = await BetterAuth.daftarkanKredensial(email, KATA_SANDI_UJI);
    user = await db.user.findUniqueOrThrow({ where: { id: userId } });
  }

  const akunKredensial = await db.account.findFirst({
    where: { userId: user.id, providerId: "credential" },
  });
  const password = await BetterAuth.hashKataSandi(KATA_SANDI_UJI);
  if (akunKredensial) {
    await db.account.update({
      where: { id: akunKredensial.id },
      data: { password },
    });
  } else {
    await db.account.create({
      data: {
        id: randomUUID(),
        accountId: email,
        providerId: "credential",
        userId: user.id,
        password,
      },
    });
  }

  await db.user.update({
    where: { id: user.id },
    data: { name: nama, peran, emailVerified: true },
  });
  return user.id;
}

type PendaftaranSeed = {
  id: string;
  keterampilan: string;
  ketersediaanWaktu: string;
  status: "MENUNGGU" | "DITERIMA" | "DITOLAK";
  notifikasiTerkirimAt: Date | null;
  relawanId: string;
  programId: string;
};

// Kunci pasangan program-relawan, bukan id, supaya seed tetap jalan walaupun
// relawan yang sama sudah mendaftar manual ke program itu sebelumnya.
async function seedPendaftaran({ id, ...data }: PendaftaranSeed) {
  await db.pendaftaran.upsert({
    where: {
      programId_relawanId: {
        programId: data.programId,
        relawanId: data.relawanId,
      },
    },
    update: data,
    create: { id, ...data },
  });
}

async function main() {
  const inisiatorId = await seedAkun({
    email: "inisiator@rekanbumi.example",
    nama: "Inisiator Contoh",
    peran: Peran.INISIATOR,
  });
  const relawanData = [
    {
      email: "relawan1@rekanbumi.example",
      nama: "Ayu Contoh",
      keterampilan: "Menanam pohon",
      ketersediaanWaktu: "Akhir pekan",
      noTelepon: "081200000001",
      domisili: "Kota Contoh",
      relawanId: "seed-relawan-1",
    },
    {
      email: "relawan2@rekanbumi.example",
      nama: "Bima Contoh",
      keterampilan: "Dokumentasi kegiatan",
      ketersediaanWaktu: "Sabtu pagi",
      noTelepon: "081200000002",
      domisili: "Kota Contoh",
      relawanId: "seed-relawan-2",
    },
    // Profil sengaja belum lengkap (tanpa nomor telepon dan domisili) untuk
    // menguji penolakan pendaftaran relawan yang datanya belum lengkap.
    {
      email: "relawan3@rekanbumi.example",
      nama: "Citra Contoh",
      keterampilan: "Edukasi lingkungan",
      ketersediaanWaktu: "Minggu sore",
      noTelepon: null,
      domisili: null,
      relawanId: "seed-relawan-3",
    },
  ];

  const relawan = [];
  for (const data of relawanData) {
    const userId = await seedAkun({
      email: data.email,
      nama: data.nama,
      peran: Peran.RELAWAN,
    });
    const profil = await db.relawan.upsert({
      where: { userId },
      update: {
        nama: data.nama,
        noTelepon: data.noTelepon,
        domisili: data.domisili,
        statusVerifikasi: "TERVERIFIKASI",
      },
      create: {
        id: data.relawanId,
        nama: data.nama,
        noTelepon: data.noTelepon,
        domisili: data.domisili,
        statusVerifikasi: "TERVERIFIKASI",
        userId,
      },
    });
    await db.riwayatKontribusi.upsert({
      where: { relawanId: profil.id },
      update: {},
      create: { relawanId: profil.id },
    });
    relawan.push({ ...data, profil });
  }

  const verifikatorId = await seedAkun({
    email: "verifikator@rekanbumi.example",
    nama: "Verifikator Contoh",
    peran: Peran.VERIFIKATOR,
  });

  const inisiator = await db.inisiatorProgram.upsert({
    where: { userId: inisiatorId },
    update: {
      namaLembaga: "Komunitas Hijau Contoh",
      tautanSitusResmi: "https://example.org",
      statusVerifikasi: "TERVERIFIKASI",
    },
    create: {
      id: "seed-inisiator",
      namaLembaga: "Komunitas Hijau Contoh",
      tautanSitusResmi: "https://example.org",
      statusVerifikasi: "TERVERIFIKASI",
      userId: inisiatorId,
    },
  });

  // Lembaga yang belum diverifikasi, untuk menguji penolakan program baru.
  const inisiator2Id = await seedAkun({
    email: "inisiator2@rekanbumi.example",
    nama: "Inisiator Kedua",
    peran: Peran.INISIATOR,
  });
  await db.inisiatorProgram.upsert({
    where: { userId: inisiator2Id },
    update: {
      namaLembaga: "Yayasan Contoh Baru",
      tautanSitusResmi: "https://example.org/yayasan-baru",
      statusVerifikasi: "MENUNGGU",
    },
    create: {
      id: "seed-inisiator-2",
      namaLembaga: "Yayasan Contoh Baru",
      tautanSitusResmi: "https://example.org/yayasan-baru",
      statusVerifikasi: "MENUNGGU",
      userId: inisiator2Id,
    },
  });

  const program = await db.program.upsert({
    where: { id: "seed-program-penanaman-pohon" },
    update: {
      namaProgram: "Penanaman Pohon Bersama",
      deskripsi: "Program fiktif untuk mencoba alur pendaftaran dan seleksi.",
      kategori: "JAGA_ALAM",
      tempatPelaksanaan: "Taman Kota Contoh",
      waktuMulai: new Date("2026-12-05T08:00:00.000Z"),
      waktuSelesai: new Date("2026-12-05T12:00:00.000Z"),
      kuota: 1,
      syaratKetentuan: "Tidak ada syarat khusus untuk data uji.",
      status: "AKTIF",
      inisiatorProgramId: inisiator.id,
    },
    create: {
      id: "seed-program-penanaman-pohon",
      namaProgram: "Penanaman Pohon Bersama",
      deskripsi: "Program fiktif untuk mencoba alur pendaftaran dan seleksi.",
      kategori: "JAGA_ALAM",
      tempatPelaksanaan: "Taman Kota Contoh",
      waktuMulai: new Date("2026-12-05T08:00:00.000Z"),
      waktuSelesai: new Date("2026-12-05T12:00:00.000Z"),
      kuota: 1,
      syaratKetentuan: "Tidak ada syarat khusus untuk data uji.",
      status: "AKTIF",
      inisiatorProgramId: inisiator.id,
    },
  });

  for (const [indeks, data] of relawan.slice(0, 2).entries()) {
    const status = indeks === 0 ? "DITERIMA" : "MENUNGGU";
    await seedPendaftaran({
      id: `seed-pendaftaran-${indeks + 1}`,
      keterampilan: data.keterampilan,
      ketersediaanWaktu: data.ketersediaanWaktu,
      status,
      notifikasiTerkirimAt: null,
      relawanId: data.profil.id,
      programId: program.id,
    });
  }

  const sekarang = new Date();

  // Program aktif yang belum dimulai dan kuotanya masih ada. relawan1 sengaja
  // belum mendaftar di sini supaya alur pendaftaran bisa dicoba dari awal.
  const dataProgramDibuka = {
    namaProgram: "Susur Pantai Bersih",
    deskripsi: "Program fiktif yang masih membuka pendaftaran.",
    kategori: "JAGA_IKLIM" as const,
    tempatPelaksanaan: "Pantai Contoh",
    waktuMulai: new Date(sekarang.getTime() + 14 * 24 * 60 * 60 * 1000),
    waktuSelesai: new Date(
      sekarang.getTime() + 14 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000,
    ),
    kuota: 5,
    syaratKetentuan: "Membawa botol minum sendiri.",
    status: "AKTIF" as const,
    inisiatorProgramId: inisiator.id,
  };
  const programDibuka = await db.program.upsert({
    where: { id: "seed-program-dibuka" },
    update: dataProgramDibuka,
    create: { id: "seed-program-dibuka", ...dataProgramDibuka },
  });
  await seedPendaftaran({
    id: "seed-pendaftaran-ditolak",
    keterampilan: relawan[1]!.keterampilan,
    ketersediaanWaktu: relawan[1]!.ketersediaanWaktu,
    status: "DITOLAK",
    notifikasiTerkirimAt: null,
    relawanId: relawan[1]!.profil.id,
    programId: programDibuka.id,
  });
  const programBerlangsung = await db.program.upsert({
    where: { id: "seed-program-berlangsung" },
    update: {
      namaProgram: "Aksi Bersih Sungai",
      deskripsi: "Program fiktif yang sedang berlangsung untuk uji check-in.",
      kategori: "JAGA_ALAM",
      tempatPelaksanaan: "Sungai Contoh",
      waktuMulai: new Date(sekarang.getTime() - 60 * 60 * 1000),
      waktuSelesai: new Date(sekarang.getTime() + 3 * 60 * 60 * 1000),
      kuota: 10,
      syaratKetentuan: "Tidak ada syarat khusus untuk data uji.",
      status: "AKTIF",
      inisiatorProgramId: inisiator.id,
    },
    create: {
      id: "seed-program-berlangsung",
      namaProgram: "Aksi Bersih Sungai",
      deskripsi: "Program fiktif yang sedang berlangsung untuk uji check-in.",
      kategori: "JAGA_ALAM",
      tempatPelaksanaan: "Sungai Contoh",
      waktuMulai: new Date(sekarang.getTime() - 60 * 60 * 1000),
      waktuSelesai: new Date(sekarang.getTime() + 3 * 60 * 60 * 1000),
      kuota: 10,
      syaratKetentuan: "Tidak ada syarat khusus untuk data uji.",
      status: "AKTIF",
      inisiatorProgramId: inisiator.id,
    },
  });
  const pendaftaranBerlangsung = {
    id: "seed-pendaftaran-berlangsung",
    keterampilan: relawan[1]!.keterampilan,
    ketersediaanWaktu: relawan[1]!.ketersediaanWaktu,
    status: "DITERIMA" as const,
    notifikasiTerkirimAt: null,
    relawanId: relawan[1]!.profil.id,
    programId: programBerlangsung.id,
  };
  await seedPendaftaran(pendaftaranBerlangsung);
  const pendaftaranBerlangsungMenunggu = {
    id: "seed-pendaftaran-berlangsung-menunggu",
    keterampilan: relawan[0]!.keterampilan,
    ketersediaanWaktu: relawan[0]!.ketersediaanWaktu,
    status: "MENUNGGU" as const,
    notifikasiTerkirimAt: null,
    relawanId: relawan[0]!.profil.id,
    programId: programBerlangsung.id,
  };
  await seedPendaftaran(pendaftaranBerlangsungMenunggu);

  const waktuSelesai = new Date(sekarang.getTime() - 24 * 60 * 60 * 1000);
  const programSelesai = await db.program.upsert({
    where: { id: "seed-program-selesai" },
    update: {
      namaProgram: "Penanaman Mangrove Selesai",
      deskripsi: "Program fiktif selesai untuk uji portofolio.",
      kategori: "JAGA_ALAM",
      tempatPelaksanaan: "Pesisir Contoh",
      waktuMulai: new Date(waktuSelesai.getTime() - 4 * 60 * 60 * 1000),
      waktuSelesai,
      kuota: 10,
      syaratKetentuan: "Tidak ada syarat khusus untuk data uji.",
      status: "SELESAI",
      inisiatorProgramId: inisiator.id,
    },
    create: {
      id: "seed-program-selesai",
      namaProgram: "Penanaman Mangrove Selesai",
      deskripsi: "Program fiktif selesai untuk uji portofolio.",
      kategori: "JAGA_ALAM",
      tempatPelaksanaan: "Pesisir Contoh",
      waktuMulai: new Date(waktuSelesai.getTime() - 4 * 60 * 60 * 1000),
      waktuSelesai,
      kuota: 10,
      syaratKetentuan: "Tidak ada syarat khusus untuk data uji.",
      status: "SELESAI",
      inisiatorProgramId: inisiator.id,
    },
  });
  const pendaftaranSelesai = {
    id: "seed-pendaftaran-selesai",
    keterampilan: relawan[0]!.keterampilan,
    ketersediaanWaktu: relawan[0]!.ketersediaanWaktu,
    status: "DITERIMA" as const,
    notifikasiTerkirimAt: null,
    relawanId: relawan[0]!.profil.id,
    programId: programSelesai.id,
  };
  await seedPendaftaran(pendaftaranSelesai);
  const kehadiranSelesai = {
    relawanId: relawan[0]!.profil.id,
    programId: programSelesai.id,
    waktuKehadiran: new Date(waktuSelesai.getTime() - 3 * 60 * 60 * 1000),
  };
  await db.kehadiran.upsert({
    where: {
      relawanId_programId: {
        relawanId: kehadiranSelesai.relawanId,
        programId: kehadiranSelesai.programId,
      },
    },
    update: { waktuKehadiran: kehadiranSelesai.waktuKehadiran },
    create: kehadiranSelesai,
  });
  const riwayatRelawan = relawan[0]!.profil.id;
  const riwayat = await db.riwayatKontribusi.upsert({
    where: { relawanId: riwayatRelawan },
    update: { totalJamAksi: 4 },
    create: { relawanId: riwayatRelawan, totalJamAksi: 4 },
  });
  await db.riwayatProgram.upsert({
    where: {
      riwayatId_programId: {
        riwayatId: riwayat.id,
        programId: programSelesai.id,
      },
    },
    update: {},
    create: { riwayatId: riwayat.id, programId: programSelesai.id },
  });

  await db.program.upsert({
    where: { id: "seed-program-menunggu-verifikasi" },
    update: {
      namaProgram: "Program Menunggu Verifikasi",
      deskripsi: "Program fiktif untuk menguji status verifikasi program.",
      kategori: "JAGA_IKLIM",
      tempatPelaksanaan: "Kota Contoh",
      waktuMulai: new Date(sekarang.getTime() + 7 * 24 * 60 * 60 * 1000),
      waktuSelesai: new Date(
        sekarang.getTime() + 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000,
      ),
      kuota: 5,
      syaratKetentuan: "Tidak ada syarat khusus untuk data uji.",
      status: "MENUNGGU_VERIFIKASI",
      inisiatorProgramId: inisiator.id,
    },
    create: {
      id: "seed-program-menunggu-verifikasi",
      namaProgram: "Program Menunggu Verifikasi",
      deskripsi: "Program fiktif untuk menguji status verifikasi program.",
      kategori: "JAGA_IKLIM",
      tempatPelaksanaan: "Kota Contoh",
      waktuMulai: new Date(sekarang.getTime() + 7 * 24 * 60 * 60 * 1000),
      waktuSelesai: new Date(
        sekarang.getTime() + 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000,
      ),
      kuota: 5,
      syaratKetentuan: "Tidak ada syarat khusus untuk data uji.",
      status: "MENUNGGU_VERIFIKASI",
      inisiatorProgramId: inisiator.id,
    },
  });

  // Data laporan akhir (UC07): satu menunggu ditinjau, satu perlu revisi.
  const dasarProgramLaporan = {
    deskripsi:
      "Program fiktif untuk mencoba alur laporan akhir dan verifikasi.",
    kategori: "JAGA_ALAM",
    tempatPelaksanaan: "Taman Kota Contoh",
    waktuMulai: new Date("2026-11-01T01:00:00.000Z"),
    waktuSelesai: new Date("2026-11-01T05:00:00.000Z"),
    kuota: 20,
    syaratKetentuan: "Tidak ada syarat khusus untuk data uji.",
    inisiatorProgramId: inisiator.id,
  } as const;

  const programMenunggu = await db.program.upsert({
    where: { id: "seed-program-laporan-menunggu" },
    update: { status: "MENUNGGU_KONFIRMASI" },
    create: {
      id: "seed-program-laporan-menunggu",
      namaProgram: "Tanam Mangrove Muara Angke",
      ...dasarProgramLaporan,
      status: "MENUNGGU_KONFIRMASI",
    },
  });
  const programRevisi = await db.program.upsert({
    where: { id: "seed-program-laporan-revisi" },
    update: { status: "PERLU_REVISI" },
    create: {
      id: "seed-program-laporan-revisi",
      namaProgram: "Bersih Kali Ciliwung",
      ...dasarProgramLaporan,
      status: "PERLU_REVISI",
    },
  });

  await db.laporanProgram.upsert({
    where: { id: "seed-laporan-menunggu" },
    update: {
      statusPeninjauan: "MENUNGGU",
      catatanRevisi: null,
      verifikatorId: null,
    },
    create: {
      id: "seed-laporan-menunggu",
      programId: programMenunggu.id,
      ringkasanCapaian:
        "1.000 bibit mangrove tertanam di zona abrasi bersama 23 relawan yang hadir.",
      dokumentasiAkhir: [
        "https://example.org/dokumentasi/muara-angke-1",
        "https://example.org/dokumentasi/muara-angke-2",
      ],
      statusPeninjauan: "MENUNGGU",
    },
  });
  await db.laporanProgram.upsert({
    where: { id: "seed-laporan-revisi" },
    update: {
      statusPeninjauan: "DITOLAK",
      catatanRevisi: "Foto kurang jelas dan jumlah bibit belum sesuai.",
      verifikatorId,
    },
    create: {
      id: "seed-laporan-revisi",
      programId: programRevisi.id,
      ringkasanCapaian: "Pembersihan bantaran Ciliwung bersama 20 relawan.",
      dokumentasiAkhir: ["https://example.org/dokumentasi/ciliwung-1"],
      statusPeninjauan: "DITOLAK",
      catatanRevisi: "Foto kurang jelas dan jumlah bibit belum sesuai.",
      verifikatorId,
    },
  });

  console.log(
    "Seed selesai: 7 program, 2 inisiator, 3 relawan, 1 verifikator, 6 pendaftaran, 2 laporan.",
  );
}

main()
  .catch((error) => {
    console.error("Seed gagal:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
