import { Request, Response } from "express";
import { QuestionOption } from "../entities/QuestionOption";

// POST
export const createQuestionOption = async (req: Request, res: Response) => {
    try {
        const { title, question_option_id } = req.body;
        const option = new QuestionOption();
        option.title = title;
        option.question = question_option_id;
        const savedOption = await option.save();
        res.json(savedOption);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// GET
export const getQuestionOptions = async (req: Request, res: Response) => {
    try {
        const options = await QuestionOption.find();
        if (options.length === 0) return res.status(404).send({ message: "No se encontraron opciones cargadas" });
        return res.json(options);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// GET
export const getQuestionOption = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const option = await QuestionOption.findOneByOrFail({ id: parseInt(req.params.id) });
        return res.json(option);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// PUT 
export const updateQuestionOption = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const option = await QuestionOption.findOneBy({ id: parseInt(req.params.id) });
        if (!option) return res.status(404).send({ message: "La opción no está disponible" });
        await option.save();
        return res.status(200).send({ message: "Título de la opción actualizado correctamente" });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// DELETE
export const deleteQuestionOption = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleteQuestionOption = await QuestionOption.delete({ id: parseInt(req.params.id) });
        if (deleteQuestionOption.affected === 0) {
            return res.status(404).send({ message: "Opción no encontrada o incorrecta" });
        }
        return res.status(200).send({ message: "Opción borrada de la DB correctamente" });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(50).json({ message: error.message });
        }
    }
}
