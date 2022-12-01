import "reflect-metadata";
import {AppDataSource} from "./db";
import express from "express"
import morgan from "morgan"
import cors from "cors"
import userRoutes from "./routes/user.routes";
import categoriasRoutes from "./routes/categoriasTramites.routes";
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ROUTES
app.use("/oficina", userRoutes);
app.use(categoriasRoutes);

// STARTING THE SERVER
async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Database connected (Look MySQL)");
        app.listen(3000);
        console.log("Server is listening on port", 3000);
    } catch (error) {
        console.log("ERROR AQUI");
        console.log(error);
    }
}

main();

