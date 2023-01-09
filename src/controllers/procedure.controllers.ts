import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Procedure} from "../entities/Procedure";
import { createCategorySchema } from "../validators/validators";

// POST
export const createProcedure = async (req: Request, res: Response) => {
    try {
        const { title, category_id, description } = req.body;
        const procedure = new Procedure();
        await createCategorySchema.validateAsync(req.body);
        procedure.title = title;
        procedure.description = description;
        procedure.category_id = category_id;
        const savedProcedure = await procedure.save();
        res.json(savedProcedure);
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
export const getProcedureByCategory = async (req: Request, res: Response) => {
    try {
        const { category_id } = req.params;
        const procedures = await Procedure.findBy({category_id: parseInt(req.params.category_id)});
        if (procedures.length === 0) return res.send({message: "No hay trámites para esta categoría por el momento"});
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
        const { title } = req.body;
        const procedure = await Procedure.findOneBy({id: parseInt(req.params.id)});
        if (!procedure) return res.status(404).send({message: "El trámite no existe"});
        procedure.title = title;
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