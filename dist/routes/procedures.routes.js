"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const procedure_controllers_1 = require("../controllers/procedure.controllers");
const user_controller_1 = require("../controllers/user.controller");
const validateMuni_1 = require("../middlewares/validateMuni");
const validateAdmin_1 = require("../middlewares/validateAdmin");
const validateMuniAndUser_1 = require("../middlewares/validateMuniAndUser");
const router = (0, express_1.Router)();
// POST
router.post("/procedure", validateAdmin_1.isAdminRole, procedure_controllers_1.createProcedure);
router.post("/submit-procedure", procedure_controllers_1.submitProcedure);
// GET
router.get("/history/user", user_controller_1.getMyProcedures);
router.get("/history/user/:id", validateMuni_1.isMuniRole, user_controller_1.getProceduresOfUser);
router.get("/history", validateMuni_1.isMuniRole, procedure_controllers_1.getHistoryOfProcedures);
router.get("/history-procedures/status/:id", procedure_controllers_1.getProceduresByStatus);
router.get("/history/:id", validateMuni_1.isMuniRole, procedure_controllers_1.getOneProcedureFromHistory);
router.get("/template/:id", validateMuniAndUser_1.isUserOrMuni, procedure_controllers_1.getTemplateProcedureById);
router.get("/procedures", validateMuniAndUser_1.isUserOrMuni, procedure_controllers_1.getProcedures);
router.get("/procedure/:id", validateMuniAndUser_1.isUserOrMuni, procedure_controllers_1.getProcedure);
// PUT
router.put("/procedure/:id", validateAdmin_1.isAdminRole, procedure_controllers_1.updateProcedure);
router.put("/procedure/update-status/:id", procedure_controllers_1.updateStatusOfProcedure);
// DELETE
router.delete("/procedure/:id", validateAdmin_1.isAdminRole, procedure_controllers_1.deleteProcedure);
exports.default = router;
