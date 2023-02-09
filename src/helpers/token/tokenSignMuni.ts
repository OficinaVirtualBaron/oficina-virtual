import jwt from "jsonwebtoken";
import { UserMuni } from "../../entities/Muni";

export const tokenSignMuni = async (userMuni: UserMuni) => {
    return jwt.sign(
        {
            id: userMuni.id,
            role: userMuni.role,
            category: userMuni.category.id
        }, process.env.SECRET_TOKEN_KEY || "tokentest",
        {
            expiresIn: "24h"
        }
    );
}