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