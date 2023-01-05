"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controller_1 = require("../controllers/categories.controller");
const validateAdmin_1 = require("../middlewares/validateAdmin");
const validateMuniAndUser_1 = require("../middlewares/validateMuniAndUser");
const router = (0, express_1.Router)();
router.post("/createCategory", validateAdmin_1.isAdminRole, categories_controller_1.createCategory);
router.get("/getCategory/:id", validateMuniAndUser_1.isUserOrMuni, categories_controller_1.getCategory);
router.get("/getCategories", validateMuniAndUser_1.isUserOrMuni, categories_controller_1.getCategories);
router.put("/updateCategory/:id", validateAdmin_1.isAdminRole, categories_controller_1.updateCategory);
router.delete("/deleteCategory/:id", validateAdmin_1.isAdminRole, categories_controller_1.deleteCategory);
exports.default = router;
