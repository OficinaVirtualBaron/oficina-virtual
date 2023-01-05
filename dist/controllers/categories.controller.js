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
exports.deleteCategory = exports.updateCategory = exports.getCategory = exports.getCategories = exports.createCategory = void 0;
const Category_1 = require("../entities/Category");
const validators_1 = require("../validators/validators");
// POST
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const category = new Category_1.Category();
        category.title = title;
        category.description = description;
        const categorySaved = yield category.save();
        res.status(200).send({ message: "Categoría creada exitosamente" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createCategory = createCategory;
// GET
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.Category.find();
        if (categories.length === 0)
            return res.status(404).send({ message: "No se encontraron categorías" });
        return res.json(categories);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getCategories = getCategories;
// GET
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield Category_1.Category.findOneByOrFail({ id: parseInt(req.params.id) });
        return res.json(category);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getCategory = getCategory;
// PUT
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const category = yield Category_1.Category.findOneBy({ id: parseInt(req.params.id) });
        if (!category)
            return res.status(404).send({ message: "La categoría no existe" });
        const updateValidation = yield validators_1.updateCategorySchema.validateAsync(req.body);
        category.title = title;
        yield category.save();
        return res.status(200).send({ message: "Datos de la categoría actualizados correctamente" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.updateCategory = updateCategory;
// DELETE
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Category_1.Category.delete({ id: parseInt(id) });
        if (result.affected === 0) {
            return res.status(404).json("Categoría no encontrada o incorrecta. Intente nuevamente");
        }
        return res.status(200).send({ message: "Categoría borrada de la DB correctamente" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(50).json({ message: error.message });
        }
    }
});
exports.deleteCategory = deleteCategory;
