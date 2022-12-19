"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Muni_1 = require("./entities/Muni");
const Tramite_1 = require("./entities/Tramite");
const Category_1 = require("./entities/Category");
const Customer_1 = require("./entities/Customer");
const Maker_1 = require("./entities/Maker");
const MakersTramites_1 = require("./entities/MakersTramites");
const dotenv_1 = __importDefault(require("dotenv"));
const MisTramites_1 = require("./entities/MisTramites");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: process.env.MYSQL_PASSW,
    port: 3306,
    database: "database-oficina",
    entities: [User_1.User, Muni_1.UserMuni, Tramite_1.Tramite, Category_1.Category, Customer_1.Customer, Maker_1.Maker, MakersTramites_1.MakerTramite, MisTramites_1.MiTramite],
    logging: true,
    synchronize: true
});
