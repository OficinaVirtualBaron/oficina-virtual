import { Router } from "express";
import {
    createQuestion,
    getQuestions,
    getQuestion,
    updateQuestion,
    deleteQuestion
} from "../controllers/question.controllers";
import { isAdminRole } from "../middlewares/validateAdmin";
const router = Router();

router.post("/question", isAdminRole, createQuestion);
router.get("/questions", isAdminRole, getQuestions);
router.get("/question/:id", isAdminRole, getQuestion);
router.put("/question/:id", isAdminRole, updateQuestion);
router.delete("/question/:id", isAdminRole, deleteQuestion);

export default router;