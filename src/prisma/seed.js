const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const initiatorUser = await prisma.pengguna.upsert({
    where: { email: "inisiator@rekanbumi.example" },
    update: {},
    create: {
      id: "seed-pengguna-inisiator",
      email: "inisiator@rekanbumi.example",
    },
  });

  const initiator = await prisma.inisiatorProgram.upsert({
    where: { penggunaId: initiatorUser.id },
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
      penggunaId: initiatorUser.id,
    },
  });

  const volunteerData = [
    {
      userId: "seed-pengguna-relawan-1",
      profileId: "seed-relawan-1",
      email: "relawan1@rekanbumi.example",
      nama: "Ayu Contoh",
      keterampilan: "Menanam pohon",
      ketersediaanWaktu: "Akhir pekan",
      registrationId: "seed-pendaftaran-1",
    },
    {
      userId: "seed-pengguna-relawan-2",
      profileId: "seed-relawan-2",
      email: "relawan2@rekanbumi.example",
      nama: "Bima Contoh",
      keterampilan: "Dokumentasi kegiatan",
      ketersediaanWaktu: "Sabtu pagi",
      registrationId: "seed-pendaftaran-2",
    },
  ];

  const volunteers = [];
  for (const data of volunteerData) {
    const user = await prisma.pengguna.upsert({
      where: { email: data.email },
      update: {},
      create: {
        id: data.userId,
        email: data.email,
      },
    });

    const volunteer = await prisma.relawan.upsert({
      where: { penggunaId: user.id },
      update: {
        nama: data.nama,
        noTelepon: null,
        domisili: "Kota Contoh",
        statusVerifikasi: "TERVERIFIKASI",
      },
      create: {
        id: data.profileId,
        nama: data.nama,
        domisili: "Kota Contoh",
        statusVerifikasi: "TERVERIFIKASI",
        penggunaId: user.id,
      },
    });

    volunteers.push({ ...data, volunteer });
  }

  const program = await prisma.program.upsert({
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
      inisiatorProgramId: initiator.id,
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
      inisiatorProgramId: initiator.id,
    },
  });

  for (const data of volunteers) {
    await prisma.pendaftaran.upsert({
      where: { id: data.registrationId },
      update: {
        keterampilan: data.keterampilan,
        ketersediaanWaktu: data.ketersediaanWaktu,
        status: "MENUNGGU",
        relawanId: data.volunteer.id,
        programId: program.id,
      },
      create: {
        id: data.registrationId,
        keterampilan: data.keterampilan,
        ketersediaanWaktu: data.ketersediaanWaktu,
        status: "MENUNGGU",
        relawanId: data.volunteer.id,
        programId: program.id,
      },
    });
  }

  console.log("Seed selesai: 1 program, 1 inisiator, 2 relawan, 2 pendaftaran.");
}

main()
  .catch((error) => {
    console.error("Seed gagal:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
