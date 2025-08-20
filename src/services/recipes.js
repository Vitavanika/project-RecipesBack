import { RecipeCollection } from "../models/recipe";


export const createRecipe = async (payload) => {
  const recipe = await RecipeCollection.create(payload);
  return recipe;
};