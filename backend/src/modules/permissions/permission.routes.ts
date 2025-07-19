import { Router } from 'express';
import {
  listPermissions,
  getPermissionById,
  createPermission,
  deletePermission,
  listPermissionsByRole,
  updateRolePermissions,
} from './permission.controller';
import { authenticate } from '../../middleware/authMiddleware';
import { authorize } from '../../middleware/authorize';

const router = Router();

router.use(authenticate);

router.get('/', authorize('permissions', 'view'), listPermissions);
router.get('/:id', authorize('permissions', 'view'), getPermissionById);
router.post('/', authorize('permissions', 'create'), createPermission);
router.delete('/:id', authorize('permissions', 'delete'), deletePermission);
router.get('/role/:roleId', authorize('permissions', 'view'), listPermissionsByRole);
router.post('/role/:roleId', authorize('permissions', 'edit'), updateRolePermissions);

export default router;