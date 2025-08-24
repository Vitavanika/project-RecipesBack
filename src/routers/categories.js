import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getCategories } from '../controllers/categories.js';

const router = Router();

router.get('/', ctrlWrapper(getCategories));

export default router;
