import { Router } from "express";
import {
    createProcedure,
    getProcedures,
    getProcedure,
    updateProcedure,
    deleteProcedure
} from "../controllers/procedure.controllers";
import { isAdminRole } from "../middlewares/validateAdmin";
const router = Router();

router.post("/createProcedure", isAdminRole, createProcedure);
router.get("/getProcedure", isAdminRole, getProcedures);
router.get("/getProcedure/:id", isAdminRole, getProcedure);
router.put("/updateProcedure/:id", isAdminRole, updateProcedure);
router.delete("/deleteProcedure", isAdminRole, deleteProcedure);

export default router;