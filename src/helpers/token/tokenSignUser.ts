import jwt from "jsonwebtoken";
import { SECRET_TOKEN_KEY } from "../../controllers/procedure.controllers";
import { User } from "../../entities/User";

// cambiar any a number
export const tokenSignUser = async (user: User) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        SECRET_TOKEN_KEY || "tokentest",
        {
            expiresIn: "24h",
        }
    );
}