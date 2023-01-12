import { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import { IPayload } from "./index";

export const validateId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const token = req.header("auth-header");
    try {
        if (!token) return res.status(401).json("No hay token en la petición. Acceso denegado");
        const payload = jwt.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest") as IPayload;
        req.userId = payload.id;
        if (id != req.userId) {
            res.status(401).json({message: "Usted no es el mismo usuario. Acceso denegado"});
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json("Token no válido. Acceso denegado");
    }
}