import express from "express";
import { adoptorControllers } from "./adoptor.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adoptorControllers.getAllAdoptorController
);
router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adoptorControllers.getAdoptorController
);
router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adoptorControllers.createAdoptorController
);
router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adoptorControllers.updateAdoptorController
);

export const adoptorRoutes = router;
