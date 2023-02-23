import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { UserMuni } from "./entities/Muni";
import { Procedure } from "./entities/Procedure";
import dotenv from "dotenv";
import { QuestionOption } from "./entities/QuestionOption";
import { Question } from "./entities/Question";
import { Document } from "./entities/Document";
import { Category } from "./entities/Category";
import { Status } from "./entities/Status";
import { ProcedureHistory } from "./entities/ProcedureHistory";
import { QuestionHistory } from "./entities/QuestionHistory";
import { QuestionOptionHistory } from "./entities/QuestionOptionsHistory";
dotenv.config();
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const MYSQL_PASSW = process.env.MYSQL_PASSW;
export const DB_NAME = process.env.DB_NAME;

// DATABASE
export const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    username: DB_USER,
    password: MYSQL_PASSW,
    port: 3306,
    database: DB_NAME,
    entities: [
        User,
        UserMuni,
        Procedure,
        Question,
        QuestionOption,
        Document,
        Category,
        Status,
        ProcedureHistory,
        QuestionHistory,
        QuestionOptionHistory
    ],
    logging: true,
    synchronize: true
}) 