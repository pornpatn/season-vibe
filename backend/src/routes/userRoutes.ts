import express from 'express';
import { getUsers, createUser } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', authenticateToken, getUsers);
router.post('/', authenticateToken, createUser);

export default router;