"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controller_1 = require("../controllers/categories.controller");
const procedure_controllers_1 = require("../controllers/procedure.controllers");
const validateAdmin_1 = require("../middlewares/validateAdmin");
const validateMuniAndUser_1 = require("../middlewares/validateMuniAndUser");
const router = (0, express_1.Router)();
// POST
router.post("/category", validateAdmin_1.isAdminRole, categories_controller_1.createCategory);
// GET
router.get("/category/:id", validateMuniAndUser_1.isUserOrMuni, categories_controller_1.getCategory);
router.get("/category/procedure/:category_id", validateMuniAndUser_1.isUserOrMuni, procedure_controllers_1.getProcedureByCategory);
router.get("/categories", validateMuniAndUser_1.isUserOrMuni, categories_controller_1.getCategories);
// PUT
router.put("/category/:id", validateAdmin_1.isAdminRole, categories_controller_1.updateCategory);
// DELETE
router.delete("/category/:id", validateAdmin_1.isAdminRole, categories_controller_1.deleteCategory);
exports.default = router;
