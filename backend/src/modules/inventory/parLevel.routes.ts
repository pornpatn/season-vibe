import express from 'express';
import * as controller from './parLevel.controller';

const router = express.Router();

router.get('/by-item/:itemId', controller.getParLevelsByItem);
router.post('/', controller.setParLevel);
router.delete('/:itemId/:dayOfWeek', controller.deleteParLevel);

export default router;