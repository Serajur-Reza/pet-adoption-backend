// import { AdoptionRoutes } from "../modules/adoption/adoption.routes";
// import { PetRoutes } from "../modules/pet/pet.routes";
// import { UserRoutes } from "../modules/user/user.routes";
import express from "express";
import { authRoutes } from "../modules/auth/auth.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: authRoutes,
  },
  //   {
  //     path: "/pets",
  //     route: PetRoutes,
  //   },
  //   {
  //     path: "/adoption-requests",
  //     route: AdoptionRoutes,
  //   },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
