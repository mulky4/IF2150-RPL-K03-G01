import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, inisiatorProcedure } from "~/server/api/trpc";
import {
  GalatSeleksi,
  SeleksiController,
} from "~/server/controllers/SeleksiController";

const controller = new SeleksiController();

function ubahGalatSeleksi(error: unknown): never {
  if (error instanceof GalatSeleksi) {
    throw new TRPCError({ code: error.code, message: error.message });
  }
  throw error;
}

export const seleksiRouter = createTRPCRouter({
  lihatDaftarRelawan: inisiatorProcedure
    .input(z.object({ idProgram: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      try {
        return await controller.lihatDaftarRelawan(
          ctx.session.idPengguna,
          input.idProgram,
        );
      } catch (error) {
        ubahGalatSeleksi(error);
      }
    }),

  simpanHasilSeleksi: inisiatorProcedure
    .input(
      z.object({
        idProgram: z.string().min(1),
        keputusan: z
          .array(
            z.object({
              idPendaftaran: z.string().min(1),
              status: z.enum(["DITERIMA", "DITOLAK"]),
            }),
          )
          .min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await controller.simpanHasilSeleksi(
          ctx.session.idPengguna,
          input.idProgram,
          input.keputusan,
        );
      } catch (error) {
        ubahGalatSeleksi(error);
      }
    }),

  konfirmasiHasilSeleksi: inisiatorProcedure
    .input(z.object({ idProgram: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await controller.konfirmasiHasilSeleksi(
          ctx.session.idPengguna,
          input.idProgram,
        );
      } catch (error) {
        ubahGalatSeleksi(error);
      }
    }),
});
