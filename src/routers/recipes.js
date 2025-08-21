import { Router } from 'express';
import filteredRecepesRouter from './filteredRecipes.js';
import ownRecipesRouter from './ownRecipes.js';
import favoritesRecepesRouter from './favoritesRecipes.js';
import { getRecipeByIdController } from "../controllers/recipes.js";
import { isValidId } from '../middlewares/isValidId.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';


const recipesRouter = Router();

recipesRouter.get('/:id', isValidId, ctrlWrapper(getRecipeByIdController))

recipesRouter.use('/', filteredRecepesRouter);
recipesRouter.use('/own', ownRecipesRouter);
recipesRouter.use('/favorites', favoritesRecepesRouter);

export default recipesRouter;