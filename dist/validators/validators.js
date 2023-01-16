"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMuniSchema = exports.createMuniSchema = exports.updateCategorySchema = exports.createCategorySchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUserSchema = joi_1.default.object({
    firstname: joi_1.default.string().min(3).max(30).required(),
    lastname: joi_1.default.string().min(3).max(30).required(),
    password: joi_1.default.string().min(8).max(30).pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
    email: joi_1.default.string().email().required(),
    cuil: joi_1.default.string().min(11).max(11).alphanum().required(),
    adress: joi_1.default.string().min(3).max(30).required(),
});
exports.updateUserSchema = joi_1.default.object({
    password: joi_1.default.string().min(8).max(30).pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
    email: joi_1.default.string().email(),
});
exports.createCategorySchema = joi_1.default.object({
    user_id: joi_1.default.number().max(30),
    title: joi_1.default.string().min(5).max(30),
    category_id: joi_1.default.number().max(30),
    description: joi_1.default.string().min(10).max(100),
});
exports.updateCategorySchema = joi_1.default.object({
    title: joi_1.default.string().min(5).max(30),
    description: joi_1.default.string().min(10).max(100),
});
exports.createMuniSchema = joi_1.default.object({
    firstname: joi_1.default.string().min(3).max(30).required(),
    lastname: joi_1.default.string().min(3).max(30).required(),
    password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: joi_1.default.string().email().required(),
    cuil: joi_1.default.string().min(11).max(11).required(),
    area: joi_1.default.string().required(),
    required: joi_1.default.number(),
    inprocess: joi_1.default.number(),
    finalized: joi_1.default.number()
});
exports.updateMuniSchema = joi_1.default.object({
    firstname: joi_1.default.string().min(3).max(30),
    lastname: joi_1.default.string().min(3).max(30),
    password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).max(30),
    email: joi_1.default.string(),
    area: joi_1.default.string().required(),
});
