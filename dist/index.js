"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const db_1 = require("./db");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const categoriasTramites_routes_1 = __importDefault(require("./routes/categoriasTramites.routes"));
const muni_routes_1 = __importDefault(require("./routes/muni.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
// MIDDLEWARES
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
// ROUTES
app.use("/auth", auth_routes_1.default);
app.use("/oficina", user_routes_1.default);
app.use("/categorias", categoriasTramites_routes_1.default);
app.use("/municipales", muni_routes_1.default);
// STARTING THE SERVER
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_1.AppDataSource.initialize();
            console.log("Database connected (Look MySQL)");
            app.listen(3000);
            console.log("Server is listening on port", 3000);
        }
        catch (error) {
            console.log("ERROR AQUI");
            console.log(error);
        }
    });
}
main();
