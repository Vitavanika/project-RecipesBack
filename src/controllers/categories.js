import { getAllCategories } from '../services/categories.js';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategories();

    res.status(200).json({
      status: 200,
      message: 'Successfully found categories!',
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};
