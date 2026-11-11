import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  inisiatorProcedure,
  verifikatorProcedure,
} from "~/server/api/trpc";
import {
  GalatProgram,
  ProgramController,
} from "~/server/controllers/ProgramController";

const controller = new ProgramController();

function ubahGalatProgram(error: unknown): never {
  if (error instanceof GalatProgram) {
    throw new TRPCError({ code: error.code, message: error.message });
  }
  throw error;
}

export const laporanRouter = createTRPCRouter({
  // Protected: Membutuhkan role ISIATOR
  programUntukLaporan: inisiatorProcedure.query(({ ctx }) =>
    controller.ambilProgramUntukLaporan(ctx.session.idPengguna),
  ),

  // Protected: Membutuhkan role ISIATOR
  buatLaporan: inisiatorProcedure
    .input(
      z.object({
        programId: z.string().min(1, "ID Program wajib diisi"),
        ringkasanCapaian: z.string().trim().min(1),
        dokumentasi: z
          .array(
            z
              .string()
              .url()
              .refine((value) => /^https?:\/\//i.test(value), {
                message: "Tautan harus menggunakan HTTP atau HTTPS.",
              }),
          )
          .min(1, "Minimal satu dokumentasi wajib disertakan."),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const status = await controller.ajukanLaporanAkhir(
          ctx.session.idPengguna,
          input,
        );
        return { status };
      } catch (error) {
        ubahGalatProgram(error);
      }
    }),

  // Protected: Membutuhkan role VERIFIKATOR
  ambilDaftar: verifikatorProcedure.query(() =>
    controller.ambilDaftarLaporan(),
  ),

  // Protected: Membutuhkan role VERIFIKATOR
  tinjauLaporan: verifikatorProcedure
    .input(z.object({ idLaporan: z.string().min(1) }))
    .query(async ({ input }) => {
      try {
        return await controller.tinjauLaporan(input.idLaporan);
      } catch (error) {
        ubahGalatProgram(error);
      }
    }),

  // Protected: Membutuhkan role VERIFIKATOR
  verifikasiLaporan: verifikatorProcedure
    .input(
      z.object({
        idLaporan: z.string().min(1),
        status: z.enum(["DISETUJUI", "DITOLAK"]),
        catatan: z.string().trim().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const statusProgram =
          input.status === "DISETUJUI"
            ? await controller.konfirmasiLaporan(
                input.idLaporan,
                ctx.session.idPengguna,
              )
            : await controller.tolakLaporan(
                input.idLaporan,
                ctx.session.idPengguna,
                input.catatan ?? "",
              );
        return { statusProgram };
      } catch (error) {
        ubahGalatProgram(error);
      }
    }),
});