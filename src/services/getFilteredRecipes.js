import { RecipesCollection } from '../models/recipe.js';
// import { Types } from 'mongoose';

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
    const ingredientsArr =
      typeof ingredients === 'string' ? [ingredients] : ingredients;
    // .map((id) => id.trim())
    // .filter((id) => Types.ObjectId.isValid(id))
    // .map((id) => Types.ObjectId.createFromHexString(id));

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

  const pipeline = [
    { $match: filter },

    { $unwind: '$ingredients' },

    {
      $lookup: {
        from: 'ingredients',
        localField: 'ingredients._id',
        foreignField: '_id',
        as: 'ingredientsData',
      },
    },
    { $unwind: '$ingredientsData' },

    {
      $group: {
        _id: '$_id',
        title: { $first: '$title' },
        category: { $first: '$category' },
        owner: { $first: '$owner' },
        ingredients: {
          $push: {
            _id: '$ingredientsData._id',
            name: '$ingredientsData.name',
            measure: '$ingredients.measure',
          },
        },
        instructions: { $first: '$instructions' },
        description: { $first: '$description' },
        thumb: { $first: '$thumb' },
        time: { $first: '$time' },
        createdAt: { $first: '$createdAt' },
        updatedAt: { $first: '$updatedAt' },
        foodEnergy: { $first: '$foodEnergy' },
      },
    },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
  ];

  const recipes = await RecipesCollection.aggregate(pipeline);

  const totalPipeline = [{ $match: filter }, { $count: 'total' }];
  const totalResult = await RecipesCollection.aggregate(totalPipeline);
  const total = totalResult[0] ? totalResult[0].total : 0;

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
