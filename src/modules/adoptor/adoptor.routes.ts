import express from "express";
import { adoptorControllers } from "./adoptor.controller";

const router = express.Router();

router.get("/", adoptorControllers.getAllAdoptorController);
router.get("/:id", adoptorControllers.getAdoptorController);
router.post("/", adoptorControllers.createAdoptorController);
router.patch("/:id", adoptorControllers.updateAdoptorController);

export default router;
