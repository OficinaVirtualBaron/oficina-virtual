import { Router } from "express";
import {
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    getProfile
} from "../controllers/user.controller";
import { isUserRole } from "../middlewares/validateUser";
import { isMuniRole } from "../middlewares/validateMuni";
import { isAdminRole } from "../middlewares/validateAdmin";
import { validateId } from "../middlewares/validateId";
const router = Router();

// GET
router.get("/users", isMuniRole, getUsers);
router.get("/users/:id", isMuniRole, getUser);
router.get("/user/profile", isUserRole, getProfile);

// PUT
router.put("/user", isUserRole, updateUser);

// DELETE
router.delete("/user/:id", isAdminRole, deleteUser);

export default router;
