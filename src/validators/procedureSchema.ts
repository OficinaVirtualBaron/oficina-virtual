import Joi from "joi";

export const submitProcedureSchema = Joi.object({
    userId: Joi.number().min(1),
    categoryId: Joi.number().min(1),
    statusId: Joi.number().min(1),
    questions: Joi.array(),
});