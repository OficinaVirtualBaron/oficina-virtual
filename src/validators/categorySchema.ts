import Joi from "joi";

export const createCategorySchema = Joi.object({
    user_id: Joi.number().max(30),
    title: Joi.string().min(5).max(30),
    category_id: Joi.number().max(30),
    description: Joi.string().min(10).max(100),
});

export const updateCategorySchema = Joi.object({
    title: Joi.string().min(5).max(30),
    description: Joi.string().min(10).max(100),
});