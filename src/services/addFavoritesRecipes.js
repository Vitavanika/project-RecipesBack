import { UsersCollection } from '../models/user.js';

export const addRecipeToFavorites = async ({ userId, recipeId }) => {
  const user = await UsersCollection.findById(userId);

  if (!user) throw new Error('User not found');

  if (!Array.isArray(user.favouriteRecipes)) {
    user.favouriteRecipes = [];
  }

  const alreadyFavorited = user.favouriteRecipes.includes(recipeId);
  if (alreadyFavorited) return user.favouriteRecipes;

  user.favouriteRecipes.push(recipeId);
  await user.save();

  return user.favouriteRecipes;
};
