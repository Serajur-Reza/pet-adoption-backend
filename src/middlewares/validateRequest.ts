import { AnyZodObject } from "zod";
import { NextFunction, Request, RequestHandler, Response } from "express";

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({ body: req.body });
      return next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
