import { Request, Response } from "express";
import { Status } from "../entities/Status";
import { statusProcedure } from "../helpers/controllers/repository";

// POST
export const createStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;
        const newStatus = new Status();
        newStatus.status = status;
        if (status === "") {
            return res.status(405).send({message: "El campo status no puede quedar vacío. Completelo por favor"});
        }
        if(status === null) {
            return res.status(405).send({message: "El status no puede ser null"});
        }
        await statusProcedure.save(newStatus);
        return res.status(200).send({message: "Estado creado correctamente"});
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}