import express from 'express';
import {
  getInventoryCategories
} from '../controllers/inventoryCategoryController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticateToken, getInventoryCategories);

export default router;