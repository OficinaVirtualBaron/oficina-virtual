"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.deleteUser = exports.updateUser = exports.getUsers = exports.createUser = void 0;
const User_1 = require("../entities/User");
// POST - CREATE NEW USER
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, email, cuil } = req.body;
        const user = new User_1.User();
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.cuil = cuil;
        yield user.save();
        return res.json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createUser = createUser;
// GET - GET USERS TABLE
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find();
        return res.json(users);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getUsers = getUsers;
// PUT - UPDATE USER
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname } = req.body;
        const { id } = req.params;
        const user = yield User_1.User.findOneBy({ id: parseInt(req.params.id) });
        if (!user)
            return res.status(404).json({ message: "User does not exists" });
        yield User_1.User.update({ id: parseInt(id) }, req.body);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.updateUser = updateUser;
// DELETE - DELETE ONE USER
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resultDelete = User_1.User.delete({ id: parseInt(id) });
        if ((yield resultDelete).affected == 0) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteUser = deleteUser;
// GET - GET USER BY ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.User.findOneBy({ id: parseInt(id) });
        res.json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.getUserById = getUserById;
