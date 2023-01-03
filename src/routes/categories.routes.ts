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

router.post("/createCategory", isAdminRole, createCategory);
router.get("/getCategory/:id", isUserOrMuni, getCategory);
router.get("/getCategories", isUserOrMuni, getCategories);
router.put("/updateCategory/:id", isAdminRole, updateCategory);
router.delete("/deleteCategory/:id", isAdminRole, deleteCategory);

export default router;