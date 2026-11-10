import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  AuthController,
  GalatIPDiblokir,
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
});
