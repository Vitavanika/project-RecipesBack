import { RecipesCollection } from '../models/recipe.js';

export const getFavoritesRecipes = async (userId, page = 1, perPage = 12) => {
    const limit = perPage;
    const skip = page > 0 ? (page - 1) * perPage : 0;

    const filter = { favorites: userId };

    const recipesQuery = RecipesCollection.find(filter);

    const [total, recipes] = await Promise.all([
        RecipesCollection.countDocuments(filter),
        recipesQuery
            .skip(skip)
            .limit(limit)
            .exec(),
    ]);

    const totalPages = Math.ceil(total / perPage);

    return {
        data: recipes,
        page,
        perPage,
        totalItems: total,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages
    };
}

