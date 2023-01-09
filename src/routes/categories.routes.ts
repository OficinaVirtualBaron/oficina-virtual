import { Router } from "express";
import {
    createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory
} from "../controllers/categories.controller";
import { isAdminRole } from "../middlewares/validateAdmin";
import { isUserOrMuni } from "../middlewares/validateMuniAndUser";
const router = Router();

router.post("/category", isAdminRole, createCategory);
router.get("/category/:id", isUserOrMuni, getCategory);
router.get("/categories", isUserOrMuni, getCategories);
router.put("/category/:id", isAdminRole, updateCategory);
router.delete("/category/:id", isAdminRole, deleteCategory);

export default router;