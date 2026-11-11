CREATE TYPE "StatusPeninjauan" AS ENUM ('MENUNGGU', 'DISETUJUI', 'DITOLAK');

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

CREATE INDEX "tbl_laporan_program_statusPeninjauan_waktuPengajuan_idx"
    ON "tbl_laporan_program"("statusPeninjauan", "waktuPengajuan");
CREATE INDEX "tbl_laporan_program_programId_idx"
    ON "tbl_laporan_program"("programId");

ALTER TABLE "tbl_laporan_program"
    ADD CONSTRAINT "tbl_laporan_program_programId_fkey"
    FOREIGN KEY ("programId") REFERENCES "tbl_program"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "tbl_laporan_program"
    ADD CONSTRAINT "tbl_laporan_program_verifikatorId_fkey"
    FOREIGN KEY ("verifikatorId") REFERENCES "user"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
