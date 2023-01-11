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
exports.deleteProcedureOfHistory = exports.changeStatusProcedure = exports.getOneProcedureHistory = exports.getHistory = void 0;
const ProcedureHistory_1 = require("../entities/ProcedureHistory");
const validators_1 = require("../validators/validators");
// GET
const getHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield ProcedureHistory_1.ProcedureHistory.find();
        if (history.length === 0)
            return res.status(404).send({ message: "No hay historial de trámites aún" });
        return res.json(history);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getHistory = getHistory;
// GET
const getOneProcedureHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const procedureHistory = yield ProcedureHistory_1.ProcedureHistory.findOneByOrFail({ id: parseInt(req.params.id) });
        return res.json(procedureHistory);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getOneProcedureHistory = getOneProcedureHistory;
// PUT
const changeStatusProcedure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const procedureHistory = yield ProcedureHistory_1.ProcedureHistory.findOneBy({ id: parseInt(req.params.id) });
        if (!procedureHistory)
            return res.status(404).send({ message: "El trámite que quiere modificar no se encuentra en el historial" });
        yield validators_1.changeStatusValidator.validateAsync(req.body);
        procedureHistory.status = status;
        yield procedureHistory.save();
        console.log(procedureHistory);
        return res.status(200).json({ message: "Status del trámite actualizado correctamente", procedureHistory });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.changeStatusProcedure = changeStatusProcedure;
// DELETE
const deleteProcedureOfHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteProcedure = yield ProcedureHistory_1.ProcedureHistory.delete({ id: parseInt(id) });
        if (deleteProcedure.affected === 0) {
            return res.status(404).send({ message: "Trámite no encontrado o ID incorrecto. Intente nuevamente" });
        }
        return res.status(200).send({ message: "Trámite borrado del historial correctamente" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteProcedureOfHistory = deleteProcedureOfHistory;
