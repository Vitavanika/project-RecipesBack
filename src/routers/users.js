import { Router } from 'express';
import { getCurrentUserInfo } from '../controllers/users.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

router.get('/me', authenticate, getCurrentUserInfo);

export default router;
