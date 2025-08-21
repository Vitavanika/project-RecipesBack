import { IngredientsCollection } from '../models/ingredient.js';

export const getIngredients = async (req, res, next) => {
  try {
    const items = await IngredientsCollection
      .find({}, { name: 1 })
      .sort({ name: 1 })
      .lean();

    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};