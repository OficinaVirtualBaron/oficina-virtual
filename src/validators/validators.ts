import Joi from "joi"

export const createUserSchema = Joi.object({
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: Joi.string().email().required(),
    cuil: Joi.string().min(10).max(12).required(),
    adress: Joi.string().min(3).max(30).required(),
})

export const updateUserSchema = Joi.object({
    firstname: Joi.string().min(3).max(30),
    lastname: Joi.string().min(3).max(30),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).max(30),
    email: Joi.string(),
})

export const createCategoriaTramiteSchema = Joi.object({
    title: Joi.string().min(5).max(30),
    description: Joi.string().min(10).max(100),
})

export const updateCategoriaTramiteSchema = Joi.object({
    title: Joi.string().min(5).max(30),
    description: Joi.string().min(10).max(100),
})

export const createMuniSchema = Joi.object({
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: Joi.string().email().required(),
    cuil: Joi.string().min(10).max(12).required(),
    area: Joi.string().required(),
})

export const updateMuniSchema = Joi.object({
    firstname: Joi.string().min(3).max(30),
    lastname: Joi.string().min(3).max(30),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).max(30),
    email: Joi.string(),
    area: Joi.string().required(),
})