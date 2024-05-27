import { Adoptor, User, UserRole } from "@prisma/client";
import { prisma } from "../../app";
import config from "../../config";

import * as bcrypt from "bcrypt";
import { fileUploader } from "../../utils/fileUploader";
import { TFile } from "../../types/file";
import { JwtPayload } from "jsonwebtoken";

const getAllUsersService = async () => {
  const res = await prisma.user.findMany({
    where: {
      isActivated: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return res;
};

const getMyProfileService = async (user: JwtPayload) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      isActivated: true,
    },
  });

  return {
    id: userData.id,
    username: userData.username,
    role: userData.role,
    name: userData.name,
    email: userData.email,
    contactNumber: userData.contactNumber,
    isActivated: userData.isActivated,
  };
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
