import { Router } from "express";
import { signIn, createUser } from "../controllers/user.controller";
import { signInMuni } from "../controllers/muni.controllers";
const router = Router();

// POST
router.post("/signUp", createUser);

// POST
router.post("/signin", signIn);

// POST
router.post("/signinMunicipales", signInMuni);

export default router;