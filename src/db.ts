import { DataSource } from "typeorm";
import {User} from "./entities/User";
const dotenv = require('dotenv');
dotenv.config()

export const AppDataSource = new DataSource ({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: process.env.MYSQL_PASSW,
    port: 3306,
    database: "typeormdb",
    entities: [User],
    logging: true,
    synchronize: true
}) 