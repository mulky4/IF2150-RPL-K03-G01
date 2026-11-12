DROP INDEX "tbl_laporan_program_programId_key";

CREATE INDEX "tbl_laporan_program_programId_idx"
    ON "tbl_laporan_program"("programId");
CREATE INDEX "tbl_laporan_program_statusPeninjauan_waktuPengajuan_idx"
    ON "tbl_laporan_program"("statusPeninjauan", "waktuPengajuan");
