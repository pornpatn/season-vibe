import express from 'express';
import {
  signIn,
  logout,
  refreshToken,
  changePassword,
  resetPassword,
  getMe
} from '../controllers/authController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/signin', signIn);
router.post('/logout', logout);
router.post('/refresh', refreshToken);
router.post('/change-password', authenticateToken, changePassword);
router.post('/reset-password', authenticateToken, resetPassword);
router.get('/me', authenticateToken, getMe);

export default router;