import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { adoptionServices } from "./adoption.service";

const getAllAdoptionsController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await adoptionServices.getAllAdoptionsService();
    res.json({
      success: true,
      statusCode: 200,
      message: "Adoption requests retrieved successfully",
      data: result,
    });
  }
);

const getMyAdoptionsController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await adoptionServices.getMyAdoptionsService(req);
    res.json({
      success: true,
      statusCode: 200,
      message: "Adoption requests retrieved successfully",
      data: result,
    });
  }
);

const createAdoptionController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await adoptionServices.createAdoptionService(req, req.body);
    res.json({
      success: true,
      statusCode: 201,
      message: "Adoption request submitted successfully",
      data: result,
    });
  }
);

const updateAdoptionController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await adoptionServices.updateAdoptionService(
      req.params.petId,
      req.body
    );
    res.json({
      success: true,
      statusCode: 200,
      message: "Adoption request updated successfully",
      data: result,
    });
  }
);

export const adoptionControllers = {
  getAllAdoptionsController,
  getMyAdoptionsController,
  createAdoptionController,
  updateAdoptionController,
};
