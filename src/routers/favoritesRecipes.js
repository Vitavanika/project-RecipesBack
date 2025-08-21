import { Router } from "express";
import { getFavoritesRecipes } from "../controllers/getFavoritesRecipes.js";
import { authenticate } from "../middlewares/authenticate.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const favoritesRecipesRouter = Router();

favoritesRecipesRouter.get('/', authenticate, ctrlWrapper(getFavoritesRecipes));

export default favoritesRecipesRouter;