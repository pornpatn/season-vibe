import express from 'express';
import * as controller from './inventoryItem.controller';
import * as locationController from './inventoryLocation.controller';
import * as prepFormController from './inventoryPrepForm.controller';

const router = express.Router();

router.get('/', controller.getAllInventoryItems);
router.get('/:id', controller.getInventoryItemById);
router.post('/', controller.createInventoryItem);
router.put('/:id', controller.updateInventoryItem);
router.delete('/:id', controller.deleteInventoryItem);

// imventory location item * inventory par levels
router.post('/:itemId/locations', locationController.createInventoryLocation);
router.put('/:itemId/locations/:assignmentId', locationController.updateInventoryParLevels);
router.delete('/:itemId/locations/:assignmentId', locationController.deleteInventoryLocation);

// inventory prep form
router.get('/:itemId/prep-forms', prepFormController.getPrepFormsByItem);
router.post('/:itemId/prep-forms', prepFormController.createPrepForm);
router.put('/prep-forms/:id', prepFormController.updatePrepForm);
router.delete('/prep-forms/:id', prepFormController.deletePrepForm);

export default router;