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
  let user = await db.user.findUnique({ where: { email }});

  if (!user) {
    const userId = await BetterAuth.daftarkanKredensial(
      email,
      KATA_SANDI_UJI,
    );
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
      relawanId: "seed-relawan-1",
      pendaftaranId: "seed-pendaftaran-1",
    },
    {
      email: "relawan2@rekanbumi.example",
      nama: "Bima Contoh",
      keterampilan: "Dokumentasi kegiatan",
      ketersediaanWaktu: "Sabtu pagi",
      relawanId: "seed-relawan-2",
      pendaftaranId: "seed-pendaftaran-2",
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
        domisili: "Kota Contoh",
        statusVerifikasi: "TERVERIFIKASI",
      },
      create: {
        id: data.relawanId,
        nama: data.nama,
        domisili: "Kota Contoh",
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

  for (const data of relawan) {
    await db.pendaftaran.upsert({
      where: { id: data.pendaftaranId },
      update: {
        keterampilan: data.keterampilan,
        ketersediaanWaktu: data.ketersediaanWaktu,
        status: "MENUNGGU",
        relawanId: data.profil.id,
        programId: program.id,
      },
      create: {
        id: data.pendaftaranId,
        keterampilan: data.keterampilan,
        ketersediaanWaktu: data.ketersediaanWaktu,
        status: "MENUNGGU",
        relawanId: data.profil.id,
        programId: program.id,
      },
    });
  }

  // Data laporan akhir (UC07): satu menunggu ditinjau, satu perlu revisi.
  const dasarProgramLaporan = {
    deskripsi: "Program fiktif untuk mencoba alur laporan akhir dan verifikasi.",
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
    update: { statusPeninjauan: "MENUNGGU", catatanRevisi: null, verifikatorId: null },
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
    "Seed selesai: 3 program, 1 inisiator, 2 relawan, 1 verifikator, 2 pendaftaran, 2 laporan.",
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
