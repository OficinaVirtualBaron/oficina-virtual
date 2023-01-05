import { Request, Response } from "express";
import { Procedure} from "../entities/Procedure";

// POST
export const createProcedure = async (req: Request, res: Response) => {
    try {
        const { title, user_id } = req.body;
        const procedure = new Procedure();
        procedure.title = title;
        procedure.user_id = user_id;
        const savedProcedure = await procedure.save();
        res.json(savedProcedure);
        console.log(savedProcedure);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// GET
export const getProcedures = async (req: Request, res: Response) => {
    try {
        const procedures = await Procedure.find();
        if (procedures.length === 0) return res.status(404).send({message: "No se encontraron trámites"});
        return res.json(procedures);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// GET
export const getProcedure = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const procedure = await Procedure.findOneByOrFail({id: parseInt(req.params.id)});
        return res.json(procedure);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// PUT 
export const updateProcedure = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, status } = req.body;
        const procedure = await Procedure.findOneBy({id: parseInt(req.params.id)});
        if (!procedure) return res.status(404).send({message: "El trámite no existe"});
        procedure.title = title;
        procedure.status = status;
        await procedure.save();
        return res.status(200).send({message: "Datos del trámite actualizados correctamente"});
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// DELETE
export const deleteProcedure = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleteProcedure = await Procedure.delete({id: parseInt(id)});
        if (deleteProcedure.affected === 0) {
            return res.status(404).send({message: "Trámite no encontrado o incorrecto. Intente nuevamente"})
        }
        return res.status(200).send({message: "Trámite borrado de la DB correctamente"});
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}