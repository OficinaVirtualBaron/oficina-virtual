import { Router } from "express";
import {
    createQuestionOption,
    getQuestionOption,
    getQuestionOptions,
    updateQuestionOption,
    deleteQuestionOption
} from "../controllers/questionOption.controllers";
import { isAdminRole } from "../middlewares/validateAdmin";
const router = Router();

// POST
router.post("/question_option", isAdminRole, createQuestionOption);

// GET
router.get("/question_option", isAdminRole, getQuestionOptions);
router.get("/question_option/:id", isAdminRole, getQuestionOption);

// PUT
router.put("/question_option/:id", isAdminRole, updateQuestionOption);

// DELETE
router.delete("/question_option", isAdminRole, deleteQuestionOption);

export default router;