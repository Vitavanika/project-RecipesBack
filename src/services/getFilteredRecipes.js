import { RecipesCollection } from '../models/recipe.js';
import { Types } from 'mongoose';

export const getFilteredRecipes = async ({
    page = 1,
    perPage = 12,
    category,
    ingredients = [],
    searchPhrase,
}) => {

    const filter = {};

    const limit = perPage;
    const skip = page > 0 ? (page - 1) * perPage : 0;

    if (category) {
        filter.categoryId = category;
    }

    if (ingredients && ingredients.length > 0) {
        const ingredientsArr = (typeof ingredients === 'string' ? ingredients.split(',') : ingredients)
            .map(id => id.trim())
            .filter(Boolean);

        filter["ingredients.ingredientId"] = {
            $in: ingredientsArr.map(id => Types.ObjectId.createFromHexString(id))
        };
    }

    if (searchPhrase) {
        filter.$or = [

            { name: { $regex: searchPhrase, $options: 'i' } },

            { description: { $regex: searchPhrase, $options: 'i' } },
        ];
    }

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
        hits: recipes,
        page,
        perPage,
        totalItems: total,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
        ...(recipes.length === 0 && { message: 'No recipes found' })
    };
}