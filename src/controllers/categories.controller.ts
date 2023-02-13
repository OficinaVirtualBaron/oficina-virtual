import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Category } from "../entities/Category";
import { updateCategorySchema } from "../validators/categorySchema";
export const categoryRepository = AppDataSource.getRepository(Category);

// POST
export const createCategory = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const category = new Category();
        category.title = title;
        category.description = description;
        await categoryRepository.save(category);
        res.status(200).send({ message: "Categoría creada exitosamente" });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// GET
export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryRepository.find({
            select: {
                id: true,
                title: true,
                description: true
            }
        });
        if (categories.length === 0) return res.status(404).send({ message: "No se encontraron categorías" });
        return res.json(categories);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// GET
export const getCategory = async (req: Request, res: Response) => {
    try {
        const category = await categoryRepository.findOne({
            where: {
                id: parseInt(req.params.id)
            },
            select: {
                id: true,
                title: true,
                description: true
            }
        });
        return res.json(category);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

// PUT
export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;
        const category = await categoryRepository.findOneBy({ id: parseInt(req.params.id) });
        if (!category) return res.status(404).send({ message: "La categoría no existe" });
        const updateValidation = await updateCategorySchema.validateAsync(req.body);
        category.title = title;
        await categoryRepository.save(category);
        return res.status(200).send({ message: "Datos de la categoría actualizados correctamente" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

// DELETE
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const result = await categoryRepository.delete({ id: parseInt(req.params.id) });
        if (result.affected === 0) {
            return res.status(404).json("Categoría no encontrada o incorrecta. Intente nuevamente")
        }
        return res.status(200).send({ message: "Categoría borrada de la DB correctamente" })
    } catch (error) {
        if (error instanceof Error) {
            return res.status(50).json({ message: error.message });
        }
    }
}