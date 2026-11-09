import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const laporanRouter = createTRPCRouter({
  // Fetch daftar laporan (untuk pengguna atau verifikator)
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.laporan.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        pengaju: true,
        verifikator: true,
      },
    });
  }),

  // Buat laporan baru (Modul Laporan)
  create: protectedProcedure
    .input(
      z.object({
        judul: z.string().min(1),
        deskripsi: z.string().min(1),
        tautanDokumen: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = ctx.session as { user?: { id: string }; userId?: string };
      const userId = session?.user?.id ?? session?.userId;
      
      if (!userId) {
        throw new Error("Unauthorized");
      }

      return await ctx.db.laporan.create({
        data: {
          judul: input.judul,
          deskripsi: input.deskripsi,
          tautanDokumen: input.tautanDokumen,
          pengajuId: userId,
          status: "MENUNGGU",
        },
      });
    }),

  // Verifikasi laporan (Modul Verifikator)
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(["DISETUJUI", "DITOLAK"]),
        catatanVerifikasi: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const session = ctx.session as { user?: { id: string }; userId?: string };
      const verifikatorId = session?.user?.id ?? session?.userId;
      
      if (!verifikatorId) {
        throw new Error("Unauthorized");
      }

      return await ctx.db.laporan.update({
        where: { id: input.id },
        data: {
          status: input.status,
          catatanVerifikasi: input.catatanVerifikasi,
          verifikatorId: verifikatorId,
        },
      });
    }),
});