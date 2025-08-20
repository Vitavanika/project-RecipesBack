import createHttpError from 'http-errors';

export const notFoundHandler = (req, res, next) => {
  const error = createHttpError(404, 'Route not found');
  next(error);
};