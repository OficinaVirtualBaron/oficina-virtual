"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Muni_1 = require("./entities/Muni");
const Procedure_1 = require("./entities/Procedure");
const dotenv_1 = __importDefault(require("dotenv"));
const Question_Option_1 = require("./entities/Question_Option");
const Question_1 = require("./entities/Question");
const Document_1 = require("./entities/Document");
const Category_1 = require("./entities/Category");
const Profile_1 = require("./entities/Profile");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.MYSQL_PASSW,
    port: 3306,
    database: process.env.DB_NAME,
    entities: [
        User_1.User,
        Muni_1.UserMuni,
        Procedure_1.Procedure,
        Question_1.Question,
        Question_Option_1.Question_Option,
        Document_1.Document,
        Category_1.Category,
        Profile_1.Profile
    ],
    logging: true,
    synchronize: true
});
