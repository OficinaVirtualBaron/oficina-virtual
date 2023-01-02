import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { UserMuni } from "./entities/Muni";
import { Procedure } from "./entities/Procedure";
import dotenv from "dotenv";
import { Question_Option } from "./entities/Question_Option";
import { Question } from "./entities/Question";
import { Document } from "./entities/Document";
import { Category } from "./entities/Category";
import { Profile } from "./entities/Profile";
dotenv.config();

export const AppDataSource = new DataSource ({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: process.env.MYSQL_PASSW,
    port: 3306,
    database: "database-oficina",
    entities: [User, UserMuni, Procedure, Question, Question_Option, Document, Category, Profile],
    logging: true,
    synchronize: true
}) 