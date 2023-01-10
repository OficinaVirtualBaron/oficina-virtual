import { Request, Response } from "express";
import { ProcedureHistory } from "../entities/ProcedureHistory";
import { changeStatusValidator } from "../validators/validators";

// GET
export const getHistory = async (req: Request, res: Response) => {
    try {
        const history = await ProcedureHistory.find();
        if (history.length === 0) return res.status(404).send({message: "No hay historial de trámites aún"});
        return res.json(history);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// GET
export const getOneProcedureHistory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const procedureHistory = await ProcedureHistory.findOneByOrFail({id: parseInt(req.params.id)});
        return res.json(procedureHistory);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}


// PUT
export const changeStatusProcedure = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const procedureHistory = await ProcedureHistory.findOneBy({id: parseInt(req.params.id)});
        if (!procedureHistory) return res.status(404).send({message: "El trámite que quiere modificar no se encuentra en el historial"});
        await changeStatusValidator.validateAsync(req.body);
        procedureHistory.status = status;
        await procedureHistory.save();
        console.log(procedureHistory);
        return res.status(200).json({message: "Status del trámite actualizado correctamente", procedureHistory});
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}


// DELETE
export const deleteProcedureOfHistory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleteProcedure = await ProcedureHistory.delete({id: parseInt(id)});
        if (deleteProcedure.affected === 0) {
            return res.status(404).send({message: "Trámite no encontrado o ID incorrecto. Intente nuevamente"});
        }
        return res.status(200).send({message: "Trámite borrado del historial correctamente"});
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}