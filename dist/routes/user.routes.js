"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validateToken_1 = require("../middlewares/validateToken");
const router = (0, express_1.Router)();
// GET 
router.get("/users", validateToken_1.TokenValidator, user_controller_1.getUsers);
// GET 
router.get("/users/:id", validateToken_1.TokenValidator, user_controller_1.getUser);
// UPDATE 
router.put("/updateUser/:id", validateToken_1.TokenValidator, user_controller_1.updateUser);
// DELETE 
router.delete("/deleteUser/:id", validateToken_1.TokenValidator, user_controller_1.deleteUser);
// RUTAS DE TRAMITES
// GET 
router.get("/home", (req, res) => {
    res.json({ msg: "Home Page" });
});
// GET 
router.get("/inicio", (req, res) => {
    res.json({ msg: "Página de inicio" });
});
// POST 
router.get("/tramites/transito", (req, res) => {
    res.json({ msg: "Trámites del área de tránsito:" });
});
// POST 
router.get("/tramites/transito/:id", (req, res) => {
    res.json({ msg: "Trámite para pago de multas" });
});
// POST 
router.get("/tramites/rentas", (req, res) => {
    res.json({ msg: "Trámites del área de rentas:" });
});
// POST 
router.get("/tramites/rentas/:id", (req, res) => {
    res.json({ msg: "Trámite para consultar deudas" });
});
//GET 
router.get("/misTramites", (req, res) => {
    res.json({ msg: "Todos mis trámites:" });
});
//GET 
router.get("/misTramites/:id", (req, res) => {
    res.json({ msg: "Trámite N° {id}: " });
});
//GET 
router.get("/misComunicaciones", (req, res) => {
    res.json({ msg: "Mis comunicaciones:" });
});
//GET 
router.get("/misComunicaciones/:id", (req, res) => {
    res.json({ msg: "Comunicación N° {id}:" });
});
exports.default = router;
