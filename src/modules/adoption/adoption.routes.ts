import express from "express";
import { AdoptionControllers } from "./adoption.controller";
// import { authGuard } from "../../middlewares/auth";

import { AdoptionValidations } from "./adoption.validation";

import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();
router.get("/", AdoptionControllers.getAllAdoptionsController);
// router.post("/", authGuard(), AdoptionControllers.createAdoptionController);
router.put(
  "/:petId",
  validateRequest(AdoptionValidations.updateAdoptionStatusValidation),
  AdoptionControllers.updateAdoptionController
);

export const AdoptionRoutes = router;
