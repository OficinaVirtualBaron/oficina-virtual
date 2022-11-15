import * as Joi from "joi"

export const nameSchema = Joi.object({
    firstname: Joi.string()
        .required(),
})

export const lastnameSchema = Joi.object({
    lastname: Joi.string()
        .required(),
})

export const passwordSchema = Joi.object({
    password: Joi.string()
        .required(),
})

export const emailSchema = Joi.object({
    email: Joi.string()
        .required(),
})

export const cuilSchema = Joi.object({
    cuil: Joi.number()
        .required(),
})