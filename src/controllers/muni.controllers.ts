import { Request, Response } from "express";
import { createMuniSchema, updateMuniSchema } from "../validators/validators";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserMuni } from "../entities/Muni";
import { tokenSign } from "../helpers/generateToken";
const saltround = 10;

// POST
export const createMuni = async (req: Request, res: Response) => {
    const salt = bcrypt.genSaltSync();
    try {
        const { firstname, lastname, email, password, cuil, area } = req.body;
        const user = new UserMuni();
        const result = await createMuniSchema.validateAsync(req.body);
        user.firstname = firstname;
        user.lastname = lastname;
        user.password = bcrypt.hashSync(password, salt);
        user.email = email;
        user.cuil = cuil;
        user.area = area;
        //console.log(result);
        const savedMuni = await user.save();
        const tokenSession = await tokenSign(savedMuni);
        res.header("auth-header", tokenSession).json(savedMuni);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// GET 
export const getMunis = async (req: Request, res: Response) => {
    try {
        const munis = await UserMuni.find();
        return res.json(munis);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

export const getMuni = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await UserMuni.findBy({id: parseInt(req.params.id)});
        return res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

export const updateMuni = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, email, password } = req.body;
        const user = await UserMuni.findOneBy({id: parseInt(req.params.id)});
        if (!user) return res.status(404).json({message: "El usuario no existe"});
        const result = await updateMuniSchema.validateAsync(req.body);
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        //console.log(result);
        await user.save();
        return res.status(200).json("Datos del usuario actualizados correctamente");
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

export const deleteMuni = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await UserMuni.delete({id: parseInt(id)});
        if (result.affected === 0){
            return res.status(404).json("Usuario municipal no encontrado o incorrecto. Intente nuevamente");
        }
        return res.status(200).json("Usuario borrado de la DB correctamente")
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

export const signInMuni = async (req: Request, res: Response) => {
    try {
        const { cuil, password, role } = req.body;
        const salt = bcrypt.genSaltSync();
        const user = await UserMuni.findOne({where: {cuil: req.body.cuil}});
        if (!user) {
            return res.status(400).json("El usuario municipal es incorrecto o no existe. Intente nuevamente");
        }
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            return res.status(400).json("Contraseña incorrecta. Intente nuevamente");
        }
        const token = jwt.sign({id: user.id, role: user.role}, process.env.SECRET_TOKEN_KEY || "tokentest", {
            expiresIn: "24h"
        })
        res.header("auth-header", token).json(`¡Sesión iniciada! Bienvenido municipal ${user.firstname} ${user.lastname}`)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}