import express from 'express';
import { auth, checkRole } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import { uploadMedia, deleteMedia } from '../controllers/mediaController.js';

const router = express.Router();

// Upload media file
router.post('/upload/:folder?', auth, upload.single('file'), uploadMedia);

// Delete media file
router.delete('/:folder/:filename', auth, checkRole(['admin']), deleteMedia);

export default router;