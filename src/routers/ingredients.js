import { Router } from 'express';
import { getIngredients } from '../controllers/ingredients.js';

const ingredientsRouter = Router();

ingredientsRouter.get('/', getIngredients);

export default ingredientsRouter;