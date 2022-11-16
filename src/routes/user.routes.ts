import {Router} from "express";
import bcrypt from "bcrypt"
import {
    createUser
} from "../controllers/user.controller"

const router = Router()

//router.get("/", getUsers);

// hash login (esto va en el post de logear user)
router.post("/login");

router.post("/createUser", [

], createUser);

export default router;