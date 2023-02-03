"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const muni_controllers_1 = require("../controllers/muni.controllers");
const validateAdmin_1 = require("../middlewares/validateAdmin");
const validateId_1 = require("../middlewares/validateId");
const validateMuni_1 = require("../middlewares/validateMuni");
const router = (0, express_1.Router)();
// POST
router.post("/createMuni", validateAdmin_1.isAdminRole, muni_controllers_1.createMuni);
// GET
router.get("/munis", validateMuni_1.isMuniRole, muni_controllers_1.getMunis);
router.get("/munis/:id", validateMuni_1.isMuniRole, muni_controllers_1.getMuni);
// PUT
router.put("/munis/:id", validateMuni_1.isMuniRole, validateId_1.validateId, muni_controllers_1.updateMuni);
// DELETE
router.delete("/munis/:id", validateAdmin_1.isAdminRole, muni_controllers_1.deleteMuni);
exports.default = router;
