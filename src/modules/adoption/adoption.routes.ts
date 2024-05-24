import express from "express";
import { adoptionControllers } from "./adoption.controller";
import { adoptionValidations } from "./adoption.validation";
import validateRequest from "../../middlewares/validateRequest";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();
router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.ADOPTOR),
  adoptionControllers.getAllAdoptionsController
);
router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.ADOPTOR),
  adoptionControllers.createAdoptionController
);
router.put(
  "/:petId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.ADOPTOR),
  validateRequest(adoptionValidations.updateAdoptionStatusValidation),
  adoptionControllers.updateAdoptionController
);

export const adoptionRoutes = router;
