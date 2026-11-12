import { createTRPCRouter } from "./trpc";
import { laporanRouter } from "./routers/laporan";
import { programRouter } from "./routers/program";

export const appRouter = createTRPCRouter({
  laporan: laporanRouter,
  program: programRouter,
});

export type AppRouter = typeof appRouter;
