"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserOrMuni = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const procedure_controllers_1 = require("../controllers/procedure.controllers");
const isUserOrMuni = (req, res, next) => {
    const token = req.header("auth-header");
    try {
        if (!token) {
            return res.status(401).json("No hay token en la petición. Acceso denegado");
        }
        const payload = jsonwebtoken_1.default.verify(token, procedure_controllers_1.SECRET_TOKEN_KEY || "tokentest");
        req.userId = payload.id;
        req.userRole = payload.role;
        if (req.userRole == "USER_ROLE" || "MUNI_ROLE") {
            next();
        }
        else {
            res.status(401).send({ message: "No posee un rol autorizado. Acceso denegado" });
        }
    }
    catch (error) {
        res.status(401).json("Token no válido. Acceso denegado");
    }
};
exports.isUserOrMuni = isUserOrMuni;
