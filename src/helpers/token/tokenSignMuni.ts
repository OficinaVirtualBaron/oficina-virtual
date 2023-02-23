import jwt from "jsonwebtoken";
import { SECRET_TOKEN_KEY } from "../../controllers/procedure.controllers";
import { UserMuni } from "../../entities/Muni";

export const tokenSignMuni = async (userMuni: UserMuni) => {
    return jwt.sign(
        {
            id: userMuni.id,
            role: userMuni.role,
            category: userMuni.category.id
        }, SECRET_TOKEN_KEY || "tokentest",
        {
            expiresIn: "24h"
        }
    );
}