import {Request, Response} from "express";
import {User} from "../entities/User";
import bcrypt from "bcrypt"

// POST - CREATE NEW USER
export const createUser = async(req: Request, res: Response) => {
    try {
        const {firstname, lastname, email, cuil, password} = req.body;
        const user = new User();
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.cuil = cuil;
        user.password = password;

        // Implementar joi para validaciones y bcrypt para hashear el password
            
        // Login con CIDI

        await user.save();
        return res.json(user);
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({message: "Credenciales no válidas. Por favor, intente nuevamente"});
        }
    }
}

// GET - GET USERS TABLE
export const getUsers = async(req: Request, res: Response) => {
    try {
        const users = await User.find()
        return res.json(users)
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message})
        }
    }
}

// PUT - UPDATE USER
export const updateUser = async(req: Request, res: Response) => {
    try {
        const {firstname, lastname} = req.body;
        const {id} = req.params;
        const user = await User.findOneBy({id: parseInt(req.params.id)});

        if (!user) return res.status(404).json({message: "User does not exists"});

        await User.update({id: parseInt(id)}, req.body);
        return res.sendStatus(204);
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

// DELETE - DELETE ONE USER
export const deleteUser = async(req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const resultDelete = User.delete({id: parseInt(id)});

        if((await resultDelete).affected == 0){
        return res.status(404).json({message: "No se encontró el ID. Por favor, intente nuevamente"});
        }
        return res.sendStatus(204);
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

// GET - GET USER BY ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const user = await User.findOneBy({id: parseInt(id)});
        res.json(user);
    } catch (error) {
        return res.status(500).json({message: error});
    }
}