import 'dotenv/config';
import { createRecipe } from "../services/createRecipe.js";
import { getEnvVariable } from "../utils/getEnvVariable.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { saveFileToUploadDir } from "../utils/saveFileToUploadDir.js";


export const createRecipeController = async (req, res) => {
 let photoUrl = null;
  if (req.file) {
    if (getEnvVariable("ENABLE_CLOUDINARY") === "true") {
      photoUrl = await saveFileToCloudinary(req.file);
    } else {
      photoUrl = await saveFileToUploadDir(req.file);
    }
  }

  const payload = {
    ...req.body,           
    userId: req.user.id, 
  };

  if (photoUrl) payload.photo = photoUrl;

  const recipe = await createRecipe(payload);

  res.status(201).json({
    status: 201,
    message: `Successfully created recipe!`,
    data: recipe,
  });
};