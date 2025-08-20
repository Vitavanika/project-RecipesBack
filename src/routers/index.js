import { Router } from 'express';
import authRouter from './auth.js';
import recipesRouter from './recipes.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/recipes', recipesRouter);

export default router;
