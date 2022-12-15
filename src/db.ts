import { DataSource } from "typeorm";
import { User } from "./entities/User";
import dotenv from "dotenv";
import { UserMuni } from "./entities/Muni";
import { Tramite } from "./entities/Tramite";
import { Category } from "./entities/Category";
import { Customer } from "./entities/Customer";
import { Maker } from "./entities/Maker";
import { MakerTramite } from "./entities/MakersTramites";
dotenv.config();

export const AppDataSource = new DataSource ({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: process.env.MYSQL_PASSW,
    port: 3306,
    database: "database-oficina",
    entities: [User, UserMuni, Tramite, Category, Customer, Maker, MakerTramite],
    logging: true,
    synchronize: true
}) 