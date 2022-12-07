import {Router} from "express";
import { Request, Response } from "express";
import {
    createMuni,
    getMuni,
    getMunis,
    updateMuni,
    deleteMuni
} from "../controllers/muni.controllers";
import { TokenValidator } from "../middlewares/validateToken";

const router = Router();

// POST 
router.post("/createMuniUser", createMuni);

// GET
router.get("/munis", TokenValidator, getMunis);

// GET
router.get("/munis/:id", TokenValidator, getMuni);

// UPDATE
router.put("/updateMuni/:id", TokenValidator, updateMuni);

// DELETE
router.delete("/deleteMuni/:id", TokenValidator, deleteMuni);

export default router;