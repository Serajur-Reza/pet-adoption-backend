import { Request } from "express";
import { prisma } from "../../app";
import config from "../../config";
import { generateToken } from "../../utils/jwtHelpers";
import { TLogin } from "./auth.types";
import * as bcrypt from "bcrypt";
import { UserRole } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

const loginService = async (body: TLogin) => {
  console.log(body);
  const user1 = await prisma.user.findUnique({
    where: {
      email: body.user,
    },
  });

  const user2 = await prisma.user.findUnique({
    where: {
      username: body.user,
    },
  });

  console.log(user1);
  console.log(user2);
  let user = user1 ?? user2;

  if (user) {
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
  } else {
    throw new Error("user not found");
  }
};

const changePasswordService = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  console.log(user);
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      isActivated: true,
    },
  });

  console.log(userData);

  const isCorrectPassword = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Incorrect Password");
  }

  const hashedPassword = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  return {
    message: "password changed successfully",
  };
};

const getMyProfileService = async (user: JwtPayload) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      isActivated: true,
    },
  });

  console.log(userData);

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

const createAdminService = async (body: any) => {
  const hashedPassword = await bcrypt.hash(
    body.password,
    Number(config.hashedRound)
  );
  body.password = hashedPassword;
  body.role = UserRole.ADMIN;

  const result = await prisma.$transaction(async (transactionClient) => {
    console.log(body);
    const createdUserData = await transactionClient.user.create({
      data: body,
    });

    // console.log(createdUserData);
    const createAdminData = await transactionClient.admin.create({
      data: {
        name: body.name,
        username: body.username,
        email: body.email,
        contactNumber: body.contactNumber,
        isActivated: body.isActivated,
      },
    });

    return createAdminData;
  });
  return result;
};

export const authServices = {
  loginService,
  changePasswordService,
  createAdminService,
  getMyProfileService,
};
