import express from 'express';
import { auth, checkRole } from '../middleware/auth.js';
import {
  getAllReports,
  getUserReports,
  getReportById,
  createReport,
  updateReportStatus,
  deleteReport
} from '../controllers/reportController.js';

const router = express.Router();

// Admin routes
router.get('/all', auth, checkRole(['admin']), getAllReports);
router.patch('/:id/status', auth, checkRole(['admin']), updateReportStatus);
router.delete('/:id', auth, checkRole(['admin']), deleteReport);

// Protected routes
router.get('/', auth, getUserReports);
router.get('/:id', auth, getReportById);
router.post('/', auth, createReport);

export default router;