import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export interface IPayload {
    id: string;
    role: string;
    iat: number;
    exp: number;
}

export const isUserOrMuni = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const token = req.header("auth-header");
    try {
        if (!token) return res.status(401).json("No hay token en la petición. Acceso denegado");
        const payload = jwt.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest") as IPayload;
        req.userId = payload.id;
        req.userRole = payload.role;
        if (req.userRole != "USER_ROLE" || "MUNI_ROLE"){
            res.status(401).json("Usted no es municipal. Acceso denegado")
        }
        if (id != req.userId) {
            res.status(401).json({message: "ERROR 401 - UNAUTHORIZED"});
        }
    } catch (error) {
        res.status(401).json("Token no válido. Acceso denegado")
    }
}