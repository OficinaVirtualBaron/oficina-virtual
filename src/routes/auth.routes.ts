import { Router } from "express";
import { signIn, createUser } from "../controllers/user.controller";
const router = Router();

// POST
router.post("/signUp", createUser);

// POST
router.post("/signin", signIn);

export default router;