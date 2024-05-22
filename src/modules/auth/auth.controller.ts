import { NextFunction, Request, Response } from "express";
import { authServices } from "./auth.service";
import catchAsync from "../../utils/catchAsync";

const loginController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authServices.loginService(req.body);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  }
);

const changePasswordController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authServices.loginService(req.body);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  }
);

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authServices.loginService(req.body);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  }
);

const createAdminController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authServices.createAdminService(req.body);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  }
);

export const authControllers = {
  loginController,
  changePasswordController,
  createAdoptorController,
  createAdminController,
};
