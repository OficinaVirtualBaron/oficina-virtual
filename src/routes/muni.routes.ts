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

router.post("/createMuniUser", isAdminRole, createMuni);
router.get("/users/:id/history_procedures", isMuniRole, (req, res) => {
    res.send("Aquí todos los trámites del user que elegí");
})
router.get("/munis", isMuniRole, getMunis);
router.get("/munis/:id", isMuniRole, getMuni);
router.put("/updateMuni/:id", isMuniRole, updateMuni);
router.delete("/deleteMuni/:id", isAdminRole, deleteMuni);

export default router;