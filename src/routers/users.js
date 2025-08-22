import { Router } from 'express';
import { getCurrentUser } from '../controllers/users.js';
import { authenticate } from '../middlewares/authenticate.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const usersRouter = Router();

usersRouter.get('/me', authenticate, ctrlWrapper(getCurrentUser));

export default usersRouter;
