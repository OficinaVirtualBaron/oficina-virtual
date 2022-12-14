import {Router} from "express";
import {
    createCategoriaTramite,
    getCategorias,
    getCategoria,
    updateCategoria,
    deleteCategoria,
} from "../controllers/categoriaTramite.controllers"
import { isAdminRole } from "../middlewares/validateAdmin";
import { isMuniRole } from "../middlewares/validateMuni";

const router = Router();

// POST
router.post("/createCategoriaTramite", isAdminRole, createCategoriaTramite);

// GET
router.get("/getCategorias", isMuniRole, getCategorias);

// GET
router.get("/getCategoria/:id", isMuniRole, getCategoria);

// UPDATE
router.put("/updateCategoria/:id", isAdminRole, updateCategoria);

// DELETE
router.delete("/deleteCategoria/:id", isAdminRole, deleteCategoria);

export default router;