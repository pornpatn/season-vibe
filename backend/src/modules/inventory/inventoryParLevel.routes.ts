import express from 'express';
import * as controller from './inventoryParLevel.controller';

const router = express.Router();

router.get('/', controller.getParLevels);
router.post('/', controller.setParLevels);
router.put('/:id', controller.updateParLevel);
router.delete('/:id', controller.deleteParLevel);

export default router;