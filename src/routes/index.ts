import express from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { petRoutes } from "../modules/pet/pet.routes";

import { adoptionRoutes } from "../modules/adoption/adoption.routes";
import { userRoutes } from "../modules/user/user.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: authRoutes,
  },
  {
    path: "/pets",
    route: petRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/adoption",
    route: adoptionRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
