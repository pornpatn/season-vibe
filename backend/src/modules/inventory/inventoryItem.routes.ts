import express from 'express';
import * as controller from './inventoryItem.controller';
import * as locationController from './inventoryLocation.controller';

const router = express.Router();

router.get('/', controller.getAllInventoryItems);
router.get('/:id', controller.getInventoryItemById);
router.post('/', controller.createInventoryItem);
router.put('/:id', controller.updateInventoryItem);
router.delete('/:id', controller.deleteInventoryItem);

router.post('/:itemId/locations', locationController.createInventoryLocation);
router.put('/:itemId/locations/:assignmentId', locationController.updateInventoryParLevels);
router.delete('/:itemId/locations/:assignmentId', locationController.deleteInventoryLocation);

export default router;