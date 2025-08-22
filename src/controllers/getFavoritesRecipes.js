import { getFavoritesRecipesService } from "../services/getFavoritesRecipesServices.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";

export const getFavoritesRecipes = async (req, res) => {
    const userId = req.user._id;
    // const userId = "68a75c82ac0ecb984b2b2e79";
    let paginationParams;
    try {

        paginationParams = parsePaginationParams(req.query);
    } catch (error) {

        return res.status(400).json({
            message: 'Invalid pagination parameters',
            error: error.message,
        });
    }
    const { page, perPage } = paginationParams;
    let favorites;
    try {
        favorites = await getFavoritesRecipesService({ page, perPage, userId });

    } catch (error) {
        return res.status(500).json({
            message: 'Error retrieving favorite recipes',
            error: error.message,
        });
    }

    res.status(200).json({
        message: 'Favorites recipes retrieved successfully',
        data: {
            ...favorites
        },
    });
} 