import { Recipe } from '../models/recipe.js';

export const getFilteredRecipes = async ({
    page = 1,
    perPage = 10,
    filters = {
        category: null,
        ingredients: [],
        searchPhrase: '',
    },
}) => {
    const limit = perPage;
    const skip = page > 0 ? (page - 1) * perPage : 0;


    const [total, recipes] = await Promise.all([
        Recipe.find().merge(contactsQuery).countDocuments(),
        contactsQuery
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