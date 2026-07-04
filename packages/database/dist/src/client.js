import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
if (!process.env.DATABASE_URL) {
    const envPaths = [
        resolve(process.cwd(), ".env"),
        resolve(process.cwd(), "../../.env"),
    ];
    const envPath = envPaths.find((path) => existsSync(path));
    if (envPath) {
        config({ path: envPath });
    }
}
const globalForPrisma = globalThis;
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is required to initialize Prisma.");
}
const adapter = new PrismaPg({ connectionString });
export const prisma = globalForPrisma.prisma ??
    new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
