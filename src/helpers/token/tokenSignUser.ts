import jwt from "jsonwebtoken";
import { User } from "../../entities/User";

// cambiar any a number
export const tokenSignUser = async (user: User) => {
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