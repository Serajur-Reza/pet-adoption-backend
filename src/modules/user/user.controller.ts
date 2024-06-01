import { Response, Request } from "express";
import catchAsync from "../../utils/catchAsync";
import { userServices } from "./user.service";
import httpStatus from "http-status";

const getAllUsersController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await userServices.getAllUsersService();
    res.json({
      success: true,
      statusCode: 200,
      message: "Users retrieved successfully",
      data: result,
    });
  }
);

const getMyProfileController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await userServices.getMyProfileService(req?.user);
    res.json({
      success: true,
      statusCode: 200,
      message: "User retrieved successfully",
      data: result,
    });
  }
);

const createUserController = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createUserService(req.body);
  res.json({
    success: true,
    statusCode: 201,
    message: "User registered successfully",
    data: result,
  });
});

const updateUserController = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.updateUserService(req.params.id, req.body);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: 200,
    message: "User profile updated successfully",
    data: result,
  });
});

export const userControllers = {
  getAllUsersController,
  getMyProfileController,
  createUserController,
  updateUserController,
};
