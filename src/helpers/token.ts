import jwt from "jsonwebtoken";

// cambiar any a number
export const tokenSign = async (user: { id: any; role: any; category: any }) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role,
            category: user.category
        },
        process.env.SECRET_TOKEN_KEY || "tokentest",
        {
            expiresIn: "24h",
        }
    );
}

// export const tokenSignMuni = async (userMuni: { id: number; role: string; category: number }) => {
//     return jwt.sign()
// }

export const verifyToken = async (token: any) => {
    try {
        return jwt.verify(token, process.env.SECRET_TOKEN_KEY || "tokentest")
    } catch (error) {
        if (error instanceof Error) {
            return null;
        }
    }
}