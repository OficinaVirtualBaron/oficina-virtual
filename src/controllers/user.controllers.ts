import {Request, Response} from "express";
import {User} from "../entities/User";

// POST - CREATE NEW USER
export const createUser = async(req: Request, res: Response) => {
    try {
        const {firstname, lastname} = req.body;
        const user = new User();
        user.firstname = firstname;
        user.lastname = lastname;

        await user.save();
        return res.json(user);
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// GET USERS TABLE
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

// 