import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User";
import { IUser } from "../entities/User";
import { createUserSchema, updateUserSchema } from "../validators/validators";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
const saltround = 10;

// POST 
export const createUser = async (req: Request, res: Response) => {
    const salt = bcrypt.genSaltSync();
    try {
        const {firstname, lastname, email, password, cuil} = req.body;
        const user = new User();
        const result = await createUserSchema.validateAsync(req.body);
        user.firstname = firstname;
        user.lastname = lastname;
        user.password = bcrypt.hashSync(password, salt);
        user.email = email;
        user.cuil = cuil;
        //console.log(result);
        const savedUser = await user.save();
        const token: string = jwt.sign({id: savedUser.id}, process.env.SECRET_TOKEN_KEY || "tokentest");
        res.header("auth-header", token).json(savedUser);
    } catch (error) {
        if (error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

// GET 
export const getUsers = async(req: Request, res: Response) => {
    try {
        const users = await User.find()
        return res.json(users);
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

// GET 
export const getUser = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findBy({id: parseInt(req.params.id)})
        return res.json(user);
    } catch (error) {
        if (error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

// PUT 
export const updateUser = async(req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {firstname, lastname, email, password} = req.body;
        const user = await User.findOneBy({id: parseInt(req.params.id)});
        if (!user) return res.status(404).json({message: "El usuario no existe"});
        const result = await updateUserSchema.validateAsync(req.body);
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        //console.log(result);
        await user.save();
        return res.status(200).json("Datos del usuario actualizados correctamente");
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

// DELETE 
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const result = await User.delete({id: parseInt(id)});
        if(result.affected === 0){
            return res.status(404).json("Usuario no encontrado o incorrecto. Intente nuevamente");
        }
        return res.status(200).json("Usuario borrado de la DB correctamente");
    } catch (error) {
        if (error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

// POST
export const signIn = async (req: Request, res: Response) => {
    try {
        const {cuil, password, role} = req.body;
        const salt = bcrypt.genSaltSync();
        const user = await User.findOne({where: {cuil: req.body.cuil}})
        if (!user) {
            return res.status(400).json("El usuario es incorrecto. Intente nuevamente");
        }
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            return res.status(400).json("Contraseña incorrecta. Intente nuevamente")
        }
        const token = jwt.sign({id: user.id}, process.env.SECRET_TOKEN_KEY || "tokentest", {
            expiresIn: "2h"
        })
        res.header("auth-header", token).json(`¡Sesión iniciada! Bienvenido ${user.firstname} ${user.lastname}`);
    } catch (error) {
        if (error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
}