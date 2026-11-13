CREATE UNIQUE INDEX "tbl_pendaftaran_programId_relawanId_key"
    ON "tbl_pendaftaran"("programId", "relawanId");

ALTER TABLE "tbl_pendaftaran"
    ADD COLUMN "notifikasiTerkirimAt" TIMESTAMP(3);
