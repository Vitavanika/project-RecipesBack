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

  const pageNum = Number(page) || 1;
  const limit = Number(perPage) || 12;
  const skip = pageNum > 0 ? (pageNum - 1) * limit : 0;

  if (category) {
    filter.category = category;
  }

  if (ingredients && ingredients.length > 0) {
    const ingredientsArr = (
      typeof ingredients === 'string' ? ingredients.split(',') : ingredients
    )
      .map((id) => id.trim())
      .filter((id) => Types.ObjectId.isValid(id))
      .map((id) => Types.ObjectId.createFromHexString(id));

    if (ingredientsArr.length > 0) {
      filter['ingredients._id'] = { $in: ingredientsArr };
    }
  }

  if (searchPhrase && searchPhrase.trim() !== '') {
    filter.$or = [
      { name: { $regex: searchPhrase, $options: 'i' } },
      { description: { $regex: searchPhrase, $options: 'i' } },
    ];
  }

  const recipesQuery = RecipesCollection.find(filter);

  const [total, recipes] = await Promise.all([
    RecipesCollection.countDocuments(filter),
    recipesQuery.skip(skip).limit(limit).exec(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    hits: recipes,
    page: pageNum,
    perPage: limit,
    totalItems: total,
    totalPages,
    hasPreviousPage: pageNum > 1,
    hasNextPage: pageNum < totalPages,
    ...(recipes.length === 0 && { message: 'No recipes found' }),
  };
};
