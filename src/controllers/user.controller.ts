import { Request, Response } from "express";
import { User } from "../entities/User";
import { IUser } from "../entities/User";
import { createUserSchema, updateUserSchema } from "../validators/validators";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { doesNotMatch } from "assert";
const saltround = 10;

// POST create user
export const createUser =  async (req: Request, res: Response) => {
    const salt = bcrypt.genSaltSync(); //Declara los saltos del hash
    try {
        //crete user
        const {firstname, lastname, email, password, cuil} = req.body;
        const user = new User();
        const result = await createUserSchema.validateAsync(req.body);  // Valida los datos requeridos para crear el usuario
        user.firstname = firstname;
        user.lastname = lastname;
        user.password = bcrypt.hashSync(password, salt); //Hashea el password;
        user.email = email;
        user.cuil = cuil;
        //console.log(result);

        const savedUser = await user.save();
        //token
        const token: string = jwt.sign({id: savedUser.id}, process.env.SECRET_TOKEN_KEY || "tokentest");
        res.header("auth-header", token).json(savedUser);
    } catch (error) {
        if (error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

// GET todos los users
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

// GET user por ID
export const getUser = async(req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const user = await User.findBy({id: parseInt(req.params.id)})
        return res.json(user);
    } catch (error) {
        if (error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

// PUT actualizar user
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

// DELETE borrar user por ID
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const result = await User.delete({id: parseInt(id)});
        if(result.affected === 0){
            return res.status(404).json({message: "Usuario no encontrado"});
        }
        return res.status(200).json("Usuario borrado de la DB correctamente");
    } catch (error) {
        if (error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

// POST login en la página
export const signIn = async (req: Request, res: Response) => {
    const {cuil, password} = req.body;
    const salt = bcrypt.genSaltSync();
    const user = await User.findOne({where: {cuil: req.body.cuil}})
    if (!user) return res.status(400).json("El usuario no existe");

    const validatePassword = await bcrypt.compare(password, req.body.password);
    if (!validatePassword) return res.status(400).json("Contraseña incorrecta. Intente nuevamente")
    res.send("login");
}

export const profile = (req: Request, res: Response) => {
    res.send("Profile");
}