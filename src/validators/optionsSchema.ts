import Joi from "joi";

export const createOptionSchema = Joi.object({
    title: Joi.string().min(2).max(30),
    enabled: Joi.boolean(),
    question_option: Joi.number().min(1)
});