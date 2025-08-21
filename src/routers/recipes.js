import { Router } from 'express';
import { createRecipeController } from '../controllers/recipes.js';
import { upload } from '../middlewares/multer.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import validateBody from '../utils/validateBody.js';



const recipesRouter = Router();

recipesRouter.post("/", upload.single('photo'), ctrlWrapper(createRecipeController)); 

export default recipesRouter;