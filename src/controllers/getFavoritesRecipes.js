import { getFavoritesRecipes as getFavoritesRecipesService } from "../services/getFavoritesRecipes.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";

export const getFavoritesRecipes = async (req, res) => {
    const userId = req.user._id;

    const { page, perPage } = parsePaginationParams(req.query);

    const favorites = await getFavoritesRecipesService({ page, perPage, userId });

    res.status(200).json({
        message: 'Favorites recipes retrieved successfully',
        data: {
            favorites,
        },
    });
}