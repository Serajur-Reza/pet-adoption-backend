import express from "express";
import { PetControllers } from "./pet.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../utils/fileUploader";
// import { authGuard } from "../../middlewares/auth";

const router = express.Router();
router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.ADOPTOR),
  PetControllers.getAllPetsController
);

router.get(
  "/:petId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.ADOPTOR),
  PetControllers.getSinglePetController
);
router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  fileUploader.upload.array("files", 4),
  PetControllers.createPetController
);
router.put(
  "/:petId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  PetControllers.updatePetController
);

router.patch(
  "/:petId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  PetControllers.deletePetController
);

export const petRoutes = router;
