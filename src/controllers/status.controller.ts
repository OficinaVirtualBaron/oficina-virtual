import { Request, Response } from "express";
import { Status } from "../entities/Status";
import { createStatusValidator } from "../validators/validators";

// POST
export const createStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;
        const newStatus = new Status();
        await createStatusValidator.validateAsync(req.body);
        newStatus.status = status;
        const newStatusCreated = await newStatus.save();
        console.log(newStatusCreated);
        return res.status(200).send({message: "Estado creado correctamente"});
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}