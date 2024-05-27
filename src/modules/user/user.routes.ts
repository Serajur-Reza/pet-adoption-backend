import express from "express";
import { userControllers } from "./user.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get(
  "/all-users",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  userControllers.getAllUsersController
);

router.get(
  "/my",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.ADOPTOR),
  userControllers.getMyProfileController
);

router.post("/", userControllers.createUserController);

router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  userControllers.updateUserController
);

export const userRoutes = router;
