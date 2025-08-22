import createHttpError from "http-errors";
import { getPublicRecipeById } from "../services/recipes.js";



export const getRecipeByIdController = async (req, res) => {
    const {id } = req.params; 
    const recipe = await getPublicRecipeById(id); 
    if (!recipe) {
     throw createHttpError(404, "Recipe not found");
    }

    res.json({
    status: 200,
    message: `Successfully found recipe with id ${id}!`,
    data: recipe,
  });
};

