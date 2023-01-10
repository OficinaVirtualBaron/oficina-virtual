import { Router } from "express";
import {
    createStatus
} from "../controllers/status.controller";
import { isAdminRole } from "../middlewares/validateAdmin";
const router = Router();

router.post("/", isAdminRole, createStatus);

export default router;

