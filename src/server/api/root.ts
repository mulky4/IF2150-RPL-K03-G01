import { createTRPCRouter } from "./trpc";
import { programRouter } from "./routers/program";

export const appRouter = createTRPCRouter({
  program: programRouter,
});

export type AppRouter = typeof appRouter;