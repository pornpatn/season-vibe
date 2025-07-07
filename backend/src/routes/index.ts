import express from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import inventoryRoutes from './inventoryRoutes';

const router = express.Router();
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/inventory-items', inventoryRoutes);

export default router;