"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const muni_controllers_1 = require("../controllers/muni.controllers");
const validateMuni_1 = require("../middlewares/validateMuni");
const router = (0, express_1.Router)();
router.post("/signUp", validateMuni_1.isMuniRole, user_controller_1.createUser);
router.post("/signIn", user_controller_1.signIn);
router.post("/signinMunicipales", muni_controllers_1.signInMuni);
exports.default = router;
