"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const muni_controllers_1 = require("../controllers/muni.controllers");
const router = (0, express_1.Router)();
// POST
router.post("/signUp", user_controller_1.createUser);
// POST
router.post("/signin", user_controller_1.signIn);
// POST
router.post("/signinMunicipales", muni_controllers_1.signInMuni);
exports.default = router;
