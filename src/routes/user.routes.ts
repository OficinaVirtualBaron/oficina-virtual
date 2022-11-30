import {Router} from "express";
import { Request, Response } from "express";
import {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    signIn,
    profile
} from "../controllers/user.controller"
import { getCategorias } from "../controllers/categoriaTramite.controllers";
import { TokenValidator } from "../libs/validateToken";
import { check } from "express-validator";

const router = Router();

// CRUD USERS
// POST crear user
router.post("/createUser", createUser)

// GET todos los users
router.get("/users", getUsers);

// GET find user by id
router.get("/users/:id", getUser);

// UPDATE update user by id (firstname, lastname, password)
router.put("/updateUser/:id", updateUser);

// DELETE delete user (only admins / admin_role)
router.delete("/deleteUser/:id", deleteUser);

// POST login user
router.post("/signin", signIn);

// POST see my profile
router.get("/profile", TokenValidator, profile);





// RUTAS DE TRAMITES
// GET home
router.get("/home", (req: Request, res: Response) => {
    res.json({msg: "Home Page"})
});


// GET inicio
router.get("/inicio", (req: Request, res: Response) => {
    res.json({msg: "Página de inicio"})
});



// GET de todos los trámites donde el usuario selecciona el suyo
router.get("/tramites", getCategorias);

// POST categoria del trámite
router.get("/tramites/transito", (req: Request, res: Response) => {
    res.json({msg: "Trámites del área de tránsito:"})
});
// POST entrar al trámite especificamente a hacerlo, con el id del tramite correspondiente
router.get("/tramites/transito/:id", (req: Request, res: Response) => {
    res.json({msg: "Trámite para pago de multas"})
});

// POST categoria del tramite
router.get("/tramites/rentas", (req: Request, res: Response) => {
    res.json({msg: "Trámites del área de rentas:"})
});
// POST entrar al trámite específicamente a hacerlo, con el id del tramite correspondiente
router.get("/tramites/rentas/:id", (req: Request, res: Response) => {
    res.json({msg: "Trámite para consultar deudas"})
});



//GET mis trámites
router.get("/misTramites", (req: Request, res: Response) => {
    res.json({msg: "Todos mis trámites:"})
})
//GET mi trámite por ID
router.get("/misTramites/:id", (req: Request, res: Response) => {
    res.json({msg: "Trámite N° {id}: "})
})



//GET comunicaciones
router.get("/misComunicaciones", (req: Request, res: Response) => {
    res.json({msg: "Mis comunicaciones:"})
})
//GET comunicación por ID
router.get("/misComunicaciones/:id", (req: Request, res: Response) => {
    res.json({msg: "Comunicación N° {id}:"})
})

export default router;