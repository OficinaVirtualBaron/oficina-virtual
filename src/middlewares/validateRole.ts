import { verifyToken } from "../helpers/generateToken";
import { User } from "../entities/User";
import { Request, Response } from "express";
import { userInfo } from "os";

export const validateRole = async (req: Request, res: Response, roles: any) => {
    // try {
    //     const token = req.header("auth-header");
    //     const tokenData = await verifyToken(token);
    //     const userData = await User.findBy({id: parseInt(req.params.id)})
    // } catch (error) {
        
    // }
}