import { Router } from "express";
import {
    createMuni,
    getMuni,
    getMunis,
    updateMuni,
    deleteMuni
} from "../controllers/muni.controllers";
import { isAdminRole } from "../middlewares/validateAdmin";
import { validateId } from "../middlewares/validateId";
import { isMuniRole } from "../middlewares/validateMuni";
const router = Router();

// POST
router.post("/createMuni", isAdminRole, createMuni);

// GET
router.get("/munis", isMuniRole, getMunis);
router.get("/munis/:id", isMuniRole, getMuni);

// PUT
router.put("/munis/:id", isMuniRole, validateId, updateMuni);

// DELETE
router.delete("/munis/:id", isAdminRole, deleteMuni);

export default router;