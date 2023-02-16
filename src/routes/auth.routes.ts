import { Router } from "express";
import { signIn, createUser, forgotPassword, resetPassword } from "../controllers/user.controller";
import { signInMuni } from "../controllers/muni.controllers";
import { isMuniRole } from "../middlewares/validateMuni";
const router = Router();


import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { hashSync } from "bcrypt";
import { User } from "../entities/User";
import { AppDataSource } from "../db";
import path from "path";

const userRepository = AppDataSource.getRepository(User);
const saltround = 10;

// POST
router.post("/signUp", isMuniRole, createUser);
router.post("/signIn", signIn);
router.post("/signinMunicipales", signInMuni);
router.put("/forgot-password", forgotPassword);
router.post("/reset-password/:token", async (req: Request, res: Response) => {
    const resetToken = req.params.token;
    const { newPassword } = req.body;
    try {
        if (!(resetToken && newPassword)) {
            return res.status(400).send({ message: "Todos los campos son requeridos." });
        }
        const payload = jwt.verify(resetToken, process.env.RESET_PASSWORD_KEY || "token_reset_password") as { id: number };
        const userId = payload.id;
        const user = await userRepository.findOneBy({ id: userId });
        if (!user) return res.status(404).send({ message: "El usuario no fue encontrado" });
        user.password = hashSync(newPassword, saltround);
        await userRepository.save(user);
        const htmlPath = path.join(__dirname, "C:/proyectos/oficina-virtual/oficina-virtual/src/pruebas/html/resetPassword.html");
        return res.sendFile(htmlPath);
        // return res.status(200).send({ message: "La contraseña fue cambiada correctamente" });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message });
        } else {
            return res.status(401).send({ message: "Algo fue mal" });
        }
    }
});

export default router;