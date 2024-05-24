import { NextFunction, Response, Request } from "express";
import { Secret } from "jsonwebtoken";
import { verifyToken } from "../utils/jwtHelpers";
import config from "../config";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new Error("You are not authorized");
      }
      const verifiedUser = verifyToken(
        token as string,
        config.jwt_access_secret as Secret
      );

      req.user = verifiedUser;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new Error("Forbidden!");
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
