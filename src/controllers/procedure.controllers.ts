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
import { User } from "../entities/User";

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
            const savedProcedure = await procedure.save();
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
var currentNum = -1;
export const submitProcedure = async (req: Request, res: Response) => {
    const token = req.header("auth-header");
    try {
        if (!token) {
            return res.status(401).send({message: "Error. No hay token en la petición"});
        }
        const payload = jwt.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest") as IPayload;
        const user = await User.findOneBy({id: parseInt(payload.id)});
        if (!user) {
            return res.status(404).send({message: `Usuario ID #${payload.id} no encontrado`});
        }
        try {
            const { categoryId, statusId } = req.body;
            await submitProcedureSchema.validateAsync(req.body);
            const procedure = new ProcedureHistory();
            let procedureCompleted: ProcedureHistory;
            for (let i = 0; i < 1; i++) {
                currentNum = (currentNum + 1) % 4;
            }
            procedure.user = user;
            procedure.category = categoryId;
            procedure.status = statusId;
            procedure.userMuni = currentNum as unknown as UserMuni;
            procedureCompleted = await procedure.save();
            req.body.questions.forEach(async (question: any) => {
                const newQuestion = new QuestionHistory();
                newQuestion.question = question.question;
                newQuestion.procedure = procedureCompleted;
                await newQuestion.save();
                question.options.forEach(async (option: any) => {
                    const newOption = new QuestionOptionHistory();
                    newOption.questionOption = option.questionOption;
                    newOption.answer = option.answer;
                    newOption.question = newQuestion;
                    await newOption.save();
                });
            });
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
    try {
        const procedures = await ProcedureHistory.find({
            relations: {
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
                }
            }
        });
        if (procedures.length === 0) {
            return res.status(404).send({ message: "No hay ningún trámite en este estado" });
        }
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
        if (!token) {
            return res.status(401).send({ message: "Error. No hay token en la petición" });
        }
        const payload = jwt.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest") as IPayload;
        const userMuniCategory = payload.category;
        const history = await ProcedureHistory.find({
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
        if (history.length === 0) {
            return res.status(404).send({ message: "No hay ningún trámite en el historial" });
        }
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
        if (!token) {
            return res.status(401).send({ message: "Error. No hay token en la petición" });
        }
        const payload = jwt.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest") as IPayload;
        const userMuniCategory = payload.category;
        const procedure = await ProcedureHistory.find({
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
            return res.status(401).send({ message: `El trámite ID #${id} no corresponde a su área. No tiene autorización para verlo` });
        }
        if (!procedure) {
            return res.status(404).send({ message: `El ID #${id} al que hace referencia no corresponde a ningún trámite` });
        }
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
        const template = await Procedure.findOne({
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
        if (!template) {
            return res.status(404).send({ message: "404 - Procedure Not Found" });
        }
        return res.status(200).send(template);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
}

// POST
export const findProcedureByName = async (req: Request, res: Response) => {
    try {
        const { title } = req.params;
        const procedures = await Procedure.find({where: {title: title}});
        if (procedures.length === 0) {
            return res.status(404).send({message: `Lo sentimos. No se encontró ningún trámite con el nombre '${title}'`});
        }
        return res.status(200).send(procedures);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({message: error.message});
        }
    }
}

// GET
export const getProcedures = async (req: Request, res: Response) => {
    try {
        const procedures = await Procedure.find();
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
        const procedures = await Procedure.find({ where: { category: Equal(category_id) } });
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
        const procedure = await Procedure.findOneByOrFail({ id: parseInt(req.params.id) });
        return res.status(200).json(procedure);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
}

// PUT 
export const updateProcedure = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const procedure = await Procedure.findOneBy({ id: parseInt(req.params.id) });
        if (!procedure) return res.status(404).send({ message: "El trámite no existe" });
        procedure.title = title;
        await procedure.save();
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
        const deleteProcedure = await Procedure.delete({ id: parseInt(req.params.id) });
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