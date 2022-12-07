"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMuniSchema = exports.createMuniSchema = exports.updateCategoriaTramiteSchema = exports.createCategoriaTramiteSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserSchema = joi_1.default.object({
    firstname: joi_1.default.string().min(3).max(30).required(),
    lastname: joi_1.default.string().min(3).max(30).required(),
    password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: joi_1.default.string().email().required(),
    cuil: joi_1.default.number().integer().required(),
    adress: joi_1.default.string().min(3).max(30).required()
});
exports.updateUserSchema = joi_1.default.object({
    firstname: joi_1.default.string().min(3).max(30),
    lastname: joi_1.default.string().min(3).max(30),
    password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).max(30),
    email: joi_1.default.string(),
});
exports.createCategoriaTramiteSchema = joi_1.default.object({
    title: joi_1.default.string().min(5).max(30),
    description: joi_1.default.string().min(10).max(100),
});
exports.updateCategoriaTramiteSchema = joi_1.default.object({
    title: joi_1.default.string().min(5).max(30),
    description: joi_1.default.string().min(10).max(100),
});
exports.createMuniSchema = joi_1.default.object({
    firstname: joi_1.default.string().min(3).max(30).required(),
    lastname: joi_1.default.string().min(3).max(30).required(),
    password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: joi_1.default.string().email().required(),
    cuil: joi_1.default.number().integer().required(),
    area: joi_1.default.string().required(),
});
exports.updateMuniSchema = joi_1.default.object({
    firstname: joi_1.default.string().min(3).max(30),
    lastname: joi_1.default.string().min(3).max(30),
    password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).max(30),
    email: joi_1.default.string(),
    area: joi_1.default.string().required(),
});
