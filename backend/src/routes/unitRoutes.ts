import express from 'express';
import { getUnits } from '../controllers/unitController'; 
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticateToken, getUnits);

export default router;