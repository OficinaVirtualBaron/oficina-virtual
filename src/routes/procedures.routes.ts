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
router.get("/procedures", isUserOrMuni, getProcedures);
router.get("/procedure/:id", isUserOrMuni, getProcedure);
router.put("/procedure/:id", isAdminRole, updateProcedure);
router.delete("/procedure", isAdminRole, deleteProcedure);

// PRUEBA DE OBTENER EL HISTORIAL DE TRÁMITES
router.get("/history", getHistoryOfProcedures);

// PRUEBA DE PRESENTAR UN TRAMITE
router.post("/submit-procedure", isAdminRole, submitProcedure);

// PRUEBA DE OBTENER UN TRÁMITE DEL HISTORIAL (solo el trámite) cambiar route en insomnia
router.get("/history/:id", getOneProcedureFromHistory);

export default router;