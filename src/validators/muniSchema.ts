import Joi from "joi";

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