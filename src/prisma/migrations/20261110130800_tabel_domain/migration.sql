-- CreateEnum
CREATE TYPE "KategoriProgram" AS ENUM ('JAGA_ALAM', 'JAGA_IKLIM');

-- CreateEnum
CREATE TYPE "StatusProgram" AS ENUM ('MENUNGGU_VERIFIKASI', 'AKTIF', 'MENUNGGU_KONFIRMASI', 'PERLU_REVISI', 'SELESAI');

-- CreateEnum
CREATE TYPE "StatusPendaftaran" AS ENUM ('MENUNGGU', 'DITERIMA', 'DITOLAK');

-- CreateEnum
CREATE TYPE "StatusVerifikasi" AS ENUM ('MENUNGGU', 'TERVERIFIKASI', 'DITOLAK');

-- CreateTable
CREATE TABLE "tbl_program" (
    "id" TEXT NOT NULL,
    "namaProgram" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "kategori" "KategoriProgram" NOT NULL,
    "tempatPelaksanaan" TEXT NOT NULL,
    "waktuMulai" TIMESTAMP(3) NOT NULL,
    "waktuSelesai" TIMESTAMP(3) NOT NULL,
    "kuota" INTEGER NOT NULL,
    "syaratKetentuan" TEXT NOT NULL,
    "status" "StatusProgram" NOT NULL DEFAULT 'MENUNGGU_VERIFIKASI',
    "inisiatorProgramId" TEXT NOT NULL,

    CONSTRAINT "tbl_program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_pendaftaran" (
    "id" TEXT NOT NULL,
    "keterampilan" TEXT NOT NULL,
    "ketersediaanWaktu" TEXT NOT NULL,
    "status" "StatusPendaftaran" NOT NULL DEFAULT 'MENUNGGU',
    "waktuDaftar" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "relawanId" TEXT NOT NULL,
    "programId" TEXT NOT NULL,

    CONSTRAINT "tbl_pendaftaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_relawan" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "noTelepon" TEXT,
    "domisili" TEXT,
    "statusVerifikasi" "StatusVerifikasi" NOT NULL DEFAULT 'MENUNGGU',
    "userId" TEXT NOT NULL,

    CONSTRAINT "tbl_relawan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_inisiator_program" (
    "id" TEXT NOT NULL,
    "namaLembaga" TEXT NOT NULL,
    "tautanSitusResmi" TEXT,
    "statusVerifikasi" "StatusVerifikasi" NOT NULL DEFAULT 'MENUNGGU',
    "userId" TEXT NOT NULL,

    CONSTRAINT "tbl_inisiator_program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_dokumen_verifikasi" (
    "id" TEXT NOT NULL,
    "jenisDokumen" TEXT NOT NULL,
    "urlFile" TEXT NOT NULL,
    "statusVerifikasi" "StatusVerifikasi" NOT NULL DEFAULT 'MENUNGGU',
    "userId" TEXT NOT NULL,

    CONSTRAINT "tbl_dokumen_verifikasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_notifikasi" (
    "id" TEXT NOT NULL,
    "pesan" TEXT NOT NULL,
    "waktuKirim" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusDibaca" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "tbl_notifikasi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_relawan_userId_key" ON "tbl_relawan"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_inisiator_program_userId_key" ON "tbl_inisiator_program"("userId");

-- AddForeignKey
ALTER TABLE "tbl_program" ADD CONSTRAINT "tbl_program_inisiatorProgramId_fkey" FOREIGN KEY ("inisiatorProgramId") REFERENCES "tbl_inisiator_program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_pendaftaran" ADD CONSTRAINT "tbl_pendaftaran_relawanId_fkey" FOREIGN KEY ("relawanId") REFERENCES "tbl_relawan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_pendaftaran" ADD CONSTRAINT "tbl_pendaftaran_programId_fkey" FOREIGN KEY ("programId") REFERENCES "tbl_program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_relawan" ADD CONSTRAINT "tbl_relawan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_inisiator_program" ADD CONSTRAINT "tbl_inisiator_program_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_dokumen_verifikasi" ADD CONSTRAINT "tbl_dokumen_verifikasi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_notifikasi" ADD CONSTRAINT "tbl_notifikasi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
