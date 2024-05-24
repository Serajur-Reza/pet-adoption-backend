import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../config";

export const generateToken = (body: {
  id: string;
  name: string;
  email: string;
}) => {
  const res = jwt.sign(body, config.jwt_access_secret as string, {
    expiresIn: config.jwt_expires_in,
  });

  return res;
};

export const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};
