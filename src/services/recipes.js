import { RecipesCollection } from "../models/recipe.js";

export const getPublicRecipeById = async (recipeId) => {
  const recipe = await RecipesCollection.findById(recipeId)
    .populate("ingredients.ingredientId", "name") 
    .populate("categoryId", "name"); 
  return recipe;
};