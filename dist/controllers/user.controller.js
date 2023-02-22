"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userRepository = exports.resetPassword = exports.forgotPassword = exports.signIn = exports.deleteUser = exports.updateUser = exports.getUser = exports.getProfile = exports.getProceduresOfUser = exports.getMyProcedures = exports.getUsers = exports.createUser = void 0;
const User_1 = require("../entities/User");
const userSchema_1 = require("../validators/userSchema");
const bcrypt_1 = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenSignUser_1 = require("../helpers/token/tokenSignUser");
const forgotPasswordEmail_1 = require("../helpers/email/forgotPasswordEmail");
const mailer_1 = require("../config/mailer/mailer");
const procedure_controllers_1 = require("./procedure.controllers");
const repository_1 = require("../config/repository/repository");
Object.defineProperty(exports, "userRepository", { enumerable: true, get: function () { return repository_1.userRepository; } });
const signUpEmail_1 = require("../helpers/email/signUpEmail");
const tokenSignForgotPassword_1 = require("../helpers/token/tokenSignForgotPassword");
const saltround = 10;
// POST
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = bcrypt_1.default.genSaltSync();
    try {
        const { firstname, lastname, email, password, cuil, adress } = req.body;
        const user = new User_1.User();
        yield userSchema_1.createUserSchema.validateAsync(req.body);
        user.firstname = firstname;
        user.lastname = lastname;
        user.password = bcrypt_1.default.hashSync(password, saltround);
        user.email = email;
        user.cuil = cuil;
        user.adress = adress;
        yield repository_1.userRepository.save(user);
        res.status(201).send({ message: "Usuario creado correctamente. Inicie sesión a continuación" });
        (0, signUpEmail_1.signUpUserConfirmationEmail)(user, mailer_1.transporter);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createUser = createUser;
// GET en un futuro hacer paginacion
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield repository_1.userRepository.find({
            select: {
                id: true,
                firstname: true,
                lastname: true,
                adress: true,
                cuil: true,
                email: true
            },
            // take: 10,
            // skip: 0
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
// GET en un futuro hacer paginacion
const getMyProcedures = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("auth-header");
    try {
        if (!token) {
            return res.status(401).send({ message: "Error. No hay token en la petición" });
        }
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest");
        const userId = parseInt(payload.id);
        const procedures = yield procedure_controllers_1.procedureHistoryRepository.find({
            relations: {
                category: true,
                status: true,
                questions: {
                    question: true,
                    question_option_history: true
                }
            },
            select: {
                category: {
                    title: true
                },
                status: {
                    status: true
                }
            },
            where: {
                user: {
                    id: userId
                }
            }
        });
        if (procedures.length === 0) {
            return res.status(404).send({ message: "No hay ningún trámite presentado aún" });
        }
        return res.status(200).send(procedures);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
});
exports.getMyProcedures = getMyProcedures;
// GET en un futuro hacer paginación
const getProceduresOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const procedures = yield procedure_controllers_1.procedureHistoryRepository.find({
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
                    email: true,
                    adress: true
                },
                category: {
                    title: true
                },
                status: {
                    status: true
                }
            },
            where: {
                user: {
                    id: parseInt(id)
                }
            }
        });
        if (procedures.length === 0) {
            return res.status(404).send({ message: "El vecino aún no realizó ningún trámite" });
        }
        return res.status(200).send({ message: `Trámites del vecino ID #${id}`, procedures });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
    }
});
exports.getProceduresOfUser = getProceduresOfUser;
// GET
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("auth-header");
        if (!token)
            return res.status(401).send({ message: "Error. No hay token en la petición" });
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest");
        const userId = payload.id;
        try {
            const user = yield repository_1.userRepository.findOne({
                where: {
                    id: parseInt(userId)
                },
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    cuil: true,
                    adress: true,
                    created_at: true
                }
            });
            return res.status(200).json({ "Perfil vecinal ": user });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).send({ message: error.message });
            }
            else {
                return res.status(500).send({ message: "Error. Ocurrió un error en la petición" });
            }
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
        else {
            return res.status(401).send({ message: "Error. Ocurrió algún problema con el token" });
        }
    }
});
exports.getProfile = getProfile;
// GET 
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield repository_1.userRepository.findOne({
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
        const token = req.header("auth-header");
        if (!token)
            return res.status(401).send({ message: "Error. No hay token en la petición" });
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest");
        const userId = payload.id;
        try {
            const { firstname, lastname, email, password } = req.body;
            const user = yield repository_1.userRepository.findOne({ where: { id: parseInt(userId) } });
            if (!user)
                return res.status(404).send({ message: "El usuario no existe" });
            yield userSchema_1.updateUserSchema.validateAsync(req.body);
            user.firstname = firstname;
            user.lastname = lastname;
            user.email = email;
            user.password = bcrypt_1.default.hashSync(password, saltround);
            yield repository_1.userRepository.save(user);
            return res.status(200).send({ message: "Datos del usuario actualizados correctamente" });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
        else {
            return res.status(500).send({ message: "Error. Ocurrió algún problema con el token" });
        }
    }
});
exports.updateUser = updateUser;
// DELETE -- no habilitada por ahora --
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield repository_1.userRepository.delete({ id: parseInt(req.params.id) });
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
        const user = yield repository_1.userRepository.findOne({ where: { cuil: req.body.cuil } });
        if (!user) {
            return res.status(404).json("El usuario es incorrecto. Intente nuevamente");
        }
        const validatePassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validatePassword) {
            return res.status(400).json("Contraseña incorrecta. Intente nuevamente");
        }
        const token = yield (0, tokenSignUser_1.tokenSignUser)(user);
        return res.status(200).json({ user, token });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.signIn = signIn;
// POST
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email)
        return res.status(400).send({ message: "El email es requerido. Por favor, ingréselo." });
    const message = "Un email se envió a su casilla de correos para restablecer su contraseña";
    try {
        const user = yield repository_1.userRepository.findOneBy({ email: email });
        if (!user)
            return res.status(404).send({ message: "El correo electrónico es incorrecto. Por favor, intente nuevamente" });
        const token = yield (0, tokenSignForgotPassword_1.tokenSignForgotPassword)(user);
        const verificationLink = `http://localhost:3000/auth/reset-password/${token}`;
        user.resetToken = token;
        yield repository_1.userRepository.save(user);
        (0, forgotPasswordEmail_1.forgotPasswordEmail)(user, mailer_1.transporter, verificationLink);
        return res.status(200).json({ message: message });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: message });
        }
    }
    return res.status(200).send({ message });
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newPassword } = req.body;
    const resetToken = req.header("reset-token");
    if (!resetToken)
        return res.status(400).send({ message: "Error. No hay token en la petición" });
    try {
        if (!(resetToken && newPassword)) {
            res.status(400).send({ message: "Todos los campos son requeridos." });
        }
        const payload = jsonwebtoken_1.default.verify(resetToken, process.env.RESET_PASSWORD_KEY || "token_reset_password");
        const userId = payload.id;
        const user = yield repository_1.userRepository.findOneBy({ id: parseInt(userId) });
        if (!user)
            return res.status(404).send({ message: "El usuario no fue encontrado" });
        try {
            user.password = (0, bcrypt_1.hashSync)(newPassword, saltround);
            yield repository_1.userRepository.save(user);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).send({ message: error.message });
            }
            else {
                return res.status(400).send({ message: "Error. Algo fue mal" });
            }
        }
        return res.status(200).send({ message: "La contraseña fue cambiada correctamente" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        }
        else {
            return res.status(401).send({ message: "Algo fue mal" });
        }
    }
});
exports.resetPassword = resetPassword;
