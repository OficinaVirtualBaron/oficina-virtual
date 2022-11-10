import express from "express"
import { engine } from 'express-handlebars';
import morgan from "morgan"
import cors from "cors"
import userRoutes from "./routes/user.routes";
import path from "path";
import bcrypt from "bcrypt"

const app = express()

// Settings
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.render("index")
})

// Handlebars
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs"
}));
app.set("view engine", ".hbs");

app.use(userRoutes)

export default app;