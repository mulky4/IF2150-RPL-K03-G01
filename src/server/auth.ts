import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { APIError } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";

import { BetterAuth } from "~/server/adapters/BetterAuth";
import { db } from "~/server/db";
import { Peran } from "~/server/models/enums";

// Peran yang boleh dibuat lewat registrasi. Akun VERIFIKATOR hanya dari seed (SPEC §1).
const PERAN_REGISTRASI: string[] = [Peran.RELAWAN, Peran.INISIATOR];

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    requireEmailVerification: false,
    // Registrasi tidak langsung masuk: pengguna lanjut login lewat I-02 (UC01, I01-MSG-Berhasil).
    autoSignIn: false,
    // KNF02: hashing bcrypt lewat operasi C22 (bukan scrypt bawaan Better Auth).
    password: {
      hash: (kataSandi) => BetterAuth.hashKataSandi(kataSandi),
      verify: ({ hash, password }) => BetterAuth.cocokkanHash(password, hash),
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    // Tanpa SMTP: link verifikasi cukup dicetak ke console (SPEC §1).
    sendVerificationEmail: async ({ user, url }) => {
      console.info(
        `[RekanBumi] Link verifikasi email untuk ${user.email}: ${url}`,
      );
    },
  },
  user: {
    additionalFields: {
      peran: {
        type: "string",
        required: false,
        defaultValue: Peran.RELAWAN,
        input: true,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const peran = (user as { peran?: string }).peran ?? Peran.RELAWAN;
          if (!PERAN_REGISTRASI.includes(peran)) {
            throw new APIError("BAD_REQUEST", { message: "Peran tidak valid" });
          }
          return { data: { ...user, peran } };
        },
      },
    },
  },
  plugins: [nextCookies()],
});

export type SesiBetterAuth = typeof auth.$Infer.Session;
