import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Question } from "../entities/Question";
import { questionRepository } from "../helpers/controllers/repository";

// POST
export const createQuestion = async (req: Request, res: Response) => {
    try {
        const { title, procedure } = req.body;
        const question = new Question();
        question.title = title;
        question.procedure = procedure;
        const savedQuestion = await questionRepository.save(question);
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
        const questions = await questionRepository.find();
        if (questions.length === 0) return res.status(404).send({message: "No se encontraron preguntas"});
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
        const question = await questionRepository.findOneByOrFail({id: parseInt(req.params.id)});
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
        const question = await questionRepository.findOneBy({id: parseInt(req.params.id)});
        if (!question) return res.status(404).send({message: "La pregunta no está disponible"});
        question.title = title;
        await questionRepository.save(question);
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
        const deleteQuestion = await questionRepository.delete({id: parseInt(id)});
        if (deleteQuestion.affected === 0) {
            return res.status(404).send({message: "Pregunta no encontrada o incorrecta"});
        }
        return res.status(200).send({message: "Pregunta borrada de la DB correctamente"});
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}