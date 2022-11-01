import { create } from "domain";
import {Router} from "express";
import {createUser, getUsers} from "../controllers/user.controllers"

const router = Router()

router.post("/users", createUser);

router.get("/users", getUsers)

export default router