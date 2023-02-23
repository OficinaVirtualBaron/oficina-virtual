"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.DB_NAME = exports.MYSQL_PASSW = exports.DB_USER = exports.DB_HOST = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Muni_1 = require("./entities/Muni");
const Procedure_1 = require("./entities/Procedure");
const dotenv_1 = __importDefault(require("dotenv"));
const QuestionOption_1 = require("./entities/QuestionOption");
const Question_1 = require("./entities/Question");
const Document_1 = require("./entities/Document");
const Category_1 = require("./entities/Category");
const Status_1 = require("./entities/Status");
const ProcedureHistory_1 = require("./entities/ProcedureHistory");
const QuestionHistory_1 = require("./entities/QuestionHistory");
const QuestionOptionsHistory_1 = require("./entities/QuestionOptionsHistory");
dotenv_1.default.config();
exports.DB_HOST = process.env.DB_HOST;
exports.DB_USER = process.env.DB_USER;
exports.MYSQL_PASSW = process.env.MYSQL_PASSW;
exports.DB_NAME = process.env.DB_NAME;
// DATABASE
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: exports.DB_HOST,
    username: exports.DB_USER,
    password: exports.MYSQL_PASSW,
    port: 3306,
    database: exports.DB_NAME,
    entities: [
        User_1.User,
        Muni_1.UserMuni,
        Procedure_1.Procedure,
        Question_1.Question,
        QuestionOption_1.QuestionOption,
        Document_1.Document,
        Category_1.Category,
        Status_1.Status,
        ProcedureHistory_1.ProcedureHistory,
        QuestionHistory_1.QuestionHistory,
        QuestionOptionsHistory_1.QuestionOptionHistory
    ],
    logging: true,
    synchronize: true
});
