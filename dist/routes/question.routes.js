"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const question_controllers_1 = require("../controllers/question.controllers");
const validateAdmin_1 = require("../middlewares/validateAdmin");
const router = (0, express_1.Router)();
// POST
router.post("/question", validateAdmin_1.isAdminRole, question_controllers_1.createQuestion);
// GET
router.get("/questions", validateAdmin_1.isAdminRole, question_controllers_1.getQuestions);
router.get("/question/:id", validateAdmin_1.isAdminRole, question_controllers_1.getQuestion);
// PUT
router.put("/question/:id", validateAdmin_1.isAdminRole, question_controllers_1.updateQuestion);
// DELETE
router.delete("/question/:id", validateAdmin_1.isAdminRole, question_controllers_1.deleteQuestion);
exports.default = router;
