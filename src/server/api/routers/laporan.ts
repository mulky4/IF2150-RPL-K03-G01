import { z } from "zod";
import {
  createTRPCRouter,
  inisiatorProcedure,
  verifikatorProcedure,
} from "~/server/api/trpc";

export const laporanRouter = createTRPCRouter({
  /** Modul I-09: Inisiator mengajukan laporan program */
  buatLaporan: inisiatorProcedure
    .input(
      z.object({
        programId: z.string().min(1, "ID Program wajib diisi"),
        deskripsi: z.string().min(10, "Deskripsi minimal 10 karakter"),
        urlBerkas: z.string().min(1, "Berkas laporan wajib diunggah"),
      }),
    )
    .mutation(async () => {
      return { keberhasilan: true as const, id: "laporan-baru-id" };
    }),

  /** Modul I-10: Verifikator melihat daftar seluruh laporan */
  ambilDaftar: verifikatorProcedure.query(async () => {
    return [];
  }),

  /** Modul I-10: Verifikator menyetujui atau menolak laporan */
  verifikasiLaporan: verifikatorProcedure
    .input(
      z.object({
        idLaporan: z.string().min(1),
        status: z.enum(["DISETUJUI", "DITOLAK"]),
        catatan: z.string().optional(),
      }),
    )
    .mutation(async () => {
      return { keberhasilan: true as const };
    }),
});