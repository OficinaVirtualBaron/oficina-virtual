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
exports.deleteQuestionOption = exports.updateQuestionOption = exports.getQuestionOption = exports.getQuestionOptions = exports.createQuestionOption = void 0;
const Question_Option_1 = require("../entities/Question_Option");
// POST
const createQuestionOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const option = new Question_Option_1.Question_Option();
        option.title = title;
        const savedOption = yield option.save();
        res.json(savedOption);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createQuestionOption = createQuestionOption;
// GET
const getQuestionOptions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = yield Question_Option_1.Question_Option.find();
        if (options.length === 0)
            return res.status(404).send({ message: "No se encontraron opciones cargadas" });
        return res.json(options);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getQuestionOptions = getQuestionOptions;
// GET
const getQuestionOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const option = yield Question_Option_1.Question_Option.findOneByOrFail({ id: parseInt(req.params.id) });
        return res.json(option);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getQuestionOption = getQuestionOption;
// PUT 
const updateQuestionOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const option = yield Question_Option_1.Question_Option.findOneBy({ id: parseInt(req.params.id) });
        if (!option)
            return res.status(404).send({ message: "La opción no está disponible" });
        option.title = title;
        yield option.save();
        return res.status(200).send({ message: "Título de la opción actualizado correctamente" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateQuestionOption = updateQuestionOption;
// DELETE
const deleteQuestionOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteQuestionOption = yield Question_Option_1.Question_Option.delete({ id: parseInt(req.params.id) });
        if (deleteQuestionOption.affected === 0) {
            return res.status(404).send({ message: "Opción no encontrada o incorrecta" });
        }
        return res.status(200).send({ message: "Opción borrada de la DB correctamente" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(50).json({ message: error.message });
        }
    }
});
exports.deleteQuestionOption = deleteQuestionOption;
