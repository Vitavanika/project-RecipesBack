import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper";
import getFavoritesRecipes from "../controllers/getFavoritesRecipes.js";
import authenticate from "../middlewares/authenticate.js";

const favoritesRecepesRouter = Router();

favoritesRecepesRouter.get('/', authenticate, ctrlWrapper(getFavoritesRecipes));

export default favoritesRecepesRouter;