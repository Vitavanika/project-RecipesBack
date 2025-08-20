import { Router } from 'express';
import filteredRecepesRouter from './filteredRecipes.js';
import ownRecipesRouter from './ownRecipes.js';
import favoritesRecepesRouter from './favoritesRecipes.js';


const recipesRouter = Router();

recipesRouter.use('/', filteredRecepesRouter);
recipesRouter.use('/own', ownRecipesRouter);
recipesRouter.use('/favorites', favoritesRecepesRouter);


export default recipesRouter;