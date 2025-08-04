import { Router } from 'express';
import * as controller from './vendor.controller';

const router = Router();

router.get('/', controller.getVendors);
router.get('/:id', controller.getVendor);
router.post('/', controller.createVendor);
router.put('/:id', controller.updateVendor);
router.delete('/:id', controller.deleteVendor);

router.post('/:vendorId/contacts', controller.createVendorContact);
router.put('/:vendorId/contacts/:contactId', controller.updateVendorContact);
router.delete('/:vendorId/contacts/:contactId', controller.deleteVendorContact);

export default router;
