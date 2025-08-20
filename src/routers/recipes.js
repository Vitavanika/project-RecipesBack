import { Router } from 'express';
import { createRecipeController } from '../controllers/recipes';
import { upload } from '../middlewares/multer.js';


const recipesRouter = Router();

recipesRouter.post("/", upload.single('photo'), validateBody(createRecipeSchema), ctrlWrapper(createRecipeController)); 

export default recipesRouter;