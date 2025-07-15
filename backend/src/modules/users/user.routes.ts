import { Router } from 'express';
import {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changeUserStatus,
} from './user.controller';
import { authenticate } from '../../middleware/authMiddleware';
import { authorize } from '../../middleware/authorize';

const router = Router();

router.use(authenticate);

router.get('/', authorize('users', 'view'), listUsers);
router.get('/:id', authorize('users', 'view'), getUserById);
router.post('/', authorize('users', 'create'), createUser);
router.put('/:id', authorize('users', 'edit'), updateUser);
router.delete('/:id', authorize('users', 'delete'), deleteUser);
router.patch('/:id/status', authorize('users', 'edit'), changeUserStatus);

export default router;