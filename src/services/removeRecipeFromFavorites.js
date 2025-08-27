import { UsersCollection } from "../models/user.js";

export const removeRecipeFromFavorites = async ({ userId, recipeId }) => {
  const user = await UsersCollection.findById(userId);

  if (!user) throw new Error("User not found");

  if (!Array.isArray(user.favouriteRecipes)) {
    user.favouriteRecipes = [];
  }

  user.favouriteRecipes = user.favouriteRecipes.filter(
    (id) => id.toString() !== recipeId,
  );
  await user.save();

  return user.favouriteRecipes;
};