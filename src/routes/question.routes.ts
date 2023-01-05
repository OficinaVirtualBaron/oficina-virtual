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

router.post("/createQuestion", isAdminRole, createQuestion);
router.get("/getQuestions", isAdminRole, getQuestions);
router.get("/getQuestion/:id", isAdminRole, getQuestion);
router.put("/updateQuestion/:id", isAdminRole, updateQuestion);
router.delete("/deleteQuestion/:id", isAdminRole, deleteQuestion);

export default router;