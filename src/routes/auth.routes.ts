import { Router } from "express";
import { signIn, createUser } from "../controllers/user.controller";
import { signInMuni } from "../controllers/muni.controllers";
import { isAdminRole } from "../middlewares/validateAdmin";
import { isMuniRole } from "../middlewares/validateMuni";
const router = Router();

router.post("/signUp", isMuniRole, createUser);
router.post("/signIn", signIn);
router.post("/signinMunicipales", signInMuni);

export default router;