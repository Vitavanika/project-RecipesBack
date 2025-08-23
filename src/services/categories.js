import Category from '../models/category.js';

export const getAllCategories = async () => {
  const items = await Category.find().lean();
  return items;
};