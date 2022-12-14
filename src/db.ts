import { DataSource } from "typeorm";
import { User } from "./entities/User";
import {CategoriaTramite} from "./entities/CategoriaTramite";
import dotenv from "dotenv";
import { UserMuni } from "./entities/Muni";
import { Tramite } from "./entities/Tramite";
dotenv.config();

export const AppDataSource = new DataSource ({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: process.env.MYSQL_PASSW,
    port: 3306,
    database: "database-oficina",
    entities: [User, CategoriaTramite, UserMuni, Tramite],
    logging: true,
    synchronize: true
}) 