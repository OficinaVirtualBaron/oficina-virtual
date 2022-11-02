import {Request, Response} from "express";
import {Tramite} from "../entities/Tramite";

// POST - CREATE NEW TRAMITE
export const createTramite = async (req: Request, res: Response) => {
    try {
        const {title, description} = req.body;
        const tramite = new Tramite();

        tramite.title = title;
        tramite.descripition = description;

        await tramite.save();
        return res.json(tramite);
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

// DELETE- DELETE TRAMITE ID
export const deleteTramite = async(req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const resultDelete = Tramite.delete({id: parseInt(id)});

        if((await resultDelete).affected == 0){
            return res.status(404).json({message: "Tramite not found, check ID"});
        }
        return res.sendStatus(204);
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

//Error en DELETE - DELETE TRAMITE ID (catchea el error)