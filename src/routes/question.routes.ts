import {Router} from "express";
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
router.get("/getQuestion", isAdminRole, getQuestion);
router.put("/updateQuestion", isAdminRole, updateQuestion);
router.delete("/deleteQuestion", isAdminRole, deleteQuestion);

export default router;