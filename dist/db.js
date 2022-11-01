"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    username: "root",
    password: ".virtual!baron?!!pablo",
    port: 3306,
    database: "typeormdb",
    entities: [],
    logging: true
});
