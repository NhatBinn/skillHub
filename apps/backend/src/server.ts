import express from "express";
import "dotenv/config";
import { prisma } from "@skillhub/database";

const app = express();
const port = Number(process.env.BACKEND_PORT ?? 3001);

app.use(express.json());

app.get("/", (_, res) => {
    res.json({ status: "ok", service: "skillhub-backend" });
});

app.get("/health", async (_, res, next) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: "ok", database: "connected" });
    } catch (error) {
        next(error);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
