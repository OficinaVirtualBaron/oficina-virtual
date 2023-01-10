import { Request, Response } from "express";
import { Question_Option } from "../entities/Question_Option";

// POST
export const createQuestionOption = async (req: Request, res: Response) => {
    try {
        const { title, enabled, question_option_id } = req.body;
        const option = new Question_Option();
        option.title = title;
        option.enabled = enabled;
        option.question = question_option_id;
        const savedOption = await option.save();
        res.json(savedOption);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// GET
export const getQuestionOptions = async (req: Request, res: Response) => {
    try {
        const options = await Question_Option.find();
        if (options.length === 0) return res.status(404).send({message: "No se encontraron opciones cargadas"});
        return res.json(options);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// GET
export const getQuestionOption = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const option = await Question_Option.findOneByOrFail({id: parseInt(req.params.id)});
        return res.json(option);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// PUT 
export const updateQuestionOption = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const option = await Question_Option.findOneBy({id: parseInt(req.params.id)});
        if (!option) return res.status(404).send({message: "La opción no está disponible"});
        option.title = title;
        await option.save();
        return res.status(200).send({message: "Título de la opción actualizado correctamente"});
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// DELETE
export const deleteQuestionOption = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleteQuestionOption = await Question_Option.delete({id: parseInt(req.params.id)});
        if (deleteQuestionOption.affected === 0) {
            return res.status(404).send({message: "Opción no encontrada o incorrecta"});
        }
        return res.status(200).send({message: "Opción borrada de la DB correctamente"});
    } catch (error) {
        if (error instanceof Error) {
            return res.status(50).json({message: error.message});
        }
    }
}
