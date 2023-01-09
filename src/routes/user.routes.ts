import {Router} from "express";
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

router.get("/users", isMuniRole, getUsers);
router.get("/users/:id", isMuniRole, getUser);
router.put("/user/:id", isUserRole, updateUser);
router.delete("/user/:id", isAdminRole, deleteUser);

export default router;