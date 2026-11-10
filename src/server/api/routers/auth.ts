import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  AuthController,
  GalatIPDiblokir,
  GalatTidakDitemukan,
} from "~/server/controllers/AuthController";

/** IP klien dari header proxy. Dipakai untuk blokir IP (KNF06). */
export function ambilIP(headers: Headers): string {
  const diteruskan = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return diteruskan || headers.get("x-real-ip") || "lokal";
}

// Router tipis Modul 1: validasi input (zod) → panggil AuthController.
export const authRouter = createTRPCRouter({
  /** Sesi pengguna saat ini, null kalau belum login. Dipakai Navbar & redirect. */
  sesiSaya: publicProcedure.query(({ ctx }) => ctx.session),

  /** UC02 Login (I-02). Berhasil → cookie sesi terpasang di respons. */
  masuk: publicProcedure
    .input(
      z.object({
        email: z.string().trim().email("Email tidak valid"),
        kataSandi: z.string().min(1, "Kata sandi wajib diisi"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const berhasil = await AuthController.validasiKredensial(
          input.email,
          input.kataSandi,
          ambilIP(ctx.headers),
        );
        if (!berhasil) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Email atau kata sandi salah",
          });
        }
        return { berhasil: true as const };
      } catch (galat) {
        if (galat instanceof GalatIPDiblokir) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: galat.message,
            cause: galat,
          });
        }
        throw galat;
      }
    }),

  /** UC06 I-03: daftar notifikasi (Algo-C12-13 → Algo-C13-11), terbaru di atas. */
  daftarNotifikasi: protectedProcedure.query(async ({ ctx }) => {
    const daftar = await AuthController.ambilNotifikasi(
      ctx.session.idPengguna,
    ).catch(keTRPCError);
    return daftar.map((notifikasi) => notifikasi.keData());
  }),

  /** Angka di ikon lonceng Navbar (I03-NAV-Navbar). */
  jumlahBelumDibaca: protectedProcedure.query(async ({ ctx }) => {
    const daftar = await AuthController.ambilNotifikasi(
      ctx.session.idPengguna,
    ).catch(keTRPCError);
    return daftar.filter((notifikasi) => !notifikasi.keData().statusDibaca)
      .length;
  }),

  /** UC06 I-03: buka satu notifikasi (Algo-C12-14 → Algo-C13-12), ditandai sudah dibaca. */
  bacaNotifikasi: protectedProcedure
    .input(z.object({ idNotifikasi: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const notifikasi = await AuthController.bacaNotifikasi(
        input.idNotifikasi,
        ctx.session.idPengguna,
      ).catch(keTRPCError);
      return { ...notifikasi.keData(), detail: notifikasi.showDetail() };
    }),
});

/** GalatTidakDitemukan → 404 NOT_FOUND. Galat lain diteruskan apa adanya. */
function keTRPCError(galat: unknown): never {
  if (galat instanceof GalatTidakDitemukan) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: galat.message,
      cause: galat,
    });
  }
  throw galat;
}
