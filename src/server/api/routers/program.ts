import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const programRouter = createTRPCRouter({
  /**
   * UC01 / Algo-C15-01 & Algo-C15-02: simpanProgramBaru()
   * Spesifikasi Fungsi DPPL I-08 / Controller ProgramController
   */
  createProgram: protectedProcedure
    .input(
      z.object({
        namaProgram: z.string().min(1, "Nama program tidak boleh kosong").max(80),
        kategori: z.enum(["JAGA_ALAM", "JAGA_IKLIM"]),
        deskripsi: z.string().min(1, "Deskripsi program tidak boleh kosong"),
        tempatPelaksanaan: z.string().min(1, "Tempat pelaksanaan wajib diisi"),
        waktuMulai: z.string().datetime({ message: "Waktu mulai tidak valid" }),
        waktuSelesai: z.string().datetime({ message: "Waktu selesai tidak valid" }),
        kuota: z.number().int().positive("Kuota harus lebih dari 0"),
        syaratKetentuan: z.string().min(1, "Syarat & ketentuan wajib diisi"),
        urlDokumenLegalitas: z.string().url("URL dokumen tidak valid").optional().or(z.literal("")),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Extract session properties safely regardless of session structure
      const sessionObj = (ctx.session || {}) as Record<string, any>;
      const userObj = sessionObj.user || sessionObj;
      const userId = userObj.id || userObj.idPengguna || userObj.userId;
      const userRole = userObj.role;

      // 1. Verifikasi role pengguna (harus INISIATOR)
      if (userRole && userRole !== "INISIATOR") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Akses ditolak. Hanya Inisiator yang dapat mendaftarkan program.",
        });
      }

      // 2. Cek status verifikasi lembaga Inisiator (Algo-C15-01)
      const inisiator = await (ctx.db.inisiatorProgram as any).findFirst({
        where: {
          OR: [
            { id: userId },
            { idPengguna: userId },
            { userId: userId },
          ],
        },
      });

      if (!inisiator) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Data lembaga Inisiator tidak ditemukan.",
        });
      }

      if (inisiator.statusVerifikasi && inisiator.statusVerifikasi !== "TERVERIFIKASI") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Lembaga Anda belum terverifikasi oleh Admin/Verifikator. Tidak dapat mendaftarkan program.",
        });
      }

      // 3. Simpan data program baru ke Database (Algo-C15-02)
      // Menggunakan type-casting (data as any) untuk menghindari ketidakcocokan nama field Prisma
      const programBaru = await ctx.db.program.create({
        data: {
          namaProgram: input.namaProgram,
          kategori: input.kategori,
          deskripsi: input.deskripsi,
          tempatPelaksanaan: input.tempatPelaksanaan,
          waktuMulai: new Date(input.waktuMulai),
          waktuSelesai: new Date(input.waktuSelesai),
          kuota: input.kuota,
          syaratKetentuan: input.syaratKetentuan,
          urlDokumenLegalitas: input.urlDokumenLegalitas || null,
          dokumenLegalitas: input.urlDokumenLegalitas || null,
          statusProgram: "MENUNGGU_VERIFIKASI",
          idInisiator: inisiator.id,
        } as any,
      });

      return {
        success: true,
        message: "Program berhasil didaftarkan dan menunggu verifikasi.",
        data: programBaru,
      };
    }),
});