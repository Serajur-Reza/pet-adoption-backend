import { UserRole } from "@prisma/client";
import { prisma } from "../../app";
import config from "../../config";

import * as bcrypt from "bcrypt";

const getAllAdoptorService = async () => {
  const res = await prisma.adoptor.findMany({
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

const getAdoptorService = async (req: Request & { user: any }) => {
  const user = req?.user;

  const res = await prisma.adoptor.findUnique({
    where: {
      id: user?.id,
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

const createAdoptorService = async (body: any) => {
  const hashedPassword = await bcrypt.hash(
    body.password,
    Number(config.hashedRound)
  );
  body.password = hashedPassword;
  const res = await prisma.adoptor.create({
    data: body,
  });
  return {
    id: res.id,
    name: res.name,
    email: res.email,
    createdAt: res.createdAt,
    updatedAt: res.updatedAt,
  };
};

const updateAdoptorService = async (req: Request & { user: any }) => {
  const user = req?.user;

  const res = await prisma.adoptor.update({
    where: {
      id: user?.id,
    },
    data: req.body,
  });
  return {
    id: res.id,
    name: res.name,
    email: res.email,
    createdAt: res.createdAt,
    updatedAt: res.updatedAt,
  };
};

export const adoptorServices = {
  getAllAdoptorService,
  getAdoptorService,
  createAdoptorService,
  updateAdoptorService,
};
