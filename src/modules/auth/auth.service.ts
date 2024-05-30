import { prisma } from "../../app";
import config from "../../config";

import { generateToken } from "../../utils/jwtHelpers";

import * as bcrypt from "bcrypt";

import { JwtPayload } from "jsonwebtoken";

const loginService = async (body: any) => {
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
  let user = user1 ?? user2;

  if (user) {
    const isPasswordsMatch = await bcrypt.compare(body.password, user.password);

    if (!isPasswordsMatch) {
      throw new Error("Passwords do not match");
    }

    const token = generateToken({
      id: user.id,
      username: user?.username,
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

  // console.log(userData);

  const isCorrectPassword = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Incorrect Password");
  }

  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.hashedRound)
  );

  const res = await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  console.log(res);

  return {
    message: "password changed successfully",
  };
};

export const authServices = {
  loginService,
  changePasswordService,
};
