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
exports.signInMuni = exports.deleteMuni = exports.updateMuni = exports.getMuni = exports.getMunis = exports.createMuni = void 0;
const muniSchema_1 = require("../validators/muniSchema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Muni_1 = require("../entities/Muni");
const tokenSignMuni_1 = require("../helpers/token/tokenSignMuni");
const saltround = 10;
// POST
const createMuni = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = bcrypt_1.default.genSaltSync();
    try {
        const { firstname, lastname, email, password, cuil, category, required, inprocess, finalized } = req.body;
        const userMuni = new Muni_1.UserMuni();
        yield muniSchema_1.createMuniSchema.validateAsync(req.body);
        userMuni.firstname = firstname;
        userMuni.lastname = lastname;
        userMuni.password = bcrypt_1.default.hashSync(password, salt);
        userMuni.email = email;
        userMuni.cuil = cuil;
        userMuni.category = category;
        userMuni.required = required;
        userMuni.inprocess = inprocess;
        userMuni.finalized = finalized;
        yield userMuni.save();
        res.status(201).send({ message: `¡Usuario municipal ${firstname} ${lastname} creado exitosamente!` });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createMuni = createMuni;
// GET 
const getMunis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const munis = yield Muni_1.UserMuni.find({
            relations: {
                category: true
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                cuil: true,
                email: true,
                category: {
                    title: true
                }
            }
        });
        if (munis.length === 0) {
            return res.status(404).send({ message: "No se encontraron usuarios municipales" });
        }
        return res.json(munis);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getMunis = getMunis;
// GET
const getMuni = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userMuni = yield Muni_1.UserMuni.findOne({
            where: {
                id: parseInt(req.params.id)
            },
            relations: {
                category: true
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                cuil: true,
                email: true,
                category: {
                    id: true,
                    title: true
                },
                required: true,
                finalized: true,
                inprocess: true,
            }
        });
        return res.json(userMuni);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getMuni = getMuni;
// PUT
const updateMuni = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, email, password } = req.body;
        const userMuni = yield Muni_1.UserMuni.findOneBy({ id: parseInt(req.params.id) });
        if (!userMuni)
            return res.status(404).json({ message: "El usuario no existe" });
        yield muniSchema_1.updateMuniSchema.validateAsync(req.body);
        userMuni.firstname = firstname;
        userMuni.lastname = lastname;
        userMuni.email = email;
        yield userMuni.save();
        return res.status(200).json("Datos del usuario municipal actualizados correctamente");
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateMuni = updateMuni;
// DELETE
const deleteMuni = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userMuni = yield Muni_1.UserMuni.delete({ id: parseInt(req.params.id) });
        if (userMuni.affected === 0) {
            return res.status(404).json("Usuario municipal no encontrado o incorrecto. Intente nuevamente");
        }
        return res.status(200).json("Usuario municipal borrado de la DB correctamente");
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteMuni = deleteMuni;
// POST
const signInMuni = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, cuil } = req.body;
        const userMuni = yield Muni_1.UserMuni.findOne({
            where: {
                cuil: cuil
            },
            relations: {
                category: true
            },
            select: {
                category: {
                    id: true,
                    title: true
                }
            }
        });
        if (!userMuni) {
            return res.status(400).json("El CUIL es incorrecto o no existe. Intente nuevamente");
        }
        const validatePassword = yield bcrypt_1.default.compare(password, userMuni.password);
        if (!validatePassword) {
            return res.status(400).json("Contraseña incorrecta. Intente nuevamente");
        }
        const token = yield (0, tokenSignMuni_1.tokenSignMuni)(userMuni);
        return res.status(200).json({ userMuni, token });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.signInMuni = signInMuni;
