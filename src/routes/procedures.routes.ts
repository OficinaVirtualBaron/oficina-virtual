import { Router } from "express";
import {
    createProcedure,
    getProcedures,
    getProcedure,
    updateProcedure,
    deleteProcedure,
    submitProcedure,
    getCompletedProcedure
} from "../controllers/procedure.controllers";
import { isAdminRole } from "../middlewares/validateAdmin";
import { isUserOrMuni } from "../middlewares/validateMuniAndUser";
const router = Router();

router.post("/procedure", isAdminRole, createProcedure);
// PRUEBA DE PRESENTAR UN TRAMITE
router.post("/submit-procedure", isAdminRole, submitProcedure);
// PRUEBA DE OBTENER UN TRÁMITE DEL HISTORIAL (solo el trámite)
router.get("/procedure-completed/:id", getCompletedProcedure);
router.get("/procedures", isUserOrMuni, getProcedures);
router.get("/procedure/:id", isUserOrMuni, getProcedure);
router.put("/procedure/:id", isAdminRole, updateProcedure);
router.delete("/procedure", isAdminRole, deleteProcedure);

export default router;