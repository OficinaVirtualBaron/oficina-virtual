import { Request, Response, NextFunction } from "express";
import { User } from "../entities/User";


export const isAdminRole = async(req: Request, res: Response, next: NextFunction) => {
    let id:any = req.body.id;
    const user = req.body.id;
    if (user.role != "ADMIN_ROLE"){
        return res.status(401).json("Usted no posee admin. Sali de aca gato")
    }
    next();
}