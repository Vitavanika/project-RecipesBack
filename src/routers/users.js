import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import usersController from '../controllers/users.js';

const router = Router();

// GET /api/users - отримання інформації про поточного користувача
router.get('/', authenticate, usersController.getCurrentUser);

export default router;
