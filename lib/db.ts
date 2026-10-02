import "server-only";
import { PrismaClient } from "@prisma/client";
import { isDbConfigured } from "@/lib/env";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Prisma client is wired in once `prisma/schema.prisma` + DATABASE_URL exist.
// getDb() fails loudly at request time when DB is not configured, while
// `next build` stays green.
export async function getDb(): Promise<PrismaClient> {
  if (!isDbConfigured()) {
    throw new Error(
      "DATABASE_URL is not configured. See .env.example and PRD §65.",
    );
  }
  return prisma;
}

export { prisma as db };
