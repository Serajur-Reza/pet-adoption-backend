import { prisma } from "../../app";
import { Request } from "express";

const getAllAdoptionsService = async (req: Request & { user: any }) => {
  const adoptor = await prisma.adoptor.findUniqueOrThrow({
    where: {
      email: req?.user?.email,
    },
  });
  const result = await prisma.adoption.findMany({
    where: {
      userId: adoptor?.id,
    },
  });
  return result;
};

const createAdoptionService = async (
  req: Request & { user: any },
  payload: { petId: string }
) => {
  const pet = await prisma.pet.findUniqueOrThrow({
    where: {
      id: payload.petId,
    },
  });

  if (!pet) {
    throw new Error("Pet not found");
  }

  const adoptor = await prisma.adoptor.findUniqueOrThrow({
    where: {
      email: req?.user?.email,
    },
  });

  console.log(adoptor);

  console.log({ ...payload, userId: adoptor?.id });
  const result = await prisma.adoption.create({
    data: { ...payload, userId: adoptor?.id },
  });
  return result;
};

const updateAdoptionService = async (
  id: string,
  payload: { status: string }
) => {
  const result = await prisma.adoption.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
export const adoptionServices = {
  getAllAdoptionsService,
  createAdoptionService,
  updateAdoptionService,
};
