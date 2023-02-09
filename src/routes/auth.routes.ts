import { Router } from "express";
import { signIn, createUser, forgotPassword } from "../controllers/user.controller";
import { signInMuni } from "../controllers/muni.controllers";
import { isMuniRole } from "../middlewares/validateMuni";
const router = Router();

// POST
router.post("/signUp", isMuniRole, createUser);
router.post("/signIn", signIn);
router.post("/signinMunicipales", signInMuni);
router.post("/forgot-password", forgotPassword);

export default router;