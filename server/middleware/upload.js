import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create storage directories if they don't exist
const createStorageDirectories = () => {
  const baseDir = 'storage';
  const mediaDir = path.join(baseDir, 'media');
  const categoriesDir = path.join(mediaDir, 'categories');
  const servicesDir = path.join(mediaDir, 'services');
  const usersDir = path.join(mediaDir, 'users');

  [baseDir, mediaDir, categoriesDir, servicesDir, usersDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

createStorageDirectories();

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.params.folder || 'misc';
    const uploadPath = path.join('storage/media', folder);
    
    // Create folder if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname.toLowerCase().replace(/\s+/g, '-'));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and GIF files are allowed.'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export default upload;