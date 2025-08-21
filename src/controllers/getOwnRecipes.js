import { parsePaginationParams } from "../utils/parsePaginationParams";
import { getOwnRecipes as getOwnRecipesService } from "../services/getOwnRecipes.js";

export const getOwnRecipes = async (req, res) => {
    const userId = req.user._id;

    const { page, perPage } = parsePaginationParams(req.query);

    const ownRecipes = await getOwnRecipesService({ page, perPage, userId });

    res.status(200).json({
        message: 'Own recipes retrieved successfully',
        data: {
            ownRecipes,
        },
    });
}