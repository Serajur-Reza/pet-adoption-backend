import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import { petFilterableFields } from "./pet.constants";
import { PetServices } from "./pet.service";
import { Request, Response } from "express";

const getAllPetsController = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, petFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await PetServices.getAllPetsService(filters, options);
  res.json({
    success: true,
    statusCode: 200,
    message: "Pets retrieved successfully",
    meta: result?.meta,
    data: result.data,
  });
});

const getSinglePetController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PetServices.getSinglePetService(req.params.petId);
    res.json({
      success: true,
      statusCode: 200,
      message: "Pet retrieved successfully",
      data: result,
    });
  }
);

const createPetController = catchAsync(async (req: Request, res: Response) => {
  const result = await PetServices.createPetService(req);
  res.json({
    success: true,
    statusCode: 201,
    message: "Pet added successfully",
    data: result,
  });
});

const updatePetController = catchAsync(async (req: Request, res: Response) => {
  const result = await PetServices.updatePetService(req.params.petId, req.body);
  res.json({
    success: true,
    statusCode: 200,
    message: "Pet profile updated successfully",
    data: result,
  });
});

const deletePetController = catchAsync(async (req: Request, res: Response) => {
  const result = await PetServices.deletePetService(req.params.petId);
  res.json({
    success: true,
    statusCode: 200,
    message: "Pet profile deleted successfully",
    data: result,
  });
});

export const PetControllers = {
  getAllPetsController,
  getSinglePetController,
  createPetController,
  updatePetController,
  deletePetController,
};
