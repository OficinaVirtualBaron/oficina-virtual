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
app.get("/", (req, res) => {
    res.render("index")
})

// User routes
app.use(userRoutes)

// Handlebars
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs"
}));
app.set("view engine", ".hbs");

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

