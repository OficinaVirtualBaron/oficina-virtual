import {Router} from "express";
import { Request, Response } from "express";
import {
    getUser,
    getUsers,
    updateUser,
    deleteUser
} from "../controllers/user.controller";
import { isUserRole } from "../middlewares/validateUser";
import { isMuniRole } from "../middlewares/validateMuni";
import { isAdminRole } from "../middlewares/validateAdmin";

const router = Router();

// GET 
router.get("/users", isMuniRole, getUsers);

// GET 
router.get("/users/:id", isMuniRole, getUser);

// UPDATE 
router.put("/updateUser/:id", isUserRole, updateUser);

// DELETE 
router.delete("/deleteUser/:id", isAdminRole, deleteUser);

export default router;