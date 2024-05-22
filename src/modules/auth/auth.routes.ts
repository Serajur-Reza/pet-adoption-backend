import express from "express";

import { authControllers } from "./auth.controller";

const router = express.Router();

router.post("/login", authControllers.loginController);
router.post("/change-password", authControllers.changePasswordController);
router.post("/create-admin", authControllers.createAdminController);
router.post("/create-adoptor", authControllers.createAdoptorController);

export const authRoutes = router;
