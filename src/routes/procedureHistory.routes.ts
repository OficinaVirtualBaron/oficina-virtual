import { Router } from "express";
import {
    getHistory,
    getOneProcedureHistory,
    deleteProcedureOfHistory,
    changeStatusProcedure
} from "../controllers/procedureHistory.controllers";
import { isMuniRole } from "../middlewares/validateMuni";
import { isAdminRole } from "../middlewares/validateAdmin";
const router = Router();

router.get("/history", isMuniRole, getHistory);
router.get("/history/:id", isMuniRole, getOneProcedureHistory);
router.put("/procedure/:id", isMuniRole, changeStatusProcedure);
router.delete("/history:id", isAdminRole, deleteProcedureOfHistory);

export default router;