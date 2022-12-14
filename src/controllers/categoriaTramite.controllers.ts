import { Request, Response } from "express";
import { CategoriaTramite } from "../entities/CategoriaTramite";
import { createCategoriaTramiteSchema } from "../validators/validators";

// POST - cuando se cree una se tiene que hacer todo en mayúsculas
export const createCategoriaTramite = async (req: Request, res: Response) => {
    try {
        const {title, description} = req.body;
        const categoriaTramite = new CategoriaTramite();
        const result = await createCategoriaTramiteSchema.validateAsync(req.body);
        categoriaTramite.title = title;
        categoriaTramite.description = description;
        console.log(result);
        await categoriaTramite.save();
        return res.json(categoriaTramite);
    } catch (error) {
        if (error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

// GET 
export const getCategorias = async(req: Request, res: Response) => {
    try {
        const categoriasTramites = await CategoriaTramite.find();
        return res.json(categoriasTramites);
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({message: error.message});
        }
    }
}

// GET
export const getCategoria = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const categoriaTramite = await CategoriaTramite.findBy({id: parseInt(req.params.id)});
        return res.json(categoriaTramite);
    } catch (error) {
        if (error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

// PUT
export const updateCategoria = async (req: Request, res: Response) => {
    try {
        const {title, description} = req.body;
        const categoriaTramite = await CategoriaTramite.findOneBy({id: parseInt(req.params.id)});
        if (!categoriaTramite) return res.status(404).json("Categoria no encontrada");
        const result = await createCategoriaTramiteSchema.validateAsync(req.body);
        categoriaTramite.title = title;
        categoriaTramite.description = description;
        console.log(result);
        await categoriaTramite.save();
        return res.status(200).json("Datos de la categoria actualizados correctamente")
    } catch (error) {
        if (error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
} 

// DELETE
export const deleteCategoria = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const result = await CategoriaTramite.delete({id: parseInt(id)});
        if (result.affected === 0) {
            return res.status(404).json({message: "Categoría no encontrada"});
        }
        return res.status(200).json("Categoria borrada correctamente de la DB")
    } catch (error) {
        if (error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}