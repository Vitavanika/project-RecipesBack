import { RecipesCollection } from '../models/recipe.js';

export const getOwnRecipes = async ({
    page = 1,
    perPage = 12,
    userId,
}) => {

    const limit = perPage;
    const skip = page > 0 ? (page - 1) * perPage : 0;

    const recipesQuery = RecipesCollection.find({ userId: userId });
    const [total, recipes] = await Promise.all([
        RecipesCollection.countDocuments({ userId: userId }),
        recipesQuery
            .skip(skip)
            .limit(limit)
            .exec(),
    ]);
    const totalPages = Math.ceil(total / perPage);

    return {
        hits: recipes,
        page,
        perPage,
        totalItems: total,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
        ...(recipes.length === 0 && { message: 'No own recipes found' })
    }
}