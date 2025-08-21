import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import { getFavoritesRecipes } from "../controllers/getFavoritesRecipes.js";
// import authenticate from "../middlewares/authenticate.js";

const favoritesRecepesRouter = Router();

favoritesRecepesRouter.get('/', ctrlWrapper(getFavoritesRecipes));

export default favoritesRecepesRouter;