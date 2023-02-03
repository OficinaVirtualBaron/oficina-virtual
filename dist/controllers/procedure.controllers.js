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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProcedure = exports.updateProcedure = exports.getProcedure = exports.getProcedureByCategory = exports.getProcedures = exports.getTemplateProcedureById = exports.getOneProcedureFromHistory = exports.getHistoryOfProcedures = exports.submitProcedure = exports.createProcedure = void 0;
const Procedure_1 = require("../entities/Procedure");
const procedureSchema_1 = require("../validators/procedureSchema");
const categorySchema_1 = require("../validators/categorySchema");
const ProcedureHistory_1 = require("../entities/ProcedureHistory");
const QuestionHistory_1 = require("../entities/QuestionHistory");
const QuestionOptionsHistory_1 = require("../entities/QuestionOptionsHistory");
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// POST
const createProcedure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, category_id, description } = req.body;
        yield categorySchema_1.createCategorySchema.validateAsync(req.body);
        try {
            const procedure = new Procedure_1.Procedure();
            procedure.title = title;
            procedure.description = description;
            procedure.category = category_id;
            const savedProcedure = yield procedure.save();
            return res.status(200).send({ message: "Trámite creado", savedProcedure });
        }
        catch (error) {
            return res.send({ message: "Error. Alguno de los campos es incorrecto o está vacío" });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createProcedure = createProcedure;
// POST
var currentNum = -1;
const submitProcedure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, categoryId, statusId } = req.body;
        yield procedureSchema_1.submitProcedureSchema.validateAsync(req.body);
        const procedure = new ProcedureHistory_1.ProcedureHistory();
        let procedureCompleted;
        for (let i = 0; i < 1; i++) {
            currentNum = (currentNum + 1) % 4;
        }
        procedure.user = userId;
        procedure.category = categoryId;
        procedure.status = statusId;
        procedure.userMuni = currentNum;
        procedureCompleted = yield procedure.save();
        req.body.questions.forEach((question) => __awaiter(void 0, void 0, void 0, function* () {
            const newQuestion = new QuestionHistory_1.QuestionHistory();
            newQuestion.question = question.question;
            newQuestion.procedure = procedureCompleted;
            yield newQuestion.save();
            question.options.forEach((option) => __awaiter(void 0, void 0, void 0, function* () {
                const newOption = new QuestionOptionsHistory_1.QuestionOptionHistory();
                newOption.questionOption = option.questionOption;
                newOption.answer = option.answer;
                newOption.question = newQuestion;
                yield newOption.save();
            }));
        }));
        return res.status(201).send("Trámite enviado correctamente. ¡Gracias vecino!");
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(400).send({ message: "Datos mal cargados. Intente nuevamente" });
    }
});
exports.submitProcedure = submitProcedure;
// GET
const getHistoryOfProcedures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("auth-header");
    try {
        if (!token) {
            return res.status(401).send({ message: "Error. No hay token en la petición" });
        }
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest");
        const userMuniCategory = payload.category;
        const history = yield ProcedureHistory_1.ProcedureHistory.find({
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
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
});
exports.getHistoryOfProcedures = getHistoryOfProcedures;
// GET
const getOneProcedureFromHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const token = req.header("auth-header");
    try {
        if (!token) {
            return res.status(401).send({ message: "Error. No hay token en la petición" });
        }
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest");
        const userMuniCategory = payload.category;
        const procedure = yield ProcedureHistory_1.ProcedureHistory.find({
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
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
});
exports.getOneProcedureFromHistory = getOneProcedureFromHistory;
// GET
const getTemplateProcedureById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const template = yield Procedure_1.Procedure.findOne({
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
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
});
exports.getTemplateProcedureById = getTemplateProcedureById;
// GET
const getProcedures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const procedures = yield Procedure_1.Procedure.find();
        if (procedures.length === 0)
            return res.status(404).send({ message: "No se encontraron trámites" });
        return res.json(procedures);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
});
exports.getProcedures = getProcedures;
// GET
const getProcedureByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category_id } = req.params;
        const procedures = yield Procedure_1.Procedure.find({ where: { category: (0, typeorm_1.Equal)(category_id) } });
        if (procedures.length === 0)
            return res.status(404).send({ message: "No hay trámites para esta categoría por el momento" });
        return res.json(procedures);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getProcedureByCategory = getProcedureByCategory;
// GET
const getProcedure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const procedure = yield Procedure_1.Procedure.findOneByOrFail({ id: parseInt(req.params.id) });
        return res.status(200).json(procedure);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
});
exports.getProcedure = getProcedure;
// PUT 
const updateProcedure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const procedure = yield Procedure_1.Procedure.findOneBy({ id: parseInt(req.params.id) });
        if (!procedure)
            return res.status(404).send({ message: "El trámite no existe" });
        procedure.title = title;
        yield procedure.save();
        return res.status(200).send({ message: "Datos del trámite actualizados correctamente" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
});
exports.updateProcedure = updateProcedure;
// DELETE
const deleteProcedure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleteProcedure = yield Procedure_1.Procedure.delete({ id: parseInt(req.params.id) });
        if (deleteProcedure.affected === 0) {
            return res.status(404).send({ message: "Trámite no encontrado o incorrecto. Intente nuevamente" });
        }
        return res.status(200).send({ message: "Trámite borrado de la DB correctamente" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
});
exports.deleteProcedure = deleteProcedure;
