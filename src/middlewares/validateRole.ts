import { verifyToken } from "../helpers/generateToken";
import { User } from "../entities/User";
import { NextFunction, Request, Response } from "express";

export const validateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("auth-header");
        const tokenData = await verifyToken(token);
        console.log(tokenData);
        const { role } = req.params;
        if (role == "USER_ROLE"){
            next();
        } else {
            throw new Error;
        }
    } catch (error) {
        return ("No valid jwt");
    }
}