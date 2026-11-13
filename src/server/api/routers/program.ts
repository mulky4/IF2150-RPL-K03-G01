import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  inisiatorProcedure,
  publicProcedure,
  relawanProcedure,
  verifikatorProcedure,
} from "~/server/api/trpc";
import { MAKS_DIMUAT, JUMLAH_PER_MUAT } from "~/lib/pencarianProgram";
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
  /** Pencarian untuk halaman Eksplorasi. Kata kunci kosong dan tanpa kategori = semua program aktif. */
  cari: publicProcedure
    .input(
      z.object({
        kataKunci: z.string().max(100).default(""),
        kategori: z.enum(["JAGA_ALAM", "JAGA_IKLIM"]).nullish(),
        /** Jumlah program yang dimuat; membatasi ukuran respons agar tetap cepat. */
        batas: z
          .number()
          .int()
          .min(1)
          .max(MAKS_DIMUAT)
          .default(JUMLAH_PER_MUAT),
      }),
    )
    .query(async ({ input }) => {
      try {
        return await controller.cariProgram(
          input.kataKunci,
          input.kategori,
          input.batas,
        );
      } catch (error) {
        ubahGalatProgram(error);
      }
    }),

  /** Detail satu program untuk halaman Detail Program. */
  detail: publicProcedure
    .input(z.object({ idProgram: z.string().min(1) }))
    .query(async ({ input }) => {
      try {
        return await controller.ambilDetailProgram(input.idProgram);
      } catch (error) {
        ubahGalatProgram(error);
      }
    }),

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

  programMenungguVerifikasi: verifikatorProcedure.query(() =>
    controller.ambilProgramMenungguVerifikasi(),
  ),

  setujuiProgram: verifikatorProcedure
    .input(z.object({ idProgram: z.string().min(1) }))
    .mutation(async ({ input }) => {
      try {
        const status = await controller.setujuiProgram(input.idProgram);
        return { status };
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
