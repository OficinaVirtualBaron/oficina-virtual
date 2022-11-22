import { DataSource } from "typeorm";
const dotenv = require('dotenv');
dotenv.config()

export const AppDataSource = new DataSource ({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: process.env.MYSQL_PASSW,
    port: 3306,
    database: "users-database",
    entities: [],
    logging: true,
    synchronize: true
}) 