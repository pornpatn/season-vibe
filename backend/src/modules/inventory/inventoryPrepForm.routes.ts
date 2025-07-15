import express from 'express';
import * as controller from './inventoryPrepForm.controller';

const router = express.Router();

router.get('/by-item/:itemId', controller.getPrepFormsByItem);
router.get('/:id', controller.getPrepFormById);
router.post('/', controller.createPrepForm);
router.put('/:id', controller.updatePrepForm);
router.delete('/:id', controller.deletePrepForm);

export default router;