import "reflect-metadata";
import app from "./app";
import {AppDataSource} from "./db";
import bcrypt from "bcrypt";

// Starting the server
async function main() {
    try {
        await AppDataSource.initialize();
        console.log("Database connected (Look DBeaver or MySQL)");
        app.listen(3000);
        console.log("Server is listening on port", 3000);
    } catch (error) {
        console.log(error);
    }
}

main();

