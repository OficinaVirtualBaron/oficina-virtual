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

// DATABASE
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.MYSQL_PASSW,
    port: 3306,
    database: process.env.DB_NAME,
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