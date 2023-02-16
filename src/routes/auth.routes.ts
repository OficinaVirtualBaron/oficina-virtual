import { Router } from "express";
import { signIn, createUser, forgotPassword, resetPassword } from "../controllers/user.controller";
import { signInMuni } from "../controllers/muni.controllers";
import { isMuniRole } from "../middlewares/validateMuni";
const router = Router();


import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { hashSync } from "bcrypt";
import { User } from "../entities/User";
import { AppDataSource } from "../db";
import path from "path";

const userRepository = AppDataSource.getRepository(User);
const saltround = 10;

// POST
router.post("/signUp", isMuniRole, createUser);
router.post("/signIn", signIn);
router.post("/signinMunicipales", signInMuni);
router.put("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;