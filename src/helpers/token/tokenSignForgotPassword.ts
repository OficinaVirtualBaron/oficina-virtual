import jwt from "jsonwebtoken";
import { RESET_PASSWORD_KEY } from "../../controllers/user.controller";
import { User } from "../../entities/User";

export const tokenSignForgotPassword = async (user: User) => {
    return jwt.sign(
        {
            id: user.id
        },
        RESET_PASSWORD_KEY || "token_reset_password",
        {
            expiresIn: "15m",
        }
    );
}