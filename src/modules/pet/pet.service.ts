import { Pet, Prisma } from "@prisma/client";
import { prisma } from "../../app";
import { TPaginationOptions } from "../../types/pagination";
import { petSearchableFields } from "./pet.constants";
import { calculatePagination } from "../../utils/pagination";
import { TFile } from "../../types/file";
import { fileUploader } from "../../utils/fileUploader";

const getAllPetsService = async (params: any, options: TPaginationOptions) => {
  const { searchTerm, ...filterData } = params;
  const { limit, page, skip } = calculatePagination(options);
  const conditions: Prisma.PetWhereInput[] = [
    {
      isDeleted: false,
    },
  ];

  if (params.searchTerm) {
    conditions.push({
      OR: petSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    conditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const andCondition: Prisma.PetWhereInput = conditions.length
    ? {
        AND: conditions,
      }
    : {};

  const result = await prisma.pet.findMany({
    where: andCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { createdAt: "desc" },
  });

  const count = await prisma.pet.count({ where: andCondition });
  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

const getSinglePetService = async (id: string) => {
  const result = await prisma.pet.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return result;
};

const createPetService = async (req: any) => {
  console.log(req.files);
  console.log(req.body.data);

  const payload = JSON.parse(req.body.data);
  const files: TFile[] = req.files;
  let fileArray = [];
  // console.log(req.body);
  if (files.length) {
    for (let i = 0; i < files.length; i++) {
      const uploadToCloudinary = await fileUploader.uploadToCloudinary(
        files[i]
      );
      console.log("from service:", uploadToCloudinary);
      // payload.photo = uploadToCloudinary?.secure_url as string;
      fileArray.push(uploadToCloudinary?.secure_url as string);
    }
  }
  payload.photos = fileArray;
  console.log("start");
  console.log(payload);
  console.log("end");
  const result = await prisma.pet.create({
    data: payload,
  });
  return result;
};

const updatePetService = async (id: string, payload: Partial<Pet>) => {
  const result = await prisma.pet.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deletePetService = async (id: string) => {
  const result = await prisma.pet.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });
  return result;
};
export const PetServices = {
  getAllPetsService,
  getSinglePetService,
  createPetService,
  updatePetService,
  deletePetService,
};
