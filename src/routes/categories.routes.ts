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

// POST
router.post("/createCategory", isAdminRole, createCategory);

// GET 
router.get("/getCategory/:id", isUserRole, getCategory);

// GET 
router.get("/getCategories", isUserRole, getCategories);

// UPDATE
router.put("/updateCategory/:id", isAdminRole, updateCategory);

// DELETE
router.delete("/deleteCategory/:id", isAdminRole, deleteCategory);

export default router;