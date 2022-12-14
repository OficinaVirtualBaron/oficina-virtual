"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriaTramite_controllers_1 = require("../controllers/categoriaTramite.controllers");
const validateAdmin_1 = require("../middlewares/validateAdmin");
const validateMuni_1 = require("../middlewares/validateMuni");
const router = (0, express_1.Router)();
// POST
router.post("/createCategoriaTramite", validateAdmin_1.isAdminRole, categoriaTramite_controllers_1.createCategoriaTramite);
// GET
router.get("/getCategorias", validateMuni_1.isMuniRole, categoriaTramite_controllers_1.getCategorias);
// GET
router.get("/getCategoria/:id", validateMuni_1.isMuniRole, categoriaTramite_controllers_1.getCategoria);
// UPDATE
router.put("/updateCategoria/:id", validateAdmin_1.isAdminRole, categoriaTramite_controllers_1.updateCategoria);
// DELETE
router.delete("/deleteCategoria/:id", validateAdmin_1.isAdminRole, categoriaTramite_controllers_1.deleteCategoria);
exports.default = router;
