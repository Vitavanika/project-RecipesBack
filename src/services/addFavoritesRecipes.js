import { UsersCollection } from "../models/user.js";

export const addRecipeToFavorites = async ({ userId, recipeId }) => {
  const user = await UsersCollection.findById(userId);

  if (!user) throw new Error("User not found");

  const alreadyFavorited = user.favorites.includes(recipeId);
  if (alreadyFavorited) return user.favorites;

  user.favorites.push(recipeId);
  await user.save();

  return user.favorites;
};