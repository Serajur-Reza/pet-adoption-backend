import { Adoptor, UserRole } from "@prisma/client";
import { prisma } from "../../app";
import config from "../../config";

import * as bcrypt from "bcrypt";
import { fileUploader } from "../../utils/fileUploader";
import { TFile } from "../../types/file";

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
  body.role = UserRole.ADOPTOR;

  const result = await prisma.$transaction(async (transactionClient) => {
    console.log(body);
    const createdUserData = await transactionClient.user.create({
      data: body,
    });

    // console.log(createdUserData);
    const createAdoptorData = await transactionClient.adoptor.create({
      data: {
        name: body.name,
        username: body.username,
        email: body.email,
        contactNumber: body.contactNumber,
        isActivated: body.isActivated,
      },
    });

    return createAdoptorData;
  });
  return result;
};

const updateAdoptorService = async (id: string, body: Partial<Adoptor>) => {
  const adoptor = await prisma.adoptor.findUniqueOrThrow({
    where: {
      id,
    },
  });

  let result;

  if (adoptor) {
    result = await prisma.$transaction(async (transactionClient) => {
      console.log(body);
      await transactionClient.user.update({
        where: {
          email: adoptor?.email,
        },
        data: body,
      });

      // console.log(createdUserData);
      const updateAdoptorData = await transactionClient.adoptor.update({
        where: {
          id,
        },
        data: body,
      });

      return updateAdoptorData;
    });
  }
  return result;
};

export const adoptorServices = {
  getAllAdoptorService,
  getAdoptorService,
  createAdoptorService,
  updateAdoptorService,
};
