import {Router} from "express";
import { Request, Response } from "express";
import {
    createMuni,
    getMuni,
    getMunis,
    updateMuni,
    deleteMuni
} from "../controllers/muni.controllers";
import { TokenAndRoleValidatorMuni } from "../middlewares/TokenAndRoleValidatorMuni";

const router = Router();

// POST 
router.post("/createMuniUser", createMuni);

// GET
router.get("/munis", TokenAndRoleValidatorMuni, getMunis);

// GET
router.get("/munis/:id", TokenAndRoleValidatorMuni, getMuni);

// UPDATE
router.put("/updateMuni/:id", TokenAndRoleValidatorMuni, updateMuni);

// DELETE
router.delete("/deleteMuni/:id", TokenAndRoleValidatorMuni, deleteMuni);

export default router;