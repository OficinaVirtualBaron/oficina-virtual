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
    getProceduresByStatus
} from "../controllers/procedure.controllers";
import {
    getMyProcedures,
    getProceduresOfUser
} from "../controllers/user.controller";
import { isMuniRole } from "../middlewares/validateMuni";
import { isAdminRole } from "../middlewares/validateAdmin";
import { isUserOrMuni } from "../middlewares/validateMuniAndUser";
import { isUserRole } from "../middlewares/validateUser";
const router = Router();

// POST
router.post("/procedure", isAdminRole, createProcedure);
router.post("/submit-procedure", isAdminRole, submitProcedure);

// GET
router.get("/history/user", isUserRole, getMyProcedures);
router.get("/history/user/:id", isMuniRole, getProceduresOfUser);
router.get("/history", isMuniRole, getHistoryOfProcedures);
router.get("/history/:id", isMuniRole, getOneProcedureFromHistory);
router.get("/template/:id", isUserOrMuni, getTemplateProcedureById);
router.get("/procedures", isUserOrMuni, getProcedures);
router.get("/procedure/:id", isUserOrMuni, getProcedure);
router.get("/history-procedures/status/:id", getProceduresByStatus);

// PUT
router.put("/procedure/:id", isAdminRole, updateProcedure);

// DELETE
router.delete("/procedure/:id", isAdminRole, deleteProcedure);

export default router;