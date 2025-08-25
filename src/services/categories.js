import { CategoriesCollection } from '../models/category.js';

export const getAllCategories = async () => {
  const items = await CategoriesCollection.find().lean();
  return items;
};