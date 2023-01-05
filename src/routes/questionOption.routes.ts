import { Router } from "express";
import {
    createQuestionOption,
    getQuestionOption,
    getQuestionOptions,
    updateQuestionOption,
    deleteQuestionOption
} from "../controllers/question_option.controllers";
import { isAdminRole } from "../middlewares/validateAdmin";
const router = Router();

router.post("/createOption", isAdminRole, createQuestionOption);
router.get("/getOptions", isAdminRole, getQuestionOptions);
router.get("/getOption/:id", isAdminRole, getQuestionOption);
router.put("/updateOption/:id", isAdminRole, updateQuestionOption);
router.delete("/deleteOption", isAdminRole, deleteQuestionOption);

export default router;