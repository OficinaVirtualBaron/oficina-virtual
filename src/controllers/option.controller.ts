import { Request, Response } from "express";
import { Option } from "../entities/Option";
import { createOptionSchema } from "../validators/validators";

// POST
export const createOption = async (req: Request, res: Response) => {
    const { title, enabled, question_option } = req.body;
    await createOptionSchema.validateAsync(req.body);
    try {
        try {
            const option = new Option();
            option.title = title;
            option.enabled = enabled;
            option.question_option = question_option;
            const savedOption = await option.save();
            return res.status(200).send({message: "Opción guardada", savedOption});
        } catch (error) {
            return res.send({message: "Error. Alguno de los campos es incorrecto o está vacío"});
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// GET
export const getOptions = async (req: Request, res: Response) => {
    try {
        const options = await Option.find();
        if (options.length === 0) return res.status(404).send({message: "No se encontraron opciones para este trámite"});
        return res.json(options);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// GET
// export const getOptionsOfProcedure = async (req: Request, res: Response) => {
//     const { question_option } = req.params;
//     try {
//         const options = await Option.findBy({question_option: parseInt(req.params.question_option)});
//         if (options.length === 0) {
//             return res.send({message: "No hay opciones para este trámite aún"});
//         }
//         return res.json(options);
//     } catch (error) {
//         if (error instanceof Error) {
//             return res.status(500).json({message: error.message});
//         }
//     }
// }

// GET
export const getOption = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const option = await Option.findOneByOrFail({id: parseInt(req.params.id)});
        return res.json(option);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// PUT 
export const updateOption = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const option = await Option.findOneBy({id: parseInt(req.params.id)});
        if (!option) return res.status(404).send({message: "El trámite no existe"});
        option.title = title;
        await option.save();
        return res.status(200).send({message: "Datos del trámite actualizados correctamente"});
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// DELETE
export const deleteOption = async (req: Request, res: Response ) => {
    const { id } = req.params;
    try {
        const deleteOption = await Option.delete({id: parseInt(req.params.id)});
        if (deleteOption.affected === 0) {
            return res.status(500).send({message: "Opción no encontrada o incorrecta. Intente nuevamnte"});
        }
        return res.status(200).send({message: "Trámite borrado de la DB correctamente"});
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}