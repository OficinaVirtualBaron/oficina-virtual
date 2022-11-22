import {Router} from "express";
import bcrypt from "bcrypt"
import { Request, Response } from "express";
import {
    
} from "../controllers/user.controller"

const router = Router()

// hash login (esto va en el post de logear user)
//router.post("/createUser", createUser)

// GET home
router.get("/home", (req: Request, res: Response) => {
    res.json({msg: "Home Page"})
});


// POST
router.get("/loginUser", (req: Request, res: Response) => {
    res.json({msg: "Página de login o creación de usuario con CIDI"})
});



// GET inicio
router.get("/inicio", (req: Request, res: Response) => {
    res.json({msg: "Página de inicio"})
});



// GET de todos los trámites donde el usuario selecciona el suyo
router.get("/tramites", (req: Request, res: Response) => {
    res.json({msg: "Todos los trámites se alojan aqui"})
});

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