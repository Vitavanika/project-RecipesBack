import { parsePaginationParams } from "../utils/parsePaginationParams";
import { getFilteredRecipes as getFilteredRecipesService } from "../services/getFilteredRecipes.js";

export const getFilteredRecipes = async (req, res) => {

    const { page, perPage } = parsePaginationParams(req.query);

    const filters = req.query.filters ? JSON.parse(req.query.filters) : {};

    const filteredRecipes = await getFilteredRecipesService({ page, perPage, filters });

    res.status(200).json({
        message: 'Filtered recipes retrieved successfully',
        data: {
            filteredRecipes,
        },
    });
}