import { create } from "domain";
import {Router} from "express";
import {
    createUser, 
    deleteUser, 
    getUserById, 
    getUsers, 
    updateUser
} from "../controllers/user.controller"

const router = Router()

router.post("/users", createUser);

router.get("/users", getUsers);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

router.get("/users/:id", getUserById);

export default router;