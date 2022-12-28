import "reflect-metadata";
import {AppDataSource} from "./db";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import muniRoutes from "./routes/muni.routes";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/categories.routes"
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ROUTES
app.use("/auth", authRoutes)
app.use("/oficina", userRoutes);
app.use("/municipales", muniRoutes);
app.use("/oficina/categories", categoryRoutes)

// STARTING THE SERVER
async function main() {
    try {
        await AppDataSource.initialize();
        console.log("---------------------------------")
        console.log("Database connected - MySQL");
        app.listen(3000);
        console.log("Server is listening on port", 3000);
        console.log("---------------------------------");
    } catch (error) {
        console.log("Error. Connection to database lost");
        console.log(error);
    }
}
main();

