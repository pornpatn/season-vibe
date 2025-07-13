import { Router } from 'express';
import {
  login,
  refreshToken,
  logout,
  changePassword,
  resetPassword,
  getMe
} from './auth.controller';
import { authenticate } from '../../middleware/authMiddleware';
import { authorize } from '../../middleware/authorize';

const router = Router();

// Public
router.post('/login', login);
router.post('/refresh-token', refreshToken);

// Authenticated
router.post('/logout', authenticate, logout);
router.post('/change-password', authenticate, changePassword);
router.post('/reset-password', authenticate, authorize('auth', 'reset-password'), resetPassword);
router.get('/me', authenticate, getMe);

export default router;
