import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { GalatValidasi } from "~/lib/galat";
import { createTRPCRouter, relawanProcedure } from "~/server/api/trpc";
import { PresensiController } from "~/server/controllers/PresensiController";

/** Prosedur relawan yang sekalian membawa id relawan dari akun yang login. */
const prosedurRelawan = relawanProcedure.use(async ({ ctx, next }) => {
  const idRelawan = await PresensiController.cariIdRelawan(
    ctx.session.idPengguna,
  );
  if (idRelawan === null) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Data relawan untuk akun ini tidak ditemukan.",
    });
  }
  return next({ ctx: { ...ctx, idRelawan } });
});

const inputProgram = z.object({ idProgram: z.string().min(1) });

export const presensiRouter = createTRPCRouter({
  daftarKegiatan: prosedurRelawan.query(({ ctx }) =>
    PresensiController.ambilDaftarKegiatan(ctx.idRelawan),
  ),

  validasiStatusRelawan: prosedurRelawan
    .input(inputProgram)
    .query(({ ctx, input }) =>
      PresensiController.validasiStatusRelawan(input.idProgram, ctx.idRelawan),
    ),

  // Waktu yang dicek selalu waktu server, bukan jam di perangkat pengguna.
  validasiWaktuPelaksanaan: prosedurRelawan
    .input(inputProgram)
    .query(({ input }) =>
      PresensiController.validasiWaktuPelaksanaan(input.idProgram, new Date()),
    ),

  ambilKeteranganWaktu: prosedurRelawan
    .input(inputProgram)
    .query(({ input }) =>
      PresensiController.ambilKeteranganWaktu(input.idProgram),
    ),

  prosesCheckIn: prosedurRelawan
    .input(inputProgram)
    .mutation(async ({ ctx, input }) => {
      try {
        const kehadiran = await PresensiController.prosesCheckIn(
          input.idProgram,
          ctx.idRelawan,
        );
        return { waktuKehadiran: kehadiran.getWaktuKehadiran() };
      } catch (galat) {
        if (galat instanceof GalatValidasi) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: galat.message,
            cause: galat,
          });
        }
        throw galat;
      }
    }),
});
