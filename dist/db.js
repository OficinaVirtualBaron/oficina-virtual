"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const CategoriaTramite_1 = require("./entities/CategoriaTramite");
const dotenv_1 = __importDefault(require("dotenv"));
const Muni_1 = require("./entities/Muni");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: process.env.MYSQL_PASSW,
    port: 3306,
    database: "database-oficina",
    entities: [User_1.User, CategoriaTramite_1.CategoriaTramite, Muni_1.UserMuni],
    logging: true,
    synchronize: true
});
