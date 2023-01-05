import "reflect-metadata";
import {AppDataSource} from "./db";
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
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// ROUTES
app.use("/auth", authRoutes);
app.use("/oficina", userRoutes);
app.use("/municipales", muniRoutes);
app.use("/oficina/categories", categoryRoutes);
app.use("/oficina/procedures", proceduresRoutes);
app.use("/oficina/questions", questionsRoutes);
app.use("/oficina/questions/options", optionsRoutes);
app.use("/", (req, res) => {
    res.send({message: "404 - Page Not found"});
});

// SERVER
async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Database connected - MySQL");
        app.listen(3000);
        console.log("Server on port", 3000);
    } catch (error) {
        console.log("Error. Connection to database lost");
        console.log(error);
    }
}
main();

