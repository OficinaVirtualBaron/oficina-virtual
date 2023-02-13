"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestion = exports.updateQuestion = exports.getQuestion = exports.getQuestions = exports.createQuestion = void 0;
const Question_1 = require("../entities/Question");
const repository_1 = require("../helpers/controllers/repository");
// POST
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, procedure } = req.body;
        const question = new Question_1.Question();
        question.title = title;
        question.procedure = procedure;
        const savedQuestion = yield repository_1.questionRepository.save(question);
        res.json(savedQuestion);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createQuestion = createQuestion;
// GET 
const getQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questions = yield repository_1.questionRepository.find();
        if (questions.length === 0)
            return res.status(404).send({ message: "No se encontraron preguntas" });
        return res.json(questions);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getQuestions = getQuestions;
// GET 
const getQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const question = yield repository_1.questionRepository.findOneByOrFail({ id: parseInt(req.params.id) });
        return res.json(question);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getQuestion = getQuestion;
// PUT 
const updateQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const question = yield repository_1.questionRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!question)
            return res.status(404).send({ message: "La pregunta no está disponible" });
        question.title = title;
        yield repository_1.questionRepository.save(question);
        return res.status(200).send({ message: "Título de la pregunta actualizado correctamente" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateQuestion = updateQuestion;
// DELETE 
const deleteQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteQuestion = yield repository_1.questionRepository.delete({ id: parseInt(id) });
        if (deleteQuestion.affected === 0) {
            return res.status(404).send({ message: "Pregunta no encontrada o incorrecta" });
        }
        return res.status(200).send({ message: "Pregunta borrada de la DB correctamente" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteQuestion = deleteQuestion;
