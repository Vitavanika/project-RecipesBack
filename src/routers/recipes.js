import { Router } from 'express';
import { getRecipeByIdController } from "../controllers/recipes.js";
import { isValidId } from '../middlewares/isValidId.js';
import ctrlWrapper  from '../utils/ctrlWrapper.js';
import { createRecipeController } from '../controllers/recipes.js';
import { upload } from '../middlewares/multer.js';

// import validateBody from '../utils/validateBody.js';



const recipesRouter = Router();

recipesRouter.get('/:id',isValidId, ctrlWrapper(getRecipeByIdController))

recipesRouter.post("/", upload.single('photo'), ctrlWrapper(createRecipeController)); 

export default recipesRouter;