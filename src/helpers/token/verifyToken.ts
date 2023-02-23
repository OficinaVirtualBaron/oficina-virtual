import jwt from "jsonwebtoken";
import { IPayload } from "../../middlewares";
import { Response } from "express";
import { SECRET_TOKEN_KEY } from "../../controllers/procedure.controllers";

export const verifyToken = async (res: Response, token: string) => {
    try {
        return jwt.verify(token, SECRET_TOKEN_KEY || "tokentest") as IPayload;
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send(null);
        }
    }
}