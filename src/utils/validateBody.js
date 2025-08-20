import createHttpError from 'http-errors';

const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const httpError = createHttpError(400, 'Validation Error', {
      errors: error.details,
    });
    next(httpError);
  }
};

export default validateBody;
