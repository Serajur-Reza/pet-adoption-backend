import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus, { INTERNAL_SERVER_ERROR } from "http-status";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  let success = false;
  let message = err?.message || "Something went wrong";
  let error = err;
  if (err instanceof Prisma.PrismaClientValidationError) {
    message = "validation error";
    error = err;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if ((err.code = "2002")) {
      message = "Duplicate key error";
      error = err.meta;
    }
  }
  res.status(statusCode).json({
    success,
    message,
    error,
  });
};

export default globalErrorHandler;
