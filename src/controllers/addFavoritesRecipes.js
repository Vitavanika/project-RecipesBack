import { addRecipeToFavorites as addRecipeToFavoritesService } from "../services/addFavoritesRecipes.js";

export const addRecipeToFavorites = async (req, res) => {
  const userId = req.user._id;
  const { recipeId } = req.params;

  if (!recipeId) {
    return res.status(400).json({ message: "Recipe ID is required" });
  }

  const favorites = await addRecipeToFavoritesService({ userId, recipeId });

  res.status(200).json({
    message: "Recipe added to favorites successfully",
    data: {
      favorites,
    },
  });
};