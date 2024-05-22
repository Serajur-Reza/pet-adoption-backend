import express from "express";
import { PetControllers } from "./pet.controller";
// import { authGuard } from "../../middlewares/auth";

const router = express.Router();
router.get("/", PetControllers.getAllPetsController);
router.post("/", PetControllers.createPetController);
router.put("/:petId", PetControllers.updatePetController);

export const PetRoutes = router;
