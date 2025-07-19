import express from 'express';
import * as controller from './inventoryLocationItem.controller';

const router = express.Router();

router.get('/by-location/:locationId', controller.getLocationItemsByLocation);
router.post('/', controller.addLocationItem);
router.delete('/:id', controller.removeLocationItem);

export default router;
