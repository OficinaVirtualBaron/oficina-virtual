import { Request, Response } from "express";
import { userInfo } from "os";
import { Category } from "../entities/Category";
import { updateCategorySchema } from "../validators/validators";

// POST
export const createCategory = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;
        const category = new Category();
        category.title = title;
        const categorySaved = await category.save();
        res.status(200).send({message: "Categoría creada exitosamente"});
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// GET
export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        return res.json(categories);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// GET
export const getCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await Category.findBy({id: parseInt(req.params.id)});
        return res.json(category);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message});
        }
    }
}

// PUT
export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const category = await Category.findOneBy({id: parseInt(req.params.id)});
        if (!category) return res.status(404).send({message: "La categoría no existe"});
        const result = await updateCategorySchema.validateAsync(req.body);
        category.title = title;
        await category.save();
        return res.status(200).send({message: "Datos de la categoría actualizados correctamente"});
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({message: error.message});
        }
    }
}

// DELETE
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await Category.delete({id: parseInt(id)});
        if (result.affected === 0) {
            return res.status(404).json("Categoría no encontrada o incorrecta. Intente nuevamente")
        }
        return res.status(200).send({message: "Categoría borrada de la DB correctamente"})
    } catch (error) {
        if (error instanceof Error) {
            return res.status(50).json({message: error.message});
        }
    }
}