"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const procedure_controllers_1 = require("../controllers/procedure.controllers");
const validateMuni_1 = require("../middlewares/validateMuni");
const validateAdmin_1 = require("../middlewares/validateAdmin");
const validateMuniAndUser_1 = require("../middlewares/validateMuniAndUser");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.post("/procedure", validateAdmin_1.isAdminRole, procedure_controllers_1.createProcedure);
router.post("/submit-procedure", validateAdmin_1.isAdminRole, procedure_controllers_1.submitProcedure);
// TRAER TODOS LOS TRAMITES DE UN USUARIO DEL LADO DEL USER
router.get("/history/user", user_controller_1.getMyProcedures);
// TRAER TODOS LOS TRAMITES DE UN USUARIO DEL LADO DEL MUNI
router.get("/history/user/:id", user_controller_1.getProceduresOfUser);
router.get("/template/:id", validateMuniAndUser_1.isUserOrMuni, procedure_controllers_1.getTemplateProcedureById);
router.get("/history", validateMuni_1.isMuniRole, procedure_controllers_1.getHistoryOfProcedures);
router.get("/history/:id", validateMuni_1.isMuniRole, procedure_controllers_1.getOneProcedureFromHistory);
router.get("/procedures", validateMuniAndUser_1.isUserOrMuni, procedure_controllers_1.getProcedures);
router.get("/procedure/:id", validateMuniAndUser_1.isUserOrMuni, procedure_controllers_1.getProcedure);
router.put("/procedure/:id", validateAdmin_1.isAdminRole, procedure_controllers_1.updateProcedure);
router.delete("/procedure/:id", validateAdmin_1.isAdminRole, procedure_controllers_1.deleteProcedure);
exports.default = router;
