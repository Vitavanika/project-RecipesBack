import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import { getFilteredRecipes } from "../controllers/getFilteredRecipes.js";

const filteredRecepesRouter = Router();

filteredRecepesRouter.get('/', ctrlWrapper(getFilteredRecipes));

export default filteredRecepesRouter;