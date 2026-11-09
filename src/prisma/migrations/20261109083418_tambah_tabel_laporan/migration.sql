-- CreateEnum
CREATE TYPE "StatusLaporan" AS ENUM ('MENUNGGU', 'DISETUJUI', 'DITOLAK');

-- CreateTable
CREATE TABLE "tbl_laporan" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "tautanDokumen" TEXT,
    "status" "StatusLaporan" NOT NULL DEFAULT 'MENUNGGU',
    "catatanVerifikasi" TEXT,
    "pengajuId" TEXT NOT NULL,
    "verifikatorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_laporan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbl_laporan" ADD CONSTRAINT "tbl_laporan_pengajuId_fkey" FOREIGN KEY ("pengajuId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_laporan" ADD CONSTRAINT "tbl_laporan_verifikatorId_fkey" FOREIGN KEY ("verifikatorId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
