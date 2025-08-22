import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { getFilteredRecipes as getFilteredRecipesService } from "../services/getFilteredRecipes.js";

export const getFilteredRecipes = async (req, res) => {

    const { page, perPage } = parsePaginationParams(req.query);

    const { category, ingredients, searchPhrase } = req.query;

    const filteredRecipes = await getFilteredRecipesService({ page, perPage, category, ingredients, searchPhrase });

    res.status(200).json({
        message: 'Filtered recipes retrieved successfully',
        data: {
            ...filteredRecipes
        },
    });
}