import * as Joi from "joi"

export const nameSchema = Joi.object({
    firstname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
})

export const lastnameSchema = Joi.object({
    lastname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
})

export const passwordSchema = Joi.object({
    password: Joi.string()
        .alphanum()
        .min(8)
        .max(320)
        .required(),
})

export const emailSchema = Joi.object({
    email: Joi.string()
        .required(),
})

export const cuilSchema = Joi.object({
    cuil: Joi.number()
        .integer()
        .required(),
})