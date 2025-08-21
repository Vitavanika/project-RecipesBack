import { Router } from 'express';
import filteredRecepesRouter from './filteredRecipes.js';
import ownRecipesRouter from './ownRecipes.js';
import favoritesRecepesRouter from './favoritesRecipes.js';
import { auth } from "../middlewares/auth.js";
import { getMyRecipes } from "../controllers/recipes.js";


const recipesRouter = Router();

recipesRouter.use('/', filteredRecepesRouter);
recipesRouter.use('/own', ownRecipesRouter);
recipesRouter.use('/favorites', favoritesRecepesRouter);
// Приватний ендпоінт
recipesRouter.get("/my", auth, getMyRecipes);

export default recipesRouter;