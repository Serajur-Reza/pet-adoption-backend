import { Request } from "express";
import { prisma } from "../../app";
import config from "../../config";
import { generateToken } from "../../utils/jwtHelpers";
import { TLogin } from "./auth.types";
import * as bcrypt from "bcrypt";

const loginService = async (body: TLogin) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      OR: [
        {
          username: body.user,
        },
        {
          email: body.user,
        },
      ],
    },
  });

  const isPasswordsMatch = await bcrypt.compare(body.password, user.password);

  if (!isPasswordsMatch) {
    throw new Error("Passwords do not match");
  }

  const token = generateToken({
    id: user.id,
    username: user.username,
    role: user.role,
    name: user.name,
    email: user.email,
  });

  return {
    id: user.id,
    username: user.username,
    role: user.role,
    name: user.name,
    email: user.email,
    token,
  };
};

const changePasswordService = async (req: Request & { user: any }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      OR: [
        {
          username: body.user,
        },
        {
          email: body.user,
        },
      ],
    },
  });

  const isPasswordsMatch = await bcrypt.compare(body.password, user.password);

  if (!isPasswordsMatch) {
    throw new Error("Passwords do not match");
  }

  let hashedPassword = await bcrypt.hash(
    req.body.password,
    Number(config.hashedRound)
  );

  req.body.password = hashedPassword;

  const res = await prisma.user.update({
    where: {
      id: user?.id,
    },
    data: req.body,
  });
  return {
    id: user.id,
    username: user.username,
    role: user.role,
    name: user.name,
    email: user.email,
    createdAt: res.createdAt,
    updatedAt: res.updatedAt,
  };
};

const createAdminService = async (body: any) => {
  const hashedPassword = await bcrypt.hash(
    body.password,
    Number(config.hashedRound)
  );
  body.password = hashedPassword;
  const res = await prisma.user.create({
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

export const authServices = {
  loginService,
  changePasswordService,
  createAdminService,
  createAdoptorService,
};
