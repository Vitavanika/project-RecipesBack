import { RecipesCollection } from '../models/recipe.js';
import { UsersCollection } from '../models/user.js';

export const getFavoritesRecipesService = async ({ page = 1, perPage = 12, userId }) => {
    const limit = perPage;
    const skip = page > 0 ? (page - 1) * perPage : 0;

    const allFavoritesRecipes = await UsersCollection.findById(userId, { favouriteRecipes: 1 });
    const totalFavorites = allFavoritesRecipes.favouriteRecipes.length;

    const paginationFavoriteRecipes = await UsersCollection.findById(userId, {
        favouriteRecipes: { $slice: [skip, limit] }
    }).lean();

    const favoritesRecipes = await RecipesCollection.find({
        _id: { $in: paginationFavoriteRecipes.favouriteRecipes }
    }).lean();

    const totalPages = Math.ceil(totalFavorites / perPage);

    return {
        hits: favoritesRecipes,
        page,
        perPage,
        totalItems: totalFavorites,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
        ...(favoritesRecipes.length === 0 && { message: 'No favorites recipes found' })

    };
}

