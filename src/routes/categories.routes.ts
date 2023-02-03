import { Router } from "express";
import {
    createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory
} from "../controllers/categories.controller";
import { getProcedureByCategory } from "../controllers/procedure.controllers";
import { isAdminRole } from "../middlewares/validateAdmin";
import { isUserOrMuni } from "../middlewares/validateMuniAndUser";
const router = Router();

// POST
router.post("/category", isAdminRole, createCategory);

// GET
router.get("/category/:id", isUserOrMuni, getCategory);
router.get("/category/procedure/:category_id", isUserOrMuni, getProcedureByCategory);
router.get("/categories", isUserOrMuni, getCategories);

// PUT
router.put("/category/:id", isAdminRole, updateCategory);

// DELETE
router.delete("/category/:id", isAdminRole, deleteCategory);

export default router;