import {Router} from "express";
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

router.post("/createMuni", isAdminRole, createMuni);
router.get("/munis", isMuniRole, getMunis);
router.get("/munis/:id", isMuniRole, getMuni);
router.put("/munis/:id", isMuniRole, updateMuni);
router.delete("/munis/:id", isAdminRole, deleteMuni);

export default router;