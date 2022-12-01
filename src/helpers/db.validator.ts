import { Request, Response } from "express";
import { FindOneOptions } from "typeorm";
import { User } from "../entities/User";

export const cuilExist = async(req: Request, res: Response, cuil: FindOneOptions<User>) => {
    const existeCuil = await User.findOne(cuil);
    if (existeCuil) {
        throw new Error (`El CUIL ${cuil} ya se encuentra registrado`);
    }
}

export const emailExist = async (req: Request, res: Response, email: FindOneOptions<User>) => {
    const existeEmail = await User.findOne(email);
    if (existeEmail) {
        throw new Error (`El email ${email} ya se encuentra registrado`);
    }
}