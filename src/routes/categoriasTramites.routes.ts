import {Router} from "express";
import {
    createCategoriaTramite,
    getCategorias,
    getCategoria,
    updateCategoria,
    deleteCategoria,
} from "../controllers/categoriaTramite.controllers"
import { TokenAndRoleValidatorMuni } from "../middlewares/TokenAndRoleValidatorMuni";

const router = Router();

// POST
router.post("/createCategoriaTramite", createCategoriaTramite);

// GET
router.get("/getCategorias", TokenAndRoleValidatorMuni, getCategorias);

// GET
router.get("/getCategoria/:id", TokenAndRoleValidatorMuni, getCategoria);

// UPDATE
router.put("/updateCategoria/:id", TokenAndRoleValidatorMuni, updateCategoria);

// DELETE
router.delete("/deleteCategoria/:id", deleteCategoria);

export default router;