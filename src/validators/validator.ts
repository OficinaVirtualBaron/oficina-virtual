import Joi from "joi"

export const nameSchema = Joi.object({
    firstname: Joi.string()
        .min(2)
        .max(30)
        .required()
})

export const lastnameSchema = Joi.object({
    lastname: Joi.string()
        .required()
})

export const passwordSchema = Joi.object({
    password: Joi.string()
        .min(8)
        .max(20)
        .required()
})

export const emailSchema = Joi.object({
    email: Joi.string()
        .required()
})

export const cuilSchema = Joi.object({
    cuil: Joi.number()
})