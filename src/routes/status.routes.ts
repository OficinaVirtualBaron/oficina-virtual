import { Router } from "express";
import {
    createStatus
} from "../controllers/status.controller";
import { isAdminRole } from "../middlewares/validateAdmin";
const router = Router();

// POST
router.post("/", isAdminRole, createStatus);

export default router;

