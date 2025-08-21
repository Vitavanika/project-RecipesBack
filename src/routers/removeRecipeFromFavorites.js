import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import removeRecipeFromFavorites from "../controllers/removeRecipeFromFavorites.js";
import authenticate from "../middlewares/authenticate.js";

const removeRecipeFromFavoritesRouter = Router();

removeRecipeFromFavoritesRouter.delete('/', authenticate, ctrlWrapper(removeRecipeFromFavorites));

export default removeRecipeFromFavoritesRouter;