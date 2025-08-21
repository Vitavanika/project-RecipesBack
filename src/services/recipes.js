import { RecipeCollection } from "../models/recipe.js";


export const createRecipe = async (payload) => {
  const recipe = await RecipeCollection.create(payload);
  return recipe;
};