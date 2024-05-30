import { User } from "@prisma/client";
import { prisma } from "../../app";
import config from "../../config";
import * as bcrypt from "bcrypt";

const getAllUsersService = async () => {
  const res = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      isActivated: true,
      role: true,
      contactNumber: true,
      createdAt: true,
      updatedAt: true,
      adoption: {
        select: {
          id: true,
        },
      },
    },
  });
  return res;
};

const getMyProfileService = async (user: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: user?.id,
    },

    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      isActivated: true,
      role: true,
      contactNumber: true,
      createdAt: true,
      updatedAt: true,
      adoption: {
        select: {
          id: true,
          petId: true,
        },
      },
    },
  });

  return userData;
};

const createUserService = async (body: any) => {
  const hashedPassword = await bcrypt.hash(
    body.password,
    Number(config.hashedRound)
  );
  body.password = hashedPassword;

  const result = await prisma.user.create({
    data: body,
  });
  return result;
};

const updateUserService = async (id: string, body: Partial<User>) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: body,
  });

  return result;
};

export const userServices = {
  getAllUsersService,
  getMyProfileService,
  createUserService,
  updateUserService,
};
