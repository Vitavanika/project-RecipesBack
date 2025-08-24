import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { getCurrentUser } from '../controllers/users.js';

const usersRouter = Router();

// Приватний ендпоінт для отримання інформації про поточного користувача
usersRouter.get('/', authenticate, getCurrentUser);

export default usersRouter;
