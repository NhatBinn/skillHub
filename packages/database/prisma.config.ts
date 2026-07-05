import { config } from "dotenv";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "prisma/config";

const envPaths = [
  resolve(process.cwd(), ".env"),
  resolve(process.cwd(), "../../.env"),
];

const envPath = envPaths.find((p) => existsSync(p));

if (envPath) {
  config({ path: envPath });
}

console.log("cwd =", process.cwd());
console.log("DATABASE_URL =", process.env.DATABASE_URL);

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts", 
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
