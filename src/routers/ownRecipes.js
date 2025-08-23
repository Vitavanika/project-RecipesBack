import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { getOwnRecipes } from '../controllers/getOwnRecipes.js';
import { authenticate } from '../middlewares/authenticate.js';

const ownRecipesRouter = Router();

ownRecipesRouter.get('/', authenticate, ctrlWrapper(getOwnRecipes));


export default ownRecipesRouter;