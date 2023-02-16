import Joi from "joi";

export const submitProcedureSchema = Joi.object({
    procedureId: Joi.number().min(1),
    userId: Joi.number().min(1),
    categoryId: Joi.number().min(1),
    statusId: Joi.number().min(1),
    questions: Joi.array(),
});