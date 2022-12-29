"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const muni_controllers_1 = require("../controllers/muni.controllers");
const validateAdmin_1 = require("../middlewares/validateAdmin");
const validateMuni_1 = require("../middlewares/validateMuni");
const router = (0, express_1.Router)();
router.post("/createMuniUser", validateAdmin_1.isAdminRole, muni_controllers_1.createMuni);
router.get("/users/:id/history_procedures", validateMuni_1.isMuniRole, (req, res) => {
    res.send("Aquí todos los trámites del user que elegí");
});
router.get("/munis", validateMuni_1.isMuniRole, muni_controllers_1.getMunis);
router.get("/munis/:id", validateMuni_1.isMuniRole, muni_controllers_1.getMuni);
router.put("/updateMuni/:id", validateMuni_1.isMuniRole, muni_controllers_1.updateMuni);
router.delete("/deleteMuni/:id", validateAdmin_1.isAdminRole, muni_controllers_1.deleteMuni);
exports.default = router;
