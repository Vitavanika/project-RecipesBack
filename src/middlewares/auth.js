import jwt from 'jsonwebtoken';
import { createError } from 'http-errors';

export const authenticate = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw createError(401, 'Not authorized');
    }

    const { id } = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default-secret',
    );

    // заглушка
    req.user = { _id: id, email: 'user@example.com', name: 'User' };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(createError(401, 'Not authorized'));
    } else {
      next(error);
    }
  }
};
