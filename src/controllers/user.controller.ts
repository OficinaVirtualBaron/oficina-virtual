import { Request, Response } from "express";
import { User } from "../entities/User";

export const createUser =  async (req: Request, res: Response) => {
    try {
        const {firstname, lastname, email, password, cuil} = req.body;
        const user = new User();
        user.firstname = firstname;
        user.lastname = lastname;
        user.password = password; //hashear password
        user.email = email;
        user.cuil = cuil;
    
        await user.save();
        return res.json(user);
    } catch (error) {
        if (error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

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

export const updateUser = async(req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const user = await User.findOneBy({id: parseInt(req.params.id)});
        if (!user) return res.status(404).json({message: "El usuario no existe"});

        await User.update({id: parseInt(id)}, req.body);
        return res.status(200).json("Datos actualizados correctamente");
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const result = await User.delete({id: parseInt(id)});
        if(result.affected === 0){
        return res.status(404).json({message: "Usuario no encontrado"});
        }

        return res.status(200);
    } catch (error) {
        if (error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}