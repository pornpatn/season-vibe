import express from 'express';

import categoryRoutes from './category.routes';
import unitRoutes from './unit.routes';
import locationRoutes from './location.routes';
import inventoryItemRoutes from './inventoryItem.routes';
import inventoryPrepFormRoutes from './inventoryPrepForm.routes';

const router = express.Router();

router.use('/categories', categoryRoutes);
router.use('/units', unitRoutes);
router.use('/locations', locationRoutes);
router.use('/items', inventoryItemRoutes);
router.use('/prep-forms', inventoryPrepFormRoutes);

export default router;