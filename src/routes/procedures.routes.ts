import { Router } from "express";
import {
    createProcedure,
    getProcedures,
    getProcedure,
    updateProcedure,
    deleteProcedure,
    submitProcedure,
    getOneProcedureFromHistory,
    getHistoryOfProcedures,
    getTemplateProcedureById,
    getProceduresByStatus,
    updateStatusOfProcedure
} from "../controllers/procedure.controllers";
import {
    getMyProcedures,
    getProceduresOfUser
} from "../controllers/user.controller";
import { isMuniRole } from "../middlewares/validateMuni";
import { isAdminRole } from "../middlewares/validateAdmin";
import { isUserOrMuni } from "../middlewares/validateMuniAndUser";
const router = Router();

// POST
router.post("/procedure", isAdminRole, createProcedure);
router.post("/submit-procedure", submitProcedure);

// GET
router.get("/history/user", getMyProcedures);
router.get("/history/user/:id", isMuniRole, getProceduresOfUser);
router.get("/history", isMuniRole, getHistoryOfProcedures);
router.get("/history-procedures/status/:id", getProceduresByStatus);
router.get("/history/:id", isMuniRole, getOneProcedureFromHistory);
router.get("/template/:id", isUserOrMuni, getTemplateProcedureById);
router.get("/procedures", isUserOrMuni, getProcedures);
router.get("/procedure/:id", isUserOrMuni, getProcedure);

// PUT
router.put("/procedure/:id", isAdminRole, updateProcedure);
router.put("/procedure/update-status/:id", updateStatusOfProcedure);

// DELETE
router.delete("/procedure/:id", isAdminRole, deleteProcedure);

export default router;