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
exports.deleteProcedure = exports.updateProcedure = exports.getProcedure = exports.getProcedures = exports.createProcedure = void 0;
const Procedure_1 = require("../entities/Procedure");
// POST
const createProcedure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, user_id } = req.body;
        const procedure = new Procedure_1.Procedure();
        procedure.title = title;
        procedure.user_id = user_id;
        const savedProcedure = yield procedure.save();
        res.json(savedProcedure);
        console.log(savedProcedure);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createProcedure = createProcedure;
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
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getProcedures = getProcedures;
// GET
const getProcedure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const procedure = yield Procedure_1.Procedure.findOneByOrFail({ id: parseInt(req.params.id) });
        return res.json(procedure);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getProcedure = getProcedure;
// PUT 
const updateProcedure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, status } = req.body;
        const procedure = yield Procedure_1.Procedure.findOneBy({ id: parseInt(req.params.id) });
        if (!procedure)
            return res.status(404).send({ message: "El trámite no existe" });
        procedure.title = title;
        procedure.status = status;
        yield procedure.save();
        return res.status(200).send({ message: "Datos del trámite actualizados correctamente" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateProcedure = updateProcedure;
// DELETE
const deleteProcedure = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteProcedure = yield Procedure_1.Procedure.delete({ id: parseInt(id) });
        if (deleteProcedure.affected === 0) {
            return res.status(404).send({ message: "Trámite no encontrado o incorrecto. Intente nuevamente" });
        }
        return res.status(200).send({ message: "Trámite borrado de la DB correctamente" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteProcedure = deleteProcedure;
