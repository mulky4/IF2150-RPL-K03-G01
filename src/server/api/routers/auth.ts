import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Router tipis Modul 1: validasi input (zod) → panggil AuthController.
export const authRouter = createTRPCRouter({
  /** Sesi pengguna saat ini, null kalau belum login. Dipakai Navbar & redirect. */
  sesiSaya: publicProcedure.query(({ ctx }) => ctx.session),
});
