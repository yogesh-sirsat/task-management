import { Router } from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller";

const router = Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
