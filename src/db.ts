import { DataSource } from "typeorm";
import { User } from "./entities/User";
import {CategoriaTramite} from "./entities/CategoriaTramite";
import dotenv from "dotenv";
dotenv.config()

export const AppDataSource = new DataSource ({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: process.env.MYSQL_PASSW,
    port: 3306,
    database: "users-database",
    entities: [User, CategoriaTramite],
    logging: true,
    synchronize: true
}) 