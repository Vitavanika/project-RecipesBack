import { Router } from 'express';
import authRouter from './auth.js';
import recipesRouter from './recipes.js';
import categoriesRouter from './categories.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/recipes', recipesRouter);
router.use('/categories', categoriesRouter);

export default router;
