import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import router from "./routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", router);
app.use(globalErrorHandler);

app.use((req, res) => {
  res.json({
    success: false,
    message: "route does not exist",
  });
});

export const prisma = new PrismaClient();

export default app;
