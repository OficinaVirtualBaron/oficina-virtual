"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const dotenv = require('dotenv');
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: process.env.MYSQL_PASSW,
    port: 3306,
    database: "typeormdb",
    entities: [User_1.User],
    logging: true,
    synchronize: true
});
