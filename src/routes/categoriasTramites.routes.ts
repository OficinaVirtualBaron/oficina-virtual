import {Router} from "express";
import { Request, Response } from "express";
import {
    createCategoriaTramite,
    getCategorias,
    getCategoria,
    updateCategoria,
    deleteCategoria,
} from "../controllers/categoriaTramite.controllers"

const router = Router();

// CRUD CATEGORIAS DE TRAMITES
// POST crear solamente la categoria de tramites (ej: transito, rentas, etc)
router.post("/createCategoriaTramite", createCategoriaTramite);

// GET todas las categorias que hay en la DB
router.get("/getCategorias", getCategorias);

// GET buscar la categoria por su ID
router.get("/getCategoria/:id", getCategoria);

// UPDATE actualizar titulo y/o descripcion de una categoria
router.put("/updateCategoria/:id", updateCategoria);

// DELETE borrar categoria por su ID
router.delete("/deleteCategoria/:id", deleteCategoria);

export default router;