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

router.post("/question_option", isAdminRole, createQuestionOption);
router.get("/question_option", isAdminRole, getQuestionOptions);
router.get("/question_option/:id", isAdminRole, getQuestionOption);
router.put("/question_option/:id", isAdminRole, updateQuestionOption);
router.delete("/question_option", isAdminRole, deleteQuestionOption);

export default router;