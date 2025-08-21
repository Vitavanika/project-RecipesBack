import { removeRecipeFromFavorites as removeRecipeFromFavoritesService } from "../services/removeRecipeFromFavorites.js";

export const removeRecipeFromFavorites = async (req, res) => {
  const userId = req.user._id;
  const { recipeId } = req.params;

  if (!recipeId) {
    return res.status(400).json({ message: "Recipe ID is required" });
  }

  const favorites = await removeRecipeFromFavoritesService({ userId, recipeId });

  res.status(200).json({
    message: "Recipe removed from favorites successfully",
    data: {
      favorites,
    },
  });
};