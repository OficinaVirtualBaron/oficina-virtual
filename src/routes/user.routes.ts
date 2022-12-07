import {Router} from "express";
import { Request, Response } from "express";
import {
    getUser,
    getUsers,
    updateUser,
    deleteUser
} from "../controllers/user.controller";
import { TokenValidator } from "../middlewares/validateToken";
//import { isAdminRole } from "../middlewares/validateAdminRole"
import { validateRole } from "../middlewares/validateRole";

const router = Router();

// GET 
router.get("/users", TokenValidator, validateRole, getUsers);

// GET 
router.get("/users/:id", TokenValidator, getUser);

// UPDATE 
router.put("/updateUser/:id", TokenValidator, updateUser);

// DELETE 
router.delete("/deleteUser/:id", TokenValidator, deleteUser);






// RUTAS DE TRAMITES
// GET 
router.get("/home", (req: Request, res: Response) => {
    res.json({msg: "Home Page"})
});


// GET 
router.get("/inicio", (req: Request, res: Response) => {
    res.json({msg: "Página de inicio"})
});


// POST 
router.get("/tramites/transito", (req: Request, res: Response) => {
    res.json({msg: "Trámites del área de tránsito:"})
});
// POST 
router.get("/tramites/transito/:id", (req: Request, res: Response) => {
    res.json({msg: "Trámite para pago de multas"})
});

// POST 
router.get("/tramites/rentas", (req: Request, res: Response) => {
    res.json({msg: "Trámites del área de rentas:"})
});
// POST 
router.get("/tramites/rentas/:id", (req: Request, res: Response) => {
    res.json({msg: "Trámite para consultar deudas"})
});



//GET 
router.get("/misTramites", (req: Request, res: Response) => {
    res.json({msg: "Todos mis trámites:"})
})
//GET 
router.get("/misTramites/:id", (req: Request, res: Response) => {
    res.json({msg: "Trámite N° {id}: "})
})



//GET 
router.get("/misComunicaciones", (req: Request, res: Response) => {
    res.json({msg: "Mis comunicaciones:"})
})
//GET 
router.get("/misComunicaciones/:id", (req: Request, res: Response) => {
    res.json({msg: "Comunicación N° {id}:"})
})

export default router;