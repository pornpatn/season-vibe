import express from 'express';
import * as controller from './inventoryItem.controller';

const router = express.Router();

router.get('/', controller.getAllInventoryItems);
router.get('/:id', controller.getInventoryItemById);
router.post('/', controller.createInventoryItem);
router.put('/:id', controller.updateInventoryItem);
router.delete('/:id', controller.deleteInventoryItem);

export default router;