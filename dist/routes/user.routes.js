"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validateUser_1 = require("../middlewares/validateUser");
const validateMuni_1 = require("../middlewares/validateMuni");
const validateAdmin_1 = require("../middlewares/validateAdmin");
const router = (0, express_1.Router)();
router.get("/users", validateMuni_1.isMuniRole, user_controller_1.getUsers);
router.get("/users/:id", validateMuni_1.isMuniRole, user_controller_1.getUser);
router.put("/user/:id", validateUser_1.isUserRole, user_controller_1.updateUser);
router.delete("/user/:id", validateAdmin_1.isAdminRole, user_controller_1.deleteUser);
exports.default = router;
