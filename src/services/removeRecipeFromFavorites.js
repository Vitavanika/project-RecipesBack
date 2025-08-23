import { UsersCollection } from "../models/user.js";

export const removeRecipeFromFavorites = async ({ userId, recipeId }) => {
  const user = await UsersCollection.findById(userId);

  if (!user) throw new Error("User not found");

  user.favorites = user.favorites.filter(id => id.toString() !== recipeId);
  await user.save();

  return user.favorites;
};