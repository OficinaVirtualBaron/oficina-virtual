import jwt from "jsonwebtoken";
import { User } from "../../entities/User";

export const tokenSignForgotPassword = async (user: User) => {
    return jwt.sign(
        {
            id: user.id
        },
        process.env.RESET_PASSWORD_KEY || "token_reset_password",
        {
            expiresIn: "15m",
        }
    );
}