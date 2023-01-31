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
    host: "bfilpfqwntql84bh8g2z-mysql.services.clever-cloud.com",
    username: "uurwxwq1go11lwqj",
    password: "uurwxwq1go11lwqj",
    port: 3306,
    database: "bfilpfqwntql84bh8g2z-mysql.services.clever-cloud.com",
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