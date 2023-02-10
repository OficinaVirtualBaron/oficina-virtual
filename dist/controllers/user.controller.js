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
exports.forgotPassword = exports.signIn = exports.deleteUser = exports.updateUser = exports.getUser = exports.getProceduresOfUser = exports.getMyProcedures = exports.getUsers = exports.createUser = void 0;
const User_1 = require("../entities/User");
const userSchema_1 = require("../validators/userSchema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenSignUser_1 = require("../helpers/token/tokenSignUser");
const ProcedureHistory_1 = require("../entities/ProcedureHistory");
const forgotPasswordEmail_1 = require("../helpers/email/forgotPasswordEmail");
const mailer_1 = require("../config/mailer");
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
// GET en un futuro hacer paginacion
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
        const procedures = yield ProcedureHistory_1.ProcedureHistory.find({
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
// GET en un futuro hacer paginacion
const getProceduresOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const procedures = yield ProcedureHistory_1.ProcedureHistory.find({
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
        yield userSchema_1.updateUserSchema.validateAsync(req.body);
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
    const user = yield User_1.User.findOneBy({ email: email });
    if (!user) {
        return res.status(404).send({ message: "No existe ningún usuario con ese correo electrónico. Intente nuevamente" });
    }
    yield (0, forgotPasswordEmail_1.forgotPasswordEmail)(user, mailer_1.transporter);
    return res.status(200).send({ message: "Se envió un link de recuperación a su correo electrónico. Ingrese a su casilla para cambiar su contraseña" });
});
exports.forgotPassword = forgotPassword;
