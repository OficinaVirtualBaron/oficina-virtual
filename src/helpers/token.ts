import jwt from "jsonwebtoken";
import { UserMuni } from "../entities/Muni";

// cambiar any a number
export const tokenSignUser = async (user: { id: any; role: any; }) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.SECRET_TOKEN_KEY || "tokentest",
        {
            expiresIn: "24h",
        }
    );
}

export const tokenSignMuni = async (userMuni: UserMuni) => {
    return jwt.sign(
        {
            id: userMuni.id,
            role: userMuni.role,
            category: userMuni.category
        }, process.env.SECRET_TOKEN_KEY || "tokentest",
        {
            expiresIn: "24h"
        }
    );
}

export const verifyToken = async (token: any) => {
    try {
        return jwt.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest")
    } catch (error) {
        if (error instanceof Error) {
            return null;
        }
    }
}