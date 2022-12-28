import { Router, Response, Request } from "express";
import {
    createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory
} from "../controllers/categories.controller";
import { isUserRole } from "../middlewares/validateUser";
import { isAdminRole } from "../middlewares/validateAdmin";
const router = Router();

router.post("/createCategory", isAdminRole, createCategory);
router.get("/getCategory/:id", isUserRole, getCategory);
router.get("/getCategories", isUserRole, getCategories);
router.put("/updateCategory/:id", isAdminRole, updateCategory);
router.delete("/deleteCategory/:id", isAdminRole, deleteCategory);

export default router;