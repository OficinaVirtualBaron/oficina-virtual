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
exports.signIn = exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const User_1 = require("../entities/User");
const validators_1 = require("../validators/validators");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = require("../helpers/token");
const saltround = 10;
// POST 
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = bcrypt_1.default.genSaltSync();
    try {
        const { firstname, lastname, email, password, cuil, adress } = req.body;
        const user = new User_1.User();
        yield validators_1.createUserSchema.validateAsync(req.body);
        user.firstname = firstname;
        user.lastname = lastname;
        user.password = bcrypt_1.default.hashSync(password, salt);
        user.email = email;
        user.cuil = cuil;
        user.adress = adress;
        yield user.save();
        res.status(201).send({ message: "Usuario creado correctamente. Inicie sesión a continuación" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createUser = createUser;
// GET 
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find({
            select: {
                id: true,
                firstname: true,
                lastname: true,
                adress: true,
                cuil: true,
                email: true
            }
        });
        if (users.length === 0)
            return res.status(404).send({ message: "No se encontraron usuarios" });
        return res.json(users);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getUsers = getUsers;
// GET 
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne({
            where: {
                id: parseInt(req.params.id)
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                adress: true,
                cuil: true,
                email: true
            }
        });
        if (!user) {
            return res.status(404).send({ message: `El vecino ID #${req.params.id} no existe` });
        }
        return res.status(200).send(user);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getUser = getUser;
// PUT 
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, email, password } = req.body;
        const user = yield User_1.User.findOneBy({ id: parseInt(req.params.id) });
        if (!user)
            return res.status(404).send({ message: "El usuario no existe" });
        yield validators_1.updateUserSchema.validateAsync(req.body);
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.password = password;
        yield user.save();
        return res.status(200).send({ message: "Datos del usuario actualizados correctamente" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateUser = updateUser;
// DELETE 
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield User_1.User.delete({ id: parseInt(req.params.id) });
        if (result.affected === 0) {
            return res.status(404).json({ message: "Usuario no encontrado o incorrecto. Intente nuevamente" });
        }
        return res.status(200).send({ message: "Usuario borrado de la DB correctamente" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteUser = deleteUser;
// POST
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        const salt = bcrypt_1.default.genSaltSync();
        const user = yield User_1.User.findOne({ where: { cuil: req.body.cuil } });
        if (!user) {
            return res.status(404).json("El usuario es incorrecto. Intente nuevamente");
        }
        const validatePassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validatePassword) {
            return res.status(400).json("Contraseña incorrecta. Intente nuevamente");
        }
        const token = yield (0, token_1.tokenSignUser)(user);
        res.status(200).json({ user, token });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.signIn = signIn;
