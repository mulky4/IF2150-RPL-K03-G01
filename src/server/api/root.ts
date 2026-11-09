import { authRouter } from "~/server/api/routers/auth";
import { presensiRouter } from "~/server/api/routers/presensi";
import { programRouter } from "~/server/api/routers/program";
import { seleksiRouter } from "~/server/api/routers/seleksi";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  program: programRouter,
  seleksi: seleksiRouter,
  presensi: presensiRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
