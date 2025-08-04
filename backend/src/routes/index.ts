import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import userRoutes from '../modules/users/user.routes';
import roleRoutes from '../modules/roles/role.routes';
import permissionRoutes from '../modules/permissions/permission.routes';
import inventoryRoutes from '../modules/inventory';
import vendorRoutes from '../modules/vendor/vendor.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/permissions', permissionRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/vendors', vendorRoutes);

export default router;
