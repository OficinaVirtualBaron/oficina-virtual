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
exports.deleteCategoria = exports.updateCategoria = exports.getCategoria = exports.getCategorias = exports.createCategoriaTramite = void 0;
const CategoriaTramite_1 = require("../entities/CategoriaTramite");
const validators_1 = require("../validators/validators");
// POST - cuando se cree una se tiene que hacer todo en mayúsculas
const createCategoriaTramite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const categoriaTramite = new CategoriaTramite_1.CategoriaTramite();
        const result = yield validators_1.createCategoriaTramiteSchema.validateAsync(req.body);
        categoriaTramite.title = title;
        categoriaTramite.description = description;
        console.log(result);
        yield categoriaTramite.save();
        return res.json(categoriaTramite);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createCategoriaTramite = createCategoriaTramite;
// GET 
const getCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoriasTramites = yield CategoriaTramite_1.CategoriaTramite.find();
        return res.json(categoriasTramites);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.getCategorias = getCategorias;
// GET
const getCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const categoriaTramite = yield CategoriaTramite_1.CategoriaTramite.findBy({ id: parseInt(req.params.id) });
        return res.json(categoriaTramite);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getCategoria = getCategoria;
// PUT
const updateCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const categoriaTramite = yield CategoriaTramite_1.CategoriaTramite.findOneBy({ id: parseInt(req.params.id) });
        if (!categoriaTramite)
            return res.status(404).json("Categoria no encontrada");
        const result = yield validators_1.createCategoriaTramiteSchema.validateAsync(req.body);
        categoriaTramite.title = title;
        categoriaTramite.description = description;
        console.log(result);
        yield categoriaTramite.save();
        return res.status(200).json("Datos de la categoria actualizados correctamente");
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateCategoria = updateCategoria;
// DELETE
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield CategoriaTramite_1.CategoriaTramite.delete({ id: parseInt(id) });
        if (result.affected === 0) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }
        return res.status(200).json("Categoria borrada correctamente de la DB");
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteCategoria = deleteCategoria;
