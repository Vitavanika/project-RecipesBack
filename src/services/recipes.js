import { Recipe } from "../models/recipe.js";

export const getPublicRecipeById = async (recipeId) => {
  const recipe = await Recipe.findById(recipeId);
  return recipe;
};