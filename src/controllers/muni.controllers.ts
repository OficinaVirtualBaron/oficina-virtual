import { Request, Response } from "express";
import { createMuniSchema, updateMuniSchema } from "../validators/muniSchema";
import bcrypt from "bcrypt";
import { UserMuni } from "../entities/Muni";
import { tokenSignMuni } from "../helpers/token/tokenSignMuni";
import { muniRepository } from "../config/repository/repository";
const saltround = 10;

// POST
export const createMuni = async (req: Request, res: Response) => {
    const salt = bcrypt.genSaltSync();
    try {
        const { firstname, lastname, email, password, cuil, category, required, inprocess, finalized } = req.body;
        const userMuni = new UserMuni();
        await createMuniSchema.validateAsync(req.body);
        userMuni.firstname = firstname;
        userMuni.lastname = lastname;
        userMuni.password = bcrypt.hashSync(password, salt);
        userMuni.email = email;
        userMuni.cuil = cuil;
        userMuni.category = category;
        userMuni.required = required;
        userMuni.inprocess = inprocess;
        userMuni.finalized = finalized;
        await muniRepository.save(userMuni);
        res.status(201).send({ message: `¡Usuario municipal ${firstname} ${lastname} creado exitosamente!` });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// GET 
export const getMunis = async (req: Request, res: Response) => {
    try {
        const munis = await muniRepository.find({
            relations: {
                category: true
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                cuil: true,
                email: true,
                category: {
                    title: true
                }
            }
        });
        if (munis.length === 0) {
            return res.status(404).send({ message: "No se encontraron usuarios municipales" });
        }
        return res.json(munis);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// GET
export const getMuni = async (req: Request, res: Response) => {
    try {
        const userMuni = await muniRepository.findOne({
            where: {
                id: parseInt(req.params.id)
            },
            relations:
            {
                category: true
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                cuil: true,
                email: true,
                category: {
                    id: true,
                    title: true
                },
                required: true,
                finalized: true,
                inprocess: true,

            }
        });
        return res.json(userMuni);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// PUT
export const updateMuni = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const userMuni = await muniRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!userMuni) return res.status(404).json({ message: "El usuario no existe" });
        await updateMuniSchema.validateAsync(req.body);
        userMuni.firstname = firstname;
        userMuni.lastname = lastname;
        userMuni.email = email;
        await muniRepository.save(userMuni);
        return res.status(200).json("Datos del usuario municipal actualizados correctamente");
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// DELETE
export const deleteMuni = async (req: Request, res: Response) => {
    try {
        const userMuni = await muniRepository.delete({ id: parseInt(req.params.id) });
        if (userMuni.affected === 0) {
            return res.status(404).json("Usuario municipal no encontrado o incorrecto. Intente nuevamente");
        }
        return res.status(200).json("Usuario municipal borrado de la DB correctamente")
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// POST
export const signInMuni = async (req: Request, res: Response) => {
    try {
        const { password, cuil } = req.body;
        const userMuni = await muniRepository.findOne({
            where: {
                cuil: cuil
            },
            relations: {
                category: true
            },
            select: {
                category: {
                    id: true,
                    title: true
                }
            }
        });
        if (!userMuni) {
            return res.status(400).json("El CUIL es incorrecto o no existe. Intente nuevamente");
        }
        const validatePassword = await bcrypt.compare(password, userMuni.password);
        if (!validatePassword) {
            return res.status(400).json("Contraseña incorrecta. Intente nuevamente");
        }
        const token = await tokenSignMuni(userMuni);
        return res.status(200).json({ userMuni, token });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export { muniRepository };
