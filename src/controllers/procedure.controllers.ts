import { Request, Response } from "express";
import { Procedure } from "../entities/Procedure";
import { submitProcedureSchema } from "../validators/procedureSchema";
import { createCategorySchema } from "../validators/categorySchema";
import { ProcedureHistory } from "../entities/ProcedureHistory";
import { QuestionHistory } from "../entities/QuestionHistory";
import { QuestionOptionHistory } from "../entities/QuestionOptionsHistory";
import { Equal } from "typeorm";
import { UserMuni } from "../entities/Muni";
import { IPayload } from "../middlewares";
import jwt from "jsonwebtoken";
import { transporter } from "../config/mailer/mailer";
import { User } from "../entities/User";
import { sendConfirmationEmail } from "../helpers/email/sendConfirmationEmail";
import { statusProcedureChanged } from "../helpers/email/statusProcedureChanged";
import { userRepository } from "./user.controller";
import { muniRepository } from "./muni.controllers";
import { procedureHistoryRepository, procedureRepository, questionHistoryRepository, questionOptionHistoryRepository } from "../config/repository/repository";

// POST
export const createProcedure = async (req: Request, res: Response) => {
    try {
        const { title, category_id, description } = req.body;
        await createCategorySchema.validateAsync(req.body);
        try {
            const procedure = new Procedure();
            procedure.title = title;
            procedure.description = description;
            procedure.category = category_id;
            const savedProcedure = await procedureRepository.save(procedure);
            return res.status(200).send({ message: "Trámite creado", savedProcedure });
        } catch (error) {
            return res.send({ message: "Error. Alguno de los campos es incorrecto o está vacío" });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// POST
export const submitProcedure = async (req: Request, res: Response) => {
    const token = req.header("auth-header");
    try {
        const { categoryId, statusId } = req.body;
        if (!token) return res.status(401).send({message: "Error. No hay token en la petición"});
        const payload = jwt.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest") as IPayload;
        const user = await userRepository.findOneBy({id: parseInt(payload.id)});
        if (!user) return res.status(404).send({message: `Usuario ID #${payload.id} no encontrado`});

        try {
            await submitProcedureSchema.validateAsync(req.body);
            const procedure = new ProcedureHistory();
            let procedureCompleted: ProcedureHistory;
            procedure.user = user;
            procedure.category = categoryId;
            const users = await muniRepository.find();
            if (users.length === 0 || null) {
                res.status(404).send({message: "No hay personal municipal disponible para responder a este trámite"});
            }
            let filteredUsers = await muniRepository.find({ where: { category: { id: req.body.categoryId } }, relations: { procedureHistory: true }, select: { procedureHistory: { id: true }, id: true, firstname: true, lastname: true} });
            if (filteredUsers.length === 0) {
                res.status(404).send({message: "No hay personal municipal disponible para responder a este trámite"});
            }
            // en un futuro cambiar este .sort() por lo mismo pero referido a la columna "required" de los userMuni
            const filteredUsersArr = filteredUsers.sort((x: any, y: any) =>  x.procedureHistory.length - y.procedureHistory.length);
            procedure.status = statusId;
            procedure.userMuni = filteredUsersArr[0].id as unknown as UserMuni;
            procedureCompleted = await procedureHistoryRepository.save(procedure);
            req.body.questions.forEach(async (question: any) => {
                const newQuestion = new QuestionHistory();
                newQuestion.question = question.question;
                newQuestion.procedure = procedureCompleted;
                await questionHistoryRepository.save(newQuestion);
                question.options.forEach(async (option: any) => {
                    const newOption = new QuestionOptionHistory();
                    newOption.questionOption = option.questionOption;
                    newOption.answer = option.answer;
                    newOption.question = newQuestion;
                    await questionOptionHistoryRepository.save(newOption);
                });
            });
            //sendConfirmationEmail(procedure, user, transporter, userMuni);
            return res.status(201).send("Trámite enviado correctamente. ¡Gracias vecino!");
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).send({message: error.message})
            }
            return res.status(400).send({message: "Datos mal cargados. Intente nuevamente"});
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({message: error.message});
        }
        return res.status(401).send({message: "Error al validar el token o los datos de este"});
    }
}

// GET
export const getProceduresByStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const token = req.header("auth-header");
    if (!token) return res.status(401).send({ message: "Error. No hay token en la petición"});
    const payload = jwt.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest") as IPayload;
    const userMuniCategory = payload.category;
    try {
        const procedures = await procedureHistoryRepository.find({
            relations: {
                user: true,
                status: true,
                category: true,
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
                    adress: true,
                    email: true
                },
                category: {
                    title: true
                }
            },
            where: {
                status: {
                    id: parseInt(id)
                },
                category: {
                    id: parseInt(userMuniCategory)
                }
            }
        });
        if (procedures.length === 0) return res.status(404).send({ message: "No hay ningún trámite en este estado" });
        return res.status(200).send(procedures);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
}

// GET
export const getHistoryOfProcedures = async (req: Request, res: Response) => {
    const token = req.header("auth-header");
    try {
        if (!token) return res.status(401).send({ message: "Error. No hay token en la petición" });
        const payload = jwt.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest") as IPayload;
        const userMuniCategory = payload.category;
        const history = await procedureHistoryRepository.find({
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
                    adress: true,
                    email: true
                },
                category: {
                    title: true
                },
                status: {
                    status: true
                }
            },
            where: {
                category: {
                    id: parseInt(userMuniCategory)
                }
            }
        });
        if (history.length === 0) return res.status(404).send({ message: "No hay ningún trámite en el historial" });
        return res.status(200).send({ message: "Historial de trámites presentados: ", history });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
}

// GET
export const getOneProcedureFromHistory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const token = req.header("auth-header");
    try {
        if (!token) return res.status(401).send({ message: "Error. No hay token en la petición" });
        const payload = jwt.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest") as IPayload;
        const userMuniCategory = payload.category;
        const procedure = await procedureHistoryRepository.find({
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
                    adress: true,
                    email: true
                },
                category: {
                    title: true
                },
                status: {
                    status: true
                }
            },
            where: {
                id: parseInt(id),
                category: {
                    id: parseInt(userMuniCategory)
                }
            }
        });
        if (procedure.length === 0) {
            return res.status(401).send({ message: `El trámite ID #${id} no corresponde a su área o no existe` });
        }
        if (!procedure) return res.status(404).send({ message: `El ID #${id} al que hace referencia no corresponde a ningún trámite` });
        return res.status(200).send({ message: `Trámite ID #${id}: `, procedure });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
}

// GET
export const getTemplateProcedureById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const template = await procedureRepository.findOne({
            where: {
                id: parseInt(id)
            },
            relations: {
                category: true,
                question: {
                    question_options: true
                }
            },
            select: {
                question: true,
                category: {
                    title: true
                }
            }
        });
        if (!template) return res.status(404).send({ message: "404 - Procedure Not Found" });
        return res.status(200).send(template);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
}

// GET
export const getProcedures = async (req: Request, res: Response) => {
    try {
        const procedures = await procedureRepository.find();
        if (procedures.length === 0) return res.status(404).send({ message: "No se encontraron trámites" });
        return res.json(procedures);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
}

// GET
export const getProcedureByCategory = async (req: Request, res: Response) => {
    try {
        const { category_id } = req.params;
        const procedures = await procedureRepository.find({ where: { category: Equal(category_id) } });
        if (procedures.length === 0) return res.status(404).send({ message: "No hay trámites para esta categoría por el momento" });
        return res.json(procedures);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// GET
export const getProcedure = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const procedure = await procedureRepository.findOneByOrFail({ id: parseInt(req.params.id) });
        return res.status(200).json(procedure);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
}

// PUT
export const updateStatusOfProcedure = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const token = req.header("auth-header");
        try {
            if (!token) {
                return res.status(401).send({message: "Error. No hay token en la petición"});
            }
            const payload = jwt.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest") as IPayload;
            const userMuniCategory = payload.category;
            const procedure = await procedureHistoryRepository.findOne({ 
                relations: {
                    user: true,
                    userMuni: true
                },
                where: {
                    id: parseInt(id),
                    category: {
                        id: parseInt(userMuniCategory)
                    }
                }
            });
            if (!procedure) {
                return res.status(404).send({message: `El trámite ID #${id} no existe no corresponde a su área`});
            }
            procedure.status = status;
            await procedureHistoryRepository.save(procedure);
            statusProcedureChanged(procedure, transporter)
            return res.status(200).send({message: "Estado del trámite cambiado correctamente"});
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).send({message: error.message});
            }
            return res.status(400).send({message: "Hay un problema con el token"});
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({message: error.message});
        }
    }
}

// PUT 
export const updateProcedure = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const procedure = await procedureRepository.findOneBy({ id: parseInt(id) });
        if (!procedure) {
            return res.status(404).send({ message: "El trámite no existe" });
        }
        procedure.title = title;
        await procedureRepository.save(procedure);
        return res.status(200).send({ message: "Datos del trámite actualizados correctamente" });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
}

// DELETE
export const deleteProcedure = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleteProcedure = await procedureRepository.delete({ id: parseInt(req.params.id) });
        if (deleteProcedure.affected === 0) {
            return res.status(404).send({ message: "Trámite no encontrado o incorrecto. Intente nuevamente" })
        }
        return res.status(200).send({ message: "Trámite borrado de la DB correctamente" });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
}

export { procedureHistoryRepository };
