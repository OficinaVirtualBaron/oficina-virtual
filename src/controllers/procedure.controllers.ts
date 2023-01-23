import { Request, Response } from "express";
import { Procedure } from "../entities/Procedure";
import { createCategorySchema, submitProcedureSchema } from "../validators/validators";
import { ProcedureHistory } from "../entities/ProcedureHistory";
import { QuestionHistory } from "../entities/QuestionHistory";
import { QuestionOptionHistory } from "../entities/QuestionOptionsHistory";
import { Equal } from "typeorm";

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
export const submitProcedure = async (req: Request, res: Response) => {
    try {
        const { userId, categoryId, statusId } = req.body;
        try {
            const procedure = new ProcedureHistory();
            procedure.user = userId;
            procedure.category = categoryId;
            procedure.status = statusId;
            await procedure.save();

            req.body.questions.forEach(async (question: any) => {
                const newQuestion = new QuestionHistory();
                newQuestion.question = question.question;
                newQuestion.procedure = procedure;
                await newQuestion.save();

                question.options.forEach(async (option: any) => {
                    const newOption = new QuestionOptionHistory();
                    newOption.questionOption = option.questionOption;
                    newOption.answer = option.answer;
                    newOption.question = newQuestion;
                    console.log(newOption.answer);
                    await newOption.save();
                });
            });
            return res.status(201).send(`Trámite enviado correctamente. ¡Gracias vecino!`);
        } catch (error) {
            if (error instanceof Error) {
                return res.json({ message: error.message });
            }
        }
    } catch (error) {
        return res.status(400).send({ message: "Datos mal cargados. Intente nuevamente" });
    }
}

//GET 
export const getHistoryOfProcedures = async (req: Request, res: Response) => {
    try {
        const history = await ProcedureHistory.find({
            relations: {
                user: true,
                category: true,
                status: true,
                questions: {
                    question: true,
                    question_option_history: true
                }
            }
        });
        if (history.length === 0) {
            return res.status(404).send({ message: "No hay ningún trámite en el historial" });
        }
        return res.status(201).send({ message: "Historial de trámites presentados: ", history });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
}

// GET
export const getOneProcedureFromHistory = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const procedure = await ProcedureHistory.findOne({
            where: {
                id: parseInt(req.params.id)
            },
            relations: {
                user: true,
                category: true,
                status: true,
                questions: {
                    question: true,
                    question_option_history: true
                }
            }
        });
        if (procedure === null) {
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

// GET arreglar
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