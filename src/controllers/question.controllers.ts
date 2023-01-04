import { Request, Response } from "express";
import { Question } from "../entities/Question";

// POST
export const createQuestion = async (req: Request, res: Response) => {
    try {
        const { title, question_idprocedure } = req.body;
        const question = new Question();
        question.title = title;
        question.question_options = question_idprocedure;
        const savedQuestion = await question.save();
        res.json(savedQuestion);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// GET 
export const getQuestions = async (req: Request, res: Response) => {
    try {
        const questions = await Question.find();
        return res.json(questions);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// GET 
export const getQuestion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const question = await Question.findOneByOrFail({id: parseInt(req.params.id)});
        return res.json(question);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// PUT 
export const updateQuestion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const question = await Question.findOneBy({id: parseInt(req.params.id)});
        if (!question) return res.status(404).send({message: "La pregunta no está disponible"});
        question.title = title;
        await question.save();
        return res.status(200).send({message: "Título de la pregunta actualizado correctamente"});
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// DELETE 
export const deleteQuestion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleteQuestion = await Question.delete({id: parseInt(id)});
        if (deleteQuestion.affected === 0) {
            return res.status(404).send({message: "Trámite no encontrado o incorrecto"});
        }
        return res.status(200).send({message: "Trámite borrado de la DB correctamente"});
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}