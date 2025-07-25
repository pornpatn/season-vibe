import express from 'express';

import inventoryItemRoutes from './inventoryItem.routes';
import categoryRoutes from './category.routes';
import unitRoutes from './unit.routes';
import inventoryPrepFormRoutes from './inventoryPrepForm.routes';
import inventoryLocationItemRoutes from './inventoryLocationItem.routes';
import parLevelRoutes from './inventoryParLevel.routes';

const router = express.Router();

router.use('/items', inventoryItemRoutes);
router.use('/categories', categoryRoutes);
router.use('/units', unitRoutes);
router.use('/prep-forms', inventoryPrepFormRoutes);
router.use('/location-items', inventoryLocationItemRoutes);
router.use('/par-levels', parLevelRoutes);

export default router;