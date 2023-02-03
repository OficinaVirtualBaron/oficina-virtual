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

// POST
router.post("/question", isAdminRole, createQuestion);

// GET
router.get("/questions", isAdminRole, getQuestions);
router.get("/question/:id", isAdminRole, getQuestion);

// PUT
router.put("/question/:id", isAdminRole, updateQuestion);

// DELETE
router.delete("/question/:id", isAdminRole, deleteQuestion);

export default router;