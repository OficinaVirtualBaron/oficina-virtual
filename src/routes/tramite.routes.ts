import { create } from "domain";
import {Router} from "express";
import { 
    createTramite, 
    deleteTramite 
} from "../controllers/tramite.controller";

const router = Router();

router.post("/tramite", createTramite);

router.delete("/tramite/:id", deleteTramite);

export default router;