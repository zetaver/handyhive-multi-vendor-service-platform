import express from 'express';
import { auth, checkRole } from '../middleware/auth.js';
import {
  getAllServices,
  getServicesByLocation,
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';

const router = express.Router();

// Public routes
router.get('/', getAllServices);
router.get('/nearby', getServicesByLocation);
router.get('/:id', getServiceById);

// Provider routes
router.post('/', auth, checkRole(['provider']), createService);
router.put('/:id', auth, checkRole(['provider']), updateService);
router.delete('/:id', auth, checkRole(['provider']), deleteService);

export default router;