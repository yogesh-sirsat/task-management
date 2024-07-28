import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.controller";

const router = Router();

router.post("/create-user", createUser);
router.post("/login", loginUser);

export default router;