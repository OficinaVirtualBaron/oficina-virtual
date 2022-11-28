import Joi from "joi"

export const createUserSchema = Joi.object({
    firstname: Joi.string().alphanum().min(3).max(30).required(),
    lastname: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().alphanum().min(8).max(30).required(),
    email: Joi.string().required(),
    cuil: Joi.number().integer().required(),
})

export const updateUserSchema = Joi.object({
    firstname: Joi.string().alphanum().min(3).max(30).required(),
    lastname: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().alphanum().min(8).max(30).required(),
    email: Joi.string().required(),
})