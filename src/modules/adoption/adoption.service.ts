import { prisma } from "../../app";
import { Request } from "express";

const getAllAdoptionsService = async () => {
  const result = await prisma.adoption.findMany({
    select: {
      id: true,
      userId: true,
      petId: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      pet: true,
    },
  });
  return result;
};

const getMyAdoptionsService = async (req: Request & { user: any }) => {
  const adoptor = await prisma.user.findUniqueOrThrow({
    where: {
      email: req?.user?.email,
    },
  });
  const result = await prisma.adoption.findMany({
    where: {
      userId: adoptor?.id,
    },
    select: {
      id: true,
      userId: true,
      petId: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      pet: true,
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

  const adoptor = await prisma.user.findUniqueOrThrow({
    where: {
      id: req?.user?.id,
    },
  });

  console.log(adoptor);

  console.log({ ...payload, userId: adoptor?.id });
  // const result = await prisma.adoption.create({
  //   data: { ...payload, userId: adoptor?.id },
  // });

  const result = await prisma.$transaction(async (tc) => {
    const createdAdoption = await tc.adoption.create({
      data: { ...payload, userId: adoptor?.id },
    });

    await tc.pet.update({
      where: {
        id: payload.petId,
      },

      data: {
        isAdopted: true,
      },
    });
    return createdAdoption;
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
  getMyAdoptionsService,
  createAdoptionService,
  updateAdoptionService,
};
