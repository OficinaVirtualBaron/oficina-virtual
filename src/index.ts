import "reflect-metadata";
import {AppDataSource} from "./db";
import bcrypt from "bcrypt";

import express from "express"
import { engine } from 'express-handlebars';
import morgan from "morgan"
import cors from "cors"
import userRoutes from "./routes/user.routes";
import path from "path";

const app = express()

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Routes

// User routes
app.use(userRoutes)

// Starting the server
async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Database connected (Look DBeaver)");
        app.listen(3000);
        console.log("Server is listening on port", 3000);
    } catch (error) {
        console.log(error);
    }
}

main();

