import express from "express";
import "dotenv/config";
import { prisma } from "@skillhub/database";

const app = express();
const port = Number(process.env.BACKEND_PORT ?? 3001);

app.use(express.json());

app.get("/", (_, res) => {
  res.json({ status: "ok", service: "skillhub-backend" });
});

app.get("/users", async (_, res, next) => {
  try {
    const user = await prisma.user.findMany({ where: { id: 3 } });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
