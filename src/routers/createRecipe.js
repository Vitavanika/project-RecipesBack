import { Router } from 'express';
import { createRecipeController } from '../controllers/createRecipe.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { parseFormDataArrays } from "../middlewares/parseFormDataArray.js";
import { upload } from '../middlewares/multer.js';
import { authenticate } from '../middlewares/authenticate.js';
import { createRecipeSchema } from '../validation/recipe.js';


const createRecipeRouter = Router();


createRecipeRouter.post("/", authenticate, upload.single('photo'), parseFormDataArrays, validateBody(createRecipeSchema), ctrlWrapper(createRecipeController)); 


export default createRecipeRouter;