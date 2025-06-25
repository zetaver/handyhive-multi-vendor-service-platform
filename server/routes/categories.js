import express from 'express';
import { auth, checkRole } from '../middleware/auth.js';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deactivateCategory,
  deleteCategory
} from '../controllers/categoryController.js';

const router = express.Router();

// Public routes
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

// Admin only routes
router.post('/', auth, checkRole(['admin']), createCategory);
router.put('/:id', auth, checkRole(['admin']), updateCategory);
router.delete('/:id', auth, checkRole(['admin']), deactivateCategory);
router.delete('/:id/permanent', auth, checkRole(['admin']), deleteCategory);

export default router;