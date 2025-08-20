import mongoose from "mongoose";
import createHttpError from 'http-errors';


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
    ownerId: req.owner.id, 
  };

  if (thumbUrl) payload.photo = thumbUrl;

  const recipe = await createRecipe(payload);

  res.status(201).json({
    status: 201,
    message: `Successfully created recipe!`,
    data: recipe,
  });
};