"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriaTramite_controllers_1 = require("../controllers/categoriaTramite.controllers");
const validateToken_1 = require("../middlewares/validateToken");
const router = (0, express_1.Router)();
// CRUD CATEGORIAS DE TRAMITES
// POST
router.post("/createCategoriaTramite", categoriaTramite_controllers_1.createCategoriaTramite);
// GET
router.get("/getCategorias", validateToken_1.TokenValidator, categoriaTramite_controllers_1.getCategorias);
// GET
router.get("/getCategoria/:id", validateToken_1.TokenValidator, categoriaTramite_controllers_1.getCategoria);
// UPDATE
router.put("/updateCategoria/:id", categoriaTramite_controllers_1.updateCategoria);
// DELETE
router.delete("/deleteCategoria/:id", categoriaTramite_controllers_1.deleteCategoria);
exports.default = router;
