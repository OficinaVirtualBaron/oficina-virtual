import jwt from "jsonwebtoken";
import { validateRole } from "../middlewares/validateRole";

export const tokenSign = async (user: { id: any; role: any; }) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.SECRET_TOKEN_KEY || "tokentest",
        {
            expiresIn: "2h",
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