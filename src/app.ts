import express from "express"
import morgan from "morgan"
import cors from "cors"
import userRoutes from "./routes/user.routes";
import { Tramite } from "./entities/Tramite";
import { createTramite } from "./controllers/tramite.controller";

const app = express()

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(userRoutes)
app.use(createTramite);

export default app;