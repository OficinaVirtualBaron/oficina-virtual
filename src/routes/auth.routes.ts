import { Router } from "express";
import { signIn, createUser } from "../controllers/user.controller";
import { signInMuni } from "../controllers/muni.controllers";
const router = Router();

router.post("/signUp", createUser);
router.post("/signIn", signIn);
router.post("/signinMunicipales", signInMuni);

export default router;