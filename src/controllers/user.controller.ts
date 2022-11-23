import { Request, Response } from "express";
import { User } from "../entities/User";

export const createUser =  async (req: Request, res: Response) => {
    try {
        const {firstname, lastname, email, password, cuil} = req.body;
        const user = new User();
        user.firstname = firstname;
        user.lastname = lastname;
        user.password = password;
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
    return res.json([]);
}

export const getUser = () => {

}


export const updateUser = () => {

}

export const deleteUser = () => {
  
}