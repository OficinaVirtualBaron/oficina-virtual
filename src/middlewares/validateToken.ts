import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { userInfo } from "os";

export interface IPayload {
    id: string;
    iat: number;
    exp: number;
}

export const TokenValidator = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("auth-header");
    try {
        if (!token) return res.status(401).json("No hay token en la petición. Acceso denegado");
        const payload = jwt.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest") as IPayload;
        req.userId = payload.id;
        next();
    } catch (error) {
        res.status(401).json("Token no válido")
    }
}