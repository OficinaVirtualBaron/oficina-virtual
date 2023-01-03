import { Router } from "express";
import {
    createProcedure,
    getProcedures,
    getProcedure,
    updateProcedure,
    deleteProcedure
} from "../controllers/procedure.controllers";
import { isAdminRole } from "../middlewares/validateAdmin";
import { isUserOrMuni } from "../middlewares/validateMuniAndUser";
const router = Router();

router.post("/createProcedure", isAdminRole, createProcedure);
router.get("/getProcedure", isUserOrMuni, getProcedures);
router.get("/getProcedure/:id", isUserOrMuni, getProcedure);
router.put("/updateProcedure/:id", isAdminRole, updateProcedure);
router.delete("/deleteProcedure", isAdminRole, deleteProcedure);

export default router;