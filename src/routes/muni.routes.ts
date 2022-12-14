import {Router} from "express";
import { Request, Response } from "express";
import {
    createMuni,
    getMuni,
    getMunis,
    updateMuni,
    deleteMuni
} from "../controllers/muni.controllers";
import { isAdminRole } from "../middlewares/validateAdmin";
import { isMuniRole } from "../middlewares/validateMuni";

const router = Router();

// POST 
router.post("/createMuniUser", isAdminRole, createMuni);

// GET
router.get("/munis", isMuniRole, getMunis);

// GET
router.get("/munis/:id", isMuniRole, getMuni);

// UPDATE
router.put("/updateMuni/:id", isMuniRole, updateMuni);

// DELETE
router.delete("/deleteMuni/:id", isAdminRole, deleteMuni);

export default router;