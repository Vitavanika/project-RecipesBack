import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper";
import addFavoritesRecipes from "../controllers/addFavoritesRecipes.js";
import authenticate from "../middlewares/authenticate.js";

const addFavoritesRecepesRouter = Router();

addFavoritesRecepesRouter.post('/', authenticate, ctrlWrapper(addFavoritesRecipes));

export default addFavoritesRecepesRouter;