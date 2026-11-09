import { PrismaClient } from "@prisma/client";

// Prisma client tunggal. Di algoritma DPPL BAB 5 disebut DB_SERVICE.
const buatPrismaClient = () =>
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

const globalUntukPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof buatPrismaClient> | undefined;
};

export const db = globalUntukPrisma.prisma ?? buatPrismaClient();

if (process.env.NODE_ENV !== "production") globalUntukPrisma.prisma = db;
