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