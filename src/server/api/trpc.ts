import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { Peran } from "~/server/models/enums";

/** Isi ctx.session yang dipakai semua modul (kontrak SPEC §5). */
export type SesiPengguna = {
  idPengguna: string;
  peran: Peran;
  email: string;
  emailTerverifikasi: boolean;
};

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const sesi = await auth.api.getSession({ headers: opts.headers });
  const session: SesiPengguna | null = sesi
    ? {
        idPengguna: sesi.user.id,
        peran: (sesi.user.peran ?? Peran.RELAWAN) as Peran,
        email: sesi.user.email,
        emailTerverifikasi: sesi.user.emailVerified,
      }
    : null;

  return { db, session, headers: opts.headers };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;

/** Bisa diakses tanpa login (pengunjung). */
export const publicProcedure = t.procedure;

/** Wajib login, peran apa pun. ctx.session dijamin tidak null. */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Silakan masuk dulu.",
    });
  }
  return next({ ctx: { ...ctx, session: ctx.session } });
});

const prosedurPeran = (peran: Peran) =>
  protectedProcedure.use(({ ctx, next }) => {
    if (ctx.session.peran !== peran) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Akun ini tidak punya akses ke fitur tersebut.",
      });
    }
    return next({ ctx });
  });

export const relawanProcedure = prosedurPeran(Peran.RELAWAN);
export const inisiatorProcedure = prosedurPeran(Peran.INISIATOR);
export const verifikatorProcedure = prosedurPeran(Peran.VERIFIKATOR);
