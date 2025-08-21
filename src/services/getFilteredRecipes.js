import { RecipesCollection } from '../models/recipe.js';
import { Types } from 'mongoose';

export const getFilteredRecipes = async ({
    page = 1,
    perPage = 12,
    category = null,
    ingredients = [],
    searchPhrase = '',
}) => {

    const filter = {};

    const limit = perPage;
    const skip = page > 0 ? (page - 1) * perPage : 0;

    if (category) {
        filter.category = category;
    }

    if (ingredients.length > 0) {
        filter["ingredients.ingredientId"] = {
            $in: ingredients.map(id => Types.ObjectId.createFromHexString(id))
        };
    }

    if (searchPhrase) {
        filter.$or = [
            { title: { $regex: searchPhrase, $options: 'i' } },
            { description: { $regex: searchPhrase, $options: 'i' } },
        ];
    }


    const recipesQuery = RecipesCollection.find({
        ...filter
    });

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