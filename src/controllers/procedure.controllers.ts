import { Request, Response } from "express";
import { Procedure } from "../entities/Procedure";
import { Question } from "../entities/Question";
import { Option } from "../entities/Option";
import { createCategorySchema } from "../validators/validators";
import { ProcedureHistory } from "../entities/ProcedureHistory";
import { QuestionHistory } from "../entities/QuestionHistory";
import { QuestionOptionHistory } from "../entities/QuestionOptionsHistory";

// POST
export const createProcedure = async (req: Request, res: Response) => {
    try {
        const { title, category_id, description } = req.body;
        await createCategorySchema.validateAsync(req.body);
        try {
            const procedure = new Procedure();
            procedure.title = title;
            procedure.description = description;
            procedure.category_id = category_id;
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

// GET
export const getProcedures = async (req: Request, res: Response) => {
    try {
        const procedures = await Procedure.find();
        if (procedures.length === 0) return res.status(404).send({ message: "No se encontraron trámites" });
        return res.json(procedures);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// GET
export const getProcedureByCategory = async (req: Request, res: Response) => {
    const { category_id } = req.params;
    try {
        const procedures = await Procedure.findBy({ category_id: parseInt(req.params.category_id) });
        if (procedures.length === 0) return res.send({ message: "No hay trámites para esta categoría por el momento" });
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
        return res.json(procedure);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
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
            return res.status(500).json({ message: error.message });
        }
    }
}

// DELETE
export const deleteProcedure = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleteProcedure = await Procedure.delete({id: parseInt(req.params.id)});
        if (deleteProcedure.affected === 0) {
            return res.status(404).send({ message: "Trámite no encontrado o incorrecto. Intente nuevamente" })
        }
        return res.status(200).send({ message: "Trámite borrado de la DB correctamente" });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// POST
export const submitProcedure = async (req: Request, res: Response) => {
    try {
        // Create new procedure
        const procedure = new ProcedureHistory();
        procedure.user = req.body.user_id;
        procedure.title = req.body.procedureTitle;
        procedure.description = req.body.procedureDescription;
        procedure.categories = req.body.categoryId;
        procedure.status = req.body.status_id;
        console.log("procedureStatus: " + procedure.status);
        console.log("req.body.status: " + req.body.status_id);
        await procedure.save();
        //console.log("categoryId: " + procedure.categories);

        // Create questions
        req.body.questions.forEach(async (question: any) => {
            const newQuestion = new QuestionHistory();
            newQuestion.title = question.title;
            newQuestion.procedure = procedure;
            await newQuestion.save();
            //console.log("newQuestion " + newQuestion);

            // Create options
            question.options.forEach(async (option: any) => {
                const newOption = new QuestionOptionHistory();
                newOption.title = option.title;
                newOption.enabled = option.enabled;
                newOption.question = newQuestion;
                await newOption.save();
                //console.log("newOption " + newOption.question);
            });
        });
        return res.status(201).send(`Trámite para "${procedure.title}" enviado correctamente. ¡Gracias vecino!`);
    } catch (error) {
        if (error instanceof Error) {
            return res.json({message: error.message});
        }
    }
}