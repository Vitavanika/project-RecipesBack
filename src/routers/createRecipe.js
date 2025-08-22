import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { parseFormDataArrays } from "../middlewares/parseFormDataArray.js";
import { createRecipeController } from '../controllers/createRecipe.js';
import { upload } from '../middlewares/multer.js';
import { createRecipeSchema } from '../validation/recipe.js';
import validateBody from '../utils/validateBody.js';



const createRecipeRouter = Router();


createRecipeRouter.post("/", upload.single('photo'), parseFormDataArrays, validateBody(createRecipeSchema), ctrlWrapper(createRecipeController)); 


export default createRecipeRouter;