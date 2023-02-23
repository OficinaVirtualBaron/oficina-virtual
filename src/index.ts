import "reflect-metadata";
import { AppDataSource } from "./db";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import muniRoutes from "./routes/muni.routes";
import authRoutes from "./routes/auth.routes";
import proceduresRoutes from "./routes/procedures.routes";
import categoryRoutes from "./routes/categories.routes";
import questionsRoutes from "./routes/question.routes";
import optionsRoutes from "./routes/questionOption.routes";
import statusRoutes from "./routes/status.routes";
const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARES
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ROUTES
app.use("/auth", authRoutes);
app.use("/api/status", statusRoutes); // solo admin
app.use("/oficina", userRoutes);
app.use("/municipales", muniRoutes);
app.use("/oficina/categories", categoryRoutes);
app.use("/oficina/procedures", proceduresRoutes);
app.use("/oficina/questions", questionsRoutes);
app.use("/oficina/questions/options", optionsRoutes);
app.get("/", (req, res) => {
    res.status(200).send("Home page - Bienvenido vecino");
});

// SERVER
async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Database connected - MySQL");
        app.listen(PORT);
        console.log("Server on port", PORT);
    } catch (error) {
        console.log("Error. Connection to database lost");
        console.log(error);
    }
}
main();

