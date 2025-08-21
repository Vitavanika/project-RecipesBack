import createHttpError from "http-errors";
import { getPublicRecipeById } from "../services/recipes.js";
import 'dotenv/config';
import { createRecipe } from "../services/recipes.js";
import { getEnvVariable } from "../utils/getEnvVariable.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";


export const getRecipeByIdController = async (req, res) => {
    const {id } = req.params; 
    const recipe = await getPublicRecipeById(id); 
    if (!recipe) {
     throw createHttpError(404, "Recipe not found");
    }

    res.json({
    status: 200,
    message: `Successfully found recipe with id ${id}!`,
    data: recipe,
  });
};



export const createRecipeController = async (req, res) => {
 let thumbUrl = null;
  if (req.file) {
    if (getEnvVariable("ENABLE_CLOUDINARY") === "true") {
      thumbUrl = await saveFileToCloudinary(req.file);
    } else {
      thumbUrl = await saveFileToUploadDir(req.file);
    }
  }

  const payload = {
    ...req.body,           
    // ownerId: req.owner.id, 
  };

  if (thumbUrl) payload.photo = thumbUrl;

  const recipe = await createRecipe(payload);

  res.status(201).json({
    status: 201,
    message: `Successfully created recipe!`,
    data: recipe,
  });
};