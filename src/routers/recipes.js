import { Router } from 'express';
import { getRecipeByIdController } from "../controllers/recipes.js";
import { isValidId } from '../middlewares/isValidId.js';
import ctrlWrapper  from '../utils/ctrlWrapper.js';

const recipesRouter = Router();

recipesRouter.get('/:id',isValidId, ctrlWrapper(getRecipeByIdController))

export default recipesRouter;