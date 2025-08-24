import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';

import { getEnvVariable } from './getEnvVariable.js';
import { CLOUDINARY } from '../constants.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVariable(CLOUDINARY.CLOUD_NAME),
  api_key: getEnvVariable(CLOUDINARY.API_KEY),
  api_secret: getEnvVariable(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};