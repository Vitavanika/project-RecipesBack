import { Router } from 'express';
import { getRecipeByIdController } from "../controllers/recipes.js";
import { isValidId } from '../middlewares/isValidId.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { authenticate } from "../middlewares/authenticate.js";
import { getOwnRecipes } from '../controllers/getOwnRecipes.js';
import { getFavoritesRecipes } from "../controllers/getFavoritesRecipes.js";
import { getFilteredRecipes } from "../controllers/getFilteredRecipes.js";
import { removeRecipeFromFavorites } from "../controllers/removeRecipeFromFavorites.js";
import { upload } from '../middlewares/multer.js';
import { parseFormDataArrays } from "../middlewares/parseFormDataArray.js";
import validateBody from '../utils/validateBody.js';
import { createRecipeSchema } from '../validation/recipe.js';
import { createRecipeController } from '../controllers/createRecipe.js';
import { addRecipeToFavorites } from '../controllers/addFavoritesRecipes.js';

const recipesRouter = Router();

recipesRouter.get('/own', authenticate, ctrlWrapper(getOwnRecipes));
recipesRouter.get('/favorites', authenticate, ctrlWrapper(getFavoritesRecipes));
recipesRouter.get('/:id', isValidId, ctrlWrapper(getRecipeByIdController))
recipesRouter.get('/', ctrlWrapper(getFilteredRecipes));
recipesRouter.delete('/favorites', authenticate, ctrlWrapper(removeRecipeFromFavorites));
recipesRouter.post('/', authenticate, upload.single('photo'), parseFormDataArrays, validateBody(createRecipeSchema), ctrlWrapper(createRecipeController));
recipesRouter.post('/favorites', authenticate, ctrlWrapper(addRecipeToFavorites));

export default recipesRouter;