import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  inisiatorProcedure,
  publicProcedure,
  relawanProcedure,
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

export const programRouter = createTRPCRouter({
  createProgram: inisiatorProcedure
    .input(
      z
        .object({
          namaProgram: z.string().trim().min(1).max(80),
          deskripsi: z.string().trim().min(1),
          kategori: z.enum(["JAGA_ALAM", "JAGA_IKLIM"]),
          tempatPelaksanaan: z.string().trim().min(1),
          waktuMulai: z.date(),
          waktuSelesai: z.date(),
          kuota: z.number().int().positive(),
          syaratKetentuan: z.string().trim().min(1),
          urlDokumenLegalitas: z
            .string()
            .url()
            .refine((value) => /^https?:\/\//i.test(value), {
              message: "Tautan harus menggunakan HTTP atau HTTPS.",
            }),
        })
        .refine(
          (input) => input.waktuSelesai.getTime() > input.waktuMulai.getTime(),
          {
            message: "Waktu selesai harus setelah waktu mulai.",
            path: ["waktuSelesai"],
          },
        ),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await controller.simpanProgramBaru(
          ctx.session.idPengguna,
          input,
        );
      } catch (error) {
        ubahGalatProgram(error);
      }
    }),

  daftarRelawan: relawanProcedure
    .input(
      z.object({
        programId: z.string().min(1),
        keterampilan: z.string().trim().min(1, "Keterampilan wajib diisi"),
        ketersediaanWaktu: z
          .string()
          .trim()
          .min(1, "Ketersediaan waktu wajib diisi"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await controller.daftarRelawan(ctx.session.idPengguna, input);
      } catch (error) {
        ubahGalatProgram(error);
      }
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.program.findMany({
        orderBy: { waktuMulai: "desc" },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Gagal mengambil daftar program";
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: errorMessage,
      });
    }
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const program = await ctx.db.program.findUnique({
          where: { id: input.id },
        });

        if (!program) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Program tidak ditemukan",
          });
        }

        return program;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Gagal mengambil detail program";
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: errorMessage,
        });
      }
    }),
    programSaya: inisiatorProcedure.query(async ({ ctx }) => {
    try {
      return await controller.ambilProgramSaya(ctx.session.idPengguna);
    } catch (error) {
      ubahGalatProgram(error);
    }
  }),
});
