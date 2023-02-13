import { Request, Response } from "express";
import { User } from "../entities/User";
import { createUserSchema, updateUserSchema } from "../validators/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { tokenSignUser } from "../helpers/token/tokenSignUser";
import { ProcedureHistory } from "../entities/ProcedureHistory";
import { IPayload } from "../middlewares";
import { forgotPasswordEmail } from "../helpers/email/forgotPasswordEmail";
import { transporter } from "../config/mailer";
import { procedureHistoryRepository } from "./procedure.controllers";
import { userRepository } from "../helpers/controllers/repository";
const saltround = 10;

// POST 
export const createUser = async (req: Request, res: Response) => {
    const salt = bcrypt.genSaltSync();
    try {
        const { firstname, lastname, email, password, cuil, adress } = req.body;
        const user = new User();
        await createUserSchema.validateAsync(req.body);
        user.firstname = firstname;
        user.lastname = lastname;
        user.password = bcrypt.hashSync(password, salt);
        user.email = email;
        user.cuil = cuil;
        user.adress = adress;
        await userRepository.save(user);
        res.status(201).send({ message: "Usuario creado correctamente. Inicie sesión a continuación" });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// GET en un futuro hacer paginacion
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userRepository.find({
            select: {
                id: true,
                firstname: true,
                lastname: true,
                adress: true,
                cuil: true,
                email: true
            },
            // take: 10,
            // skip: 0
        });
        if (users.length === 0) return res.status(404).send({ message: "No se encontraron usuarios" });
        return res.json(users);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// GET en un futuro hacer paginacion
export const getMyProcedures = async (req: Request, res: Response) => {
    const token = req.header("auth-header");
    try {
        if (!token) {
            return res.status(401).send({ message: "Error. No hay token en la petición" });
        }
        const payload = jwt.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest") as IPayload;
        const userId = parseInt(payload.id);
        const procedures = await procedureHistoryRepository.find({
            relations: {
                category: true,
                status: true,
                questions: {
                    question: true,
                    question_option_history: true
                }
            },
            select: {
                category: {
                    title: true
                },
                status: {
                    status: true
                }
            },
            where: {
                user: {
                    id: userId
                }
            }
        });
        if (procedures.length === 0) {
            return res.status(404).send({ message: "No hay ningún trámite presentado aún" });
        }
        return res.status(200).send(procedures);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
}

// GET (en un futuro hacer paginación)
export const getProceduresOfUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const procedures = await procedureHistoryRepository.find({
            relations: {
                user: true,
                category: true,
                status: true,
                questions: {
                    question: true,
                    question_option_history: true
                }
            },
            select: {
                user: {
                    firstname: true,
                    lastname: true,
                    cuil: true,
                    email: true,
                    adress: true
                },
                category: {
                    title: true
                },
                status: {
                    status: true
                }
            },
            where: {
                user: {
                    id: parseInt(id)
                }
            }
        });
        if (procedures.length === 0) {
            return res.status(404).send({ message: "El vecino aún no realizó ningún trámite" });
        }
        return res.status(200).send({ message: `Trámites del vecino ID #${id}`, procedures });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
}

// GET 
export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await userRepository.findOne({
            where: {
                id: parseInt(req.params.id)
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                adress: true,
                cuil: true,
                email: true
            }
        });
        if (!user) {
            return res.status(404).send({ message: `El vecino ID #${req.params.id} no existe` });
        }
        return res.status(200).send(user);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// PUT 
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!user) return res.status(404).send({ message: "El usuario no existe" });
        await updateUserSchema.validateAsync(req.body);
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.password = password;
        await userRepository.save(user);
        return res.status(200).send({ message: "Datos del usuario actualizados correctamente" });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// DELETE 
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await userRepository.delete({ id: parseInt(req.params.id) });
        if (result.affected === 0) {
            return res.status(404).json({ message: "Usuario no encontrado o incorrecto. Intente nuevamente" });
        }
        return res.status(200).send({ message: "Usuario borrado de la DB correctamente" });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// POST
export const signIn = async (req: Request, res: Response) => {
    try {
        const { password } = req.body;
        const salt = bcrypt.genSaltSync();
        const user = await userRepository.findOne({ where: { cuil: req.body.cuil } })
        if (!user) {
            return res.status(404).json("El usuario es incorrecto. Intente nuevamente");
        }
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            return res.status(400).json("Contraseña incorrecta. Intente nuevamente")
        }
        const token = await tokenSignUser(user);
        return res.status(200).json({ user, token });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// POST
export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await userRepository.findOneBy({email: email});
    if (!user) {
        return res.status(404).send({message: "No existe ningún usuario con ese correo electrónico. Intente nuevamente"});
    }
    await forgotPasswordEmail(user, transporter);
    return res.status(200).send({message: "Se envió un link de recuperación a su correo electrónico. Ingrese a su casilla para cambiar su contraseña"});
}

export { userRepository };
