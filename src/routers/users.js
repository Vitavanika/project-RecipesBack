import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { getCurrentUser } from '../controllers/users.js';

const router = Router();

// Приватний ендпоінт для отримання інформації про поточного користувача
router.get('/', authenticate, getCurrentUser);

export default router;
