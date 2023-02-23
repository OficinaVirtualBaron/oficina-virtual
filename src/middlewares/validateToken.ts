import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN_KEY } from "../controllers/procedure.controllers";
import { IPayload } from "./index";

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("auth-header");
    try {
        if (!token) {
            return res.status(401).json("No hay token en la petición. Acceso denegado");
        }
        const payload = jwt.verify(token, SECRET_TOKEN_KEY || "tokentest") as IPayload;
        if (token) {
            next();
        } else {
            return res.status(401).send({ message: "No posee un token autorizado. Acceso denegado" });
        }
    } catch (error) {
        res.status(201).json("Token no válido. Acceso denegado");
    }
}