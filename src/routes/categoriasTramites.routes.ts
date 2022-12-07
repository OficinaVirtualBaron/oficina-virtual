import {Router} from "express";
import {
    createCategoriaTramite,
    getCategorias,
    getCategoria,
    updateCategoria,
    deleteCategoria,
} from "../controllers/categoriaTramite.controllers"
import { TokenValidator } from "../middlewares/validateToken";

const router = Router();

// CRUD CATEGORIAS DE TRAMITES
// POST
router.post("/createCategoriaTramite", createCategoriaTramite);

// GET
router.get("/getCategorias", TokenValidator, getCategorias);

// GET
router.get("/getCategoria/:id", TokenValidator, getCategoria);

// UPDATE
router.put("/updateCategoria/:id", updateCategoria);

// DELETE
router.delete("/deleteCategoria/:id", deleteCategoria);

export default router;