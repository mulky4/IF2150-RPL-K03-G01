-- Add per-registration delivery marker and preserve notifications already sent
-- through the previous per-program marker.
ALTER TABLE "tbl_pendaftaran"
    ADD COLUMN "notifikasiTerkirimAt" TIMESTAMP(3);

UPDATE "tbl_pendaftaran" AS pendaftaran
SET "notifikasiTerkirimAt" = program."hasilSeleksiDiumumkanAt"
FROM "tbl_program" AS program
WHERE pendaftaran."programId" = program."id"
  AND pendaftaran."status" IN ('DITERIMA', 'DITOLAK')
  AND program."hasilSeleksiDiumumkanAt" IS NOT NULL;

ALTER TABLE "tbl_program"
    DROP COLUMN "hasilSeleksiDiumumkanAt";
