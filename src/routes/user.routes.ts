import {Router} from "express";
import app from "../app";
const bcrypt = require('bcryptjs');
import {
    createUser, 
    deleteUser, 
    getUserById, 
    getUsers, 
    updateUser
} from "../controllers/user.controller"

const router = Router()

router.get("/", getUsers);

// hash login (esto va en el post de crear user)
router.post("/login", async(req, res) =>  {
    const user = req.body.user;
    const password = req.body.password;
    if(user == "admin" && password == "12345"){
        const passwordHash = await bcrypt.hash(password, 10);
        res.json({
            message: "Autenticación exitosa",
            passwordHash: passwordHash
        })
    }
    else{
        res.json({
            message: "Credenciales no coincidentes"
        })
    }
})

router.post("/users", createUser);

router.get("/users", getUsers);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

router.get("/users/:id", getUserById);

export default router;