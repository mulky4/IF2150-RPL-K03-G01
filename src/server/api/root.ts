import { authRouter } from "~/server/api/routers/auth";
import { laporanRouter } from "~/server/api/routers/laporan";
import { presensiRouter } from "~/server/api/routers/presensi";
import { programRouter } from "~/server/api/routers/program";
import { seleksiRouter } from "~/server/api/routers/seleksi";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  program: programRouter,
  seleksi: seleksiRouter,
  presensi: presensiRouter,
  laporan: laporanRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
