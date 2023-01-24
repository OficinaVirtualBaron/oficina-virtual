import { Router } from "express";
import {
    createProcedure,
    getProcedures,
    getProcedure,
    updateProcedure,
    deleteProcedure,
    submitProcedure,
    getOneProcedureFromHistory,
    getHistoryOfProcedures
} from "../controllers/procedure.controllers";
import { isAdminRole } from "../middlewares/validateAdmin";
import { isUserOrMuni } from "../middlewares/validateMuniAndUser";
const router = Router();

router.post("/procedure", isAdminRole, createProcedure);
router.post("/submit-procedure", isAdminRole, submitProcedure);
router.get("/history", getHistoryOfProcedures);
router.get("/history/:id", getOneProcedureFromHistory);
router.get("/procedures", isUserOrMuni, getProcedures);
router.get("/procedure/:id", isUserOrMuni, getProcedure);
router.put("/procedure/:id", isAdminRole, updateProcedure);
router.delete("/procedure/:id", isAdminRole, deleteProcedure);

export default router;