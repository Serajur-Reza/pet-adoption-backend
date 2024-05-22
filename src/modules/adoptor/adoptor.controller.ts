import { Response, Request } from "express";
import catchAsync from "../../utils/catchAsync";
import { adoptorServices } from "./adoptor.service";
import httpStatus from "http-status";

const getAllAdoptorController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await adoptorServices.getAllAdoptorService();
    res.json({
      success: true,
      statusCode: 200,
      message: "Adoptor profile retrieved successfully",
      data: result,
    });
  }
);

const getAdoptorController = catchAsync(async (req: Request, res: Response) => {
  const result = await adoptorServices.getAdoptorService(req);
  res.json({
    success: true,
    statusCode: 200,
    message: "Adoptor profile retrieved successfully",
    data: result,
  });
});

const createAdoptorController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await adoptorServices.createAdoptorService(req.body);
    res.json({
      success: true,
      statusCode: 201,
      message: "Adoptor registered successfully",
      data: result,
    });
  }
);

const updateAdoptorController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await adoptorServices.updateAdoptorService(req);
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: 200,
      message: "Adoptor profile updated successfully",
      data: result,
    });
  }
);

export const adoptorControllers = {
  getAllAdoptorController,
  getAdoptorController,
  createAdoptorController,
  updateAdoptorController,
};
