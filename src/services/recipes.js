import { RecipesCollection } from '../models/recipe.js';

export const getPublicRecipeById = async (recipeId) => {
  const recipe = await RecipesCollection.findById(recipeId).populate({
    path: 'ingredients._id',
    model: 'ingredients',
  });
  return recipe;
};
