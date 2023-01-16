import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { UserMuni } from "./entities/Muni";
import { Procedure } from "./entities/Procedure";
import dotenv from "dotenv";
import { Question_Option } from "./entities/Question_Option";
import { Question } from "./entities/Question";
import { Document } from "./entities/Document";
import { Category } from "./entities/Category";
import { Status } from "./entities/Status";
import { Option } from "./entities/Option";
dotenv.config();

// DATABASE
export const AppDataSource = new DataSource ({
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
        Question_Option, 
        Document, 
        Category,
        Status,
        Option
    ],
    logging: true,
    synchronize: true
}) 