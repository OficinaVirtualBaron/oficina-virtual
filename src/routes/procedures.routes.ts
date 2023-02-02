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
    getTemplateProcedureById
} from "../controllers/procedure.controllers";
import { isMuniRole } from "../middlewares/validateMuni";
import { isAdminRole } from "../middlewares/validateAdmin";
import { isUserOrMuni } from "../middlewares/validateMuniAndUser";
import { getMyProcedures, getProceduresOfUser } from "../controllers/user.controller";
const router = Router();

router.post("/procedure", isAdminRole, createProcedure);
router.post("/submit-procedure", isAdminRole, submitProcedure);
// TRAER TODOS LOS TRAMITES DE UN USUARIO DEL LADO DEL USER
router.get("/history/user", getMyProcedures);
// TRAER TODOS LOS TRAMITES DE UN USUARIO DEL LADO DEL MUNI
router.get("/history/user/:id", getProceduresOfUser);
router.get("/template/:id", isUserOrMuni, getTemplateProcedureById);
router.get("/history", isMuniRole, getHistoryOfProcedures);
router.get("/history/:id", isMuniRole, getOneProcedureFromHistory);
router.get("/procedures", isUserOrMuni, getProcedures);
router.get("/procedure/:id", isUserOrMuni, getProcedure);
router.put("/procedure/:id", isAdminRole, updateProcedure);
router.delete("/procedure/:id", isAdminRole, deleteProcedure);

export default router;