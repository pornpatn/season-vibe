import express from 'express';
import * as controller from './category.controller';

const router = express.Router();

router.get('/', controller.getAllCategories);
router.get('/:id', controller.getCategoryById);
router.post('/', controller.createCategory);
router.put('/:id', controller.updateCategory);
router.delete('/:id', controller.deleteCategory);

export default router;