import Joi from "joi";

export const createUserSchema = Joi.object({
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).max(30).pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
    email: Joi.string().email().required(),
    cuil: Joi.string().min(11).max(11).alphanum().required(),
    adress: Joi.string().min(3).max(30).required(),
});

export const updateUserSchema = Joi.object({
    password: Joi.string().min(8).max(30).pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
    email: Joi.string().email(),
});

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

export const createMuniSchema = Joi.object({
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: Joi.string().email().required(),
    cuil: Joi.string().min(11).max(11).required(),
    required: Joi.number(),
    inprocess: Joi.number(),
    finalized: Joi.number(),
    category: Joi.number().min(1),
});

export const updateMuniSchema = Joi.object({
    firstname: Joi.string().min(3).max(30),
    lastname: Joi.string().min(3).max(30),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).max(30),
    email: Joi.string(),
    area: Joi.string().required(),
});

export const createOptionSchema = Joi.object({
    title: Joi.string().min(2).max(30),
    enabled: Joi.boolean(),
    question_option: Joi.number().min(1)
});

export const submitProcedureSchema = Joi.object({
    userId: Joi.number().min(1),
    categoryId: Joi.number().min(1),
    statusId: Joi.number().min(1),
    questions: Joi.array(),
});