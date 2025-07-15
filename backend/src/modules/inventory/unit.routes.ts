import express from 'express';
import * as controller from './unit.controller';

const router = express.Router();

router.get('/', controller.getAllUnits);
router.get('/:id', controller.getUnitById);
router.post('/', controller.createUnit);
router.put('/:id', controller.updateUnit);
router.delete('/:id', controller.deleteUnit);

export default router;