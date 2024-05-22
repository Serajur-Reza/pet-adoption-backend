import { NextFunction, Request, Response } from "express";
import { authServices } from "./auth.service";

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await authServices.loginService(req.body);
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: result,
  });
};

const changePasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await authServices.loginService(req.body);
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: result,
  });
};

const createAdoptorController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await authServices.loginService(req.body);
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: result,
  });
};

const createAdminController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await authServices.loginService(req.body);
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: result,
  });
};

export const authControllers = {
  loginController,
  changePasswordController,
  createAdoptorController,
  createAdminController,
};
