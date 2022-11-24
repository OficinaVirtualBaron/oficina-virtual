import "reflect-metadata";
import {AppDataSource} from "./db";
import express from "express"
import morgan from "morgan"
import cors from "cors"

import userRoutes from "./routes/user.routes";
import categoriasRoutes from "./routes/categoriasTramites.routes";

const app = express()

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes

// User routes
app.use(userRoutes);
app.use(categoriasRoutes);

// Starting the server
async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Database connected (Look MySQL)");
        app.listen(3000);
        console.log("Server is listening on port", 3000);
    } catch (error) {
        console.log("error aqui")
        console.log(error);
    }
}

main();

