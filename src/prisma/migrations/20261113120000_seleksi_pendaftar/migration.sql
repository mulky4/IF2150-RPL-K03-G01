-- CreateIndex
CREATE UNIQUE INDEX "tbl_pendaftaran_programId_relawanId_key"
    ON "tbl_pendaftaran"("programId", "relawanId");

-- AlterTable
ALTER TABLE "tbl_program" ADD COLUMN "hasilSeleksiDiumumkanAt" TIMESTAMP(3);
