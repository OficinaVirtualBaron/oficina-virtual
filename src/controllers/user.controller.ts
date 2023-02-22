import { Request, Response } from "express";
import { User } from "../entities/User";
import { createUserSchema, updateUserSchema } from "../validators/userSchema";
import bcrypt, { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { tokenSignUser } from "../helpers/token/tokenSignUser";
import { IPayload } from "../middlewares";
import { forgotPasswordEmail } from "../helpers/email/forgotPasswordEmail";
import { transporter } from "../config/mailer/mailer";
import { procedureHistoryRepository } from "./procedure.controllers";
import { userRepository } from "../config/repository/repository";
import { signUpUserConfirmationEmail } from "../helpers/email/signUpEmail";
import { tokenSignForgotPassword } from "../helpers/token/tokenSignForgotPassword";
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
        user.password = bcrypt.hashSync(password, saltround);
        user.email = email;
        user.cuil = cuil;
        user.adress = adress;
        await userRepository.save(user);
        res.status(201).send({ message: "Usuario creado correctamente. Inicie sesión a continuación" });
        signUpUserConfirmationEmail(user, transporter);
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

// GET en un futuro hacer paginación
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
export const getProfile = async (req: Request, res: Response) => {
    try {
        const token = req.header("auth-header");
        if (!token) return res.status(401).send({ message: "Error. No hay token en la petición" });
        const payload = jwt.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest") as IPayload;
        const userId = payload.id;
        try {
            const user = await userRepository.findOne({
                where: {
                    id: parseInt(userId)
                },
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    cuil: true,
                    adress: true,
                    created_at: true
                }
            });
            return res.status(200).json({ "Perfil vecinal ": user });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).send({ message: error.message });
            } else {
                return res.status(500).send({ message: "Error. Ocurrió un error en la petición" });
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        } else {
            return res.status(401).send({ message: "Error. Ocurrió algún problema con el token" });
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
        const token = req.header("auth-header");
        if (!token) return res.status(401).send({ message: "Error. No hay token en la petición" });
        const payload = jwt.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest") as IPayload;
        const userId = payload.id;
        try {
            const { firstname, lastname, email, password } = req.body;
            const user = await userRepository.findOne({ where: { id: parseInt(userId) } });
            if (!user) return res.status(404).send({ message: "El usuario no existe" });
            await updateUserSchema.validateAsync(req.body);
            user.firstname = firstname;
            user.lastname = lastname;
            user.email = email;
            user.password = bcrypt.hashSync(password, saltround);
            await userRepository.save(user);
            return res.status(200).send({ message: "Datos del usuario actualizados correctamente" });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        } else {
            return res.status(500).send({ message: "Error. Ocurrió algún problema con el token" });
        }
    }
}

// DELETE -- no habilitada por ahora --
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
    if (!email) return res.status(400).send({ message: "El email es requerido. Por favor, ingréselo." });
    const message = "Un email se envió a su casilla de correos para restablecer su contraseña";
    try {
        const user = await userRepository.findOneBy({ email: email });
        if (!user) return res.status(404).send({ message: "El correo electrónico es incorrecto. Por favor, intente nuevamente" });
        const token = await tokenSignForgotPassword(user);
        const verificationLink = `http://localhost:3000/auth/reset-password/${token}`;
        user.resetToken = token;
        await userRepository.save(user);
        forgotPasswordEmail(user, transporter, verificationLink);
        return res.status(200).json({ message: message });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: message });
        }
    }
    return res.status(200).send({ message });
}

export const resetPassword = async (req: Request, res: Response) => {
    const { newPassword } = req.body;
    const resetToken = req.header("reset-token");
    if (!resetToken) return res.status(400).send({ message: "Error. No hay token en la petición" });
    try {
        if (!(resetToken && newPassword)) {
            res.status(400).send({ message: "Todos los campos son requeridos." });
        }
        const payload = jwt.verify(resetToken, process.env.RESET_PASSWORD_KEY || "token_reset_password") as IPayload;
        const userId = payload.id;
        const user = await userRepository.findOneBy({ id: parseInt(userId) });
        if (!user) return res.status(404).send({ message: "El usuario no fue encontrado" });
        try {
            user.password = hashSync(newPassword, saltround);
            await userRepository.save(user);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).send({ message: error.message });
            } else {
                return res.status(400).send({ message: "Error. Algo fue mal" });
            }
        }
        return res.status(200).send({ message: "La contraseña fue cambiada correctamente" });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message })
        } else {
            return res.status(401).send({ message: "Algo fue mal" });
        }
    }
}

export { userRepository };
