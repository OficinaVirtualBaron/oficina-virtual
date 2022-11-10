import {Router} from "express";
import bcrypt from "bcrypt"
import {
    createUser, 
    deleteUser, 
    getUserById, 
    getUsers, 
    updateUser
} from "../controllers/user.controller"

const router = Router()

//router.get("/", getUsers);

// hash login (esto va en el post de logear user)
router.post("/login");

router.post("/createUser", [

], createUser);

router.get("/users", getUsers);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

router.get("/users/:id", getUserById);

export default router;