"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const muni_controllers_1 = require("../controllers/muni.controllers");
const validateToken_1 = require("../middlewares/validateToken");
const router = (0, express_1.Router)();
// POST 
router.post("/createMuniUser", muni_controllers_1.createMuni);
// GET
router.get("/munis", validateToken_1.TokenValidator, muni_controllers_1.getMunis);
// GET
router.get("/munis/:id", validateToken_1.TokenValidator, muni_controllers_1.getMuni);
// UPDATE
router.put("/updateMuni/:id", validateToken_1.TokenValidator, muni_controllers_1.updateMuni);
// DELETE
router.delete("/deleteMuni/:id", validateToken_1.TokenValidator, muni_controllers_1.deleteMuni);
exports.default = router;
