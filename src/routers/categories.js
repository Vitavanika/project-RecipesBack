import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { getCategories } from '../controllers/categories.js';

const categoriesRouter = Router();

categoriesRouter.get('/', ctrlWrapper(getCategories));

export default categoriesRouter;
