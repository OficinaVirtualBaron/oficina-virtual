import {Request, Response} from "express";
import {User} from "../entities/User";
import bcrypt from "bcrypt"
import { cuilSchema, emailSchema, lastnameSchema, nameSchema, passwordSchema } from "../validators/validator";

// POST - CREATE NEW USER
export const createUser = async(req: Request, res: Response) => {
    const {firstname, lastname, email, cuil, password} = req.body;
    const user = new User();
    try {
        const validateFirstName = await nameSchema.validateAsync({firstname});
        const validateLastName = await lastnameSchema.validateAsync({lastname});
        const validateEmail = await emailSchema.validateAsync({email});
        const validateCuil = await cuilSchema.validateAsync({cuil});
        const validatePassword = await passwordSchema.validateAsync({password});    

        if(validateFirstName){
            user.firstname = firstname;
        } else{
            res.json({message: "El nombre es obligatorio y debe tener mínimo 3 letras y máximo 30"});
        }

        if(validateLastName){
            user.lastname = lastname;
        } else{
            res.json({message: "El apellido es obligatorio y debe tener mínimo 3 letras y máximo 30"});
        }

        if(validateEmail){
            user.email = email;
        } else{
            res.json({message: "El email es obligatorio"})
        }

        if(validateCuil){
            user.cuil = cuil;
        } else{
            res.json({message: "El CUIL es obligatorio y debe tener un mínimo de 11 números y máximo de 12"});
        }

        if(validatePassword){
            user.password = password;
        } else{
            res.json({message: "La contraseña es obligatoria y debe tener mínimo 8 caracteres y máximo 20"});
        }

        //Hashear el password
            
        // Login con CIDI

        await user.save();
        return res.json(user);
    } catch (error) {
        if(error instanceof Error) {
            return res.status(500).json({message: "Datos ingresados no válidos. Por favor, revise e intente nuevamente"});
        }
    }
}

// POST - LOGIN (pendiente)
export const loginUser = async(req: Request, res: Response) => {

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