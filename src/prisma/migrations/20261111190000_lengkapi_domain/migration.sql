-- AlterTable
ALTER TABLE "tbl_relawan" ADD COLUMN "totalJamAksi" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateEnum
CREATE TYPE "StatusPeninjauan" AS ENUM ('MENUNGGU', 'DISETUJUI', 'DITOLAK');

-- CreateTable
CREATE TABLE "tbl_kehadiran" (
    "id" TEXT NOT NULL,
    "waktuKehadiran" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "relawanId" TEXT NOT NULL,
    "programId" TEXT NOT NULL,

    CONSTRAINT "tbl_kehadiran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_laporan_program" (
    "id" TEXT NOT NULL,
    "dokumentasiAkhir" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "ringkasanCapaian" TEXT NOT NULL,
    "catatanRevisi" TEXT,
    "statusPeninjauan" "StatusPeninjauan" NOT NULL DEFAULT 'MENUNGGU',
    "waktuPengajuan" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "programId" TEXT NOT NULL,
    "verifikatorId" TEXT,

    CONSTRAINT "tbl_laporan_program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_riwayat_kontribusi" (
    "id" TEXT NOT NULL,
    "totalJamAksi" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "relawanId" TEXT NOT NULL,

    CONSTRAINT "tbl_riwayat_kontribusi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_riwayat_program" (
    "riwayatId" TEXT NOT NULL,
    "programId" TEXT NOT NULL,

    CONSTRAINT "tbl_riwayat_program_pkey" PRIMARY KEY ("riwayatId", "programId")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_kehadiran_relawanId_programId_key" ON "tbl_kehadiran"("relawanId", "programId");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_laporan_program_programId_key" ON "tbl_laporan_program"("programId");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_riwayat_kontribusi_relawanId_key" ON "tbl_riwayat_kontribusi"("relawanId");

-- AddForeignKey
ALTER TABLE "tbl_kehadiran" ADD CONSTRAINT "tbl_kehadiran_relawanId_fkey" FOREIGN KEY ("relawanId") REFERENCES "tbl_relawan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_kehadiran" ADD CONSTRAINT "tbl_kehadiran_programId_fkey" FOREIGN KEY ("programId") REFERENCES "tbl_program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_laporan_program" ADD CONSTRAINT "tbl_laporan_program_programId_fkey" FOREIGN KEY ("programId") REFERENCES "tbl_program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_laporan_program" ADD CONSTRAINT "tbl_laporan_program_verifikatorId_fkey" FOREIGN KEY ("verifikatorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_riwayat_kontribusi" ADD CONSTRAINT "tbl_riwayat_kontribusi_relawanId_fkey" FOREIGN KEY ("relawanId") REFERENCES "tbl_relawan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_riwayat_program" ADD CONSTRAINT "tbl_riwayat_program_riwayatId_fkey" FOREIGN KEY ("riwayatId") REFERENCES "tbl_riwayat_kontribusi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_riwayat_program" ADD CONSTRAINT "tbl_riwayat_program_programId_fkey" FOREIGN KEY ("programId") REFERENCES "tbl_program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
