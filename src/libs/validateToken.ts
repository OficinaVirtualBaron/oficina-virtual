import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export interface IPayload {
    id: string;
    iat: number;
    exp: number;
}

export const TokenValidator = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).json("Acceso denegado");

    const payload = jwt.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest") as IPayload;
    req.userId = payload.id;
    next();
}