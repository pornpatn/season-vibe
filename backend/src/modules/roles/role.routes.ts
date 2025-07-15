import { Router } from 'express';
import {
  listRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from './role.controller';
import { authenticate } from '../../middleware/authMiddleware';
import { authorize } from '../../middleware/authorize';

const router = Router();

router.use(authenticate);

router.get('/', authorize('roles', 'view'), listRoles);
router.get('/:id', authorize('roles', 'view'), getRoleById);
router.post('/', authorize('roles', 'create'), createRole);
router.put('/:id', authorize('roles', 'edit'), updateRole);
router.delete('/:id', authorize('roles', 'delete'), deleteRole);

export default router;