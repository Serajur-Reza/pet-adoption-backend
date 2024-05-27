import express from "express";

import { authControllers } from "./auth.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/login", authControllers.loginController);
router.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.ADOPTOR),
  authControllers.changePasswordController
);

export const authRoutes = router;
