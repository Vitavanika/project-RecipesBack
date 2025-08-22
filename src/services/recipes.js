import { RecipesCollection } from "../models/recipe.js";

export const getPublicRecipeById = async (recipeId) => {
  const recipe = await RecipesCollection.findById(recipeId);
  return recipe;
};


