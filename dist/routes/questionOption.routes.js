"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const questionOption_controllers_1 = require("../controllers/questionOption.controllers");
const validateAdmin_1 = require("../middlewares/validateAdmin");
const router = (0, express_1.Router)();
// POST
router.post("/question_option", validateAdmin_1.isAdminRole, questionOption_controllers_1.createQuestionOption);
// GET
router.get("/question_option", validateAdmin_1.isAdminRole, questionOption_controllers_1.getQuestionOptions);
router.get("/question_option/:id", validateAdmin_1.isAdminRole, questionOption_controllers_1.getQuestionOption);
// PUT
router.put("/question_option/:id", validateAdmin_1.isAdminRole, questionOption_controllers_1.updateQuestionOption);
// DELETE
router.delete("/question_option", validateAdmin_1.isAdminRole, questionOption_controllers_1.deleteQuestionOption);
exports.default = router;
