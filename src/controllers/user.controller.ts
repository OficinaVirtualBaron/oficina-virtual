import { Request, Response } from "express";
import { User } from "../entities/User";
import { createUserSchema, updateUserSchema } from "../validators/validators";
import bcrypt from "bcrypt";
const saltround = 10;

// POST create user
export const createUser =  async (req: Request, res: Response) => {
    const salt = bcrypt.genSaltSync(); //Declara los saltos del hash
    try {
        const user = new User();
        const {firstname, lastname, email, password, cuil} = req.body;
        const result = await createUserSchema.validateAsync(req.body);  // Valida los datos para crear el usuario
        user.firstname = firstname;
        user.lastname = lastname;
        user.password = bcrypt.hashSync(password, salt); //Hashea el password;
        user.email = email;
        user.cuil = cuil
        await user.save();
        console.log(result);
        return res.json(user);
    } catch (error) {
        if (error instanceof Error){
            return res.status(500).json({message: "Datos ingresados incorrectos. Por favor intente nuevamente"});
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
        const {firstname, lastname, email, password, cuil} = req.body;
        const salt = bcrypt.genSaltSync();
        const user = await User.findOneBy({id: parseInt(req.params.id)});
        if (!user) return res.status(404).json({message: "El usuario no existe"});
        user.firstname = firstname;
        user.lastname = lastname;
        user.password = bcrypt.hashSync(password, salt); //Hashea el password
        user.email = email;
        user.cuil = cuil;
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