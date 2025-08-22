import { Router } from 'express';
import { getIngredients } from '../controllers/ingredients.js';

const router = Router(); router.get('/', getIngredients);

export default router;