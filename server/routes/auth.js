import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validation.js';
import { auth } from '../middleware/auth.js';
import {
  register,
  login,
  getCurrentUser,
  updateProfile,
  changePassword
} from '../controllers/authController.js';

const router = express.Router();

// Validation rules
const registerValidation = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/).withMessage('Password must contain at least one special character'),
  body('role').isIn(['admin', 'provider', 'customer']).withMessage('Invalid role'),
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('phone').notEmpty().withMessage('Phone number is required')
];

const loginValidation = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/).withMessage('Password must contain at least one special character')
];

// Routes
router.post('/register', validate(registerValidation), register);
router.post('/login', validate(loginValidation), login);
router.get('/me', auth, getCurrentUser);
router.patch('/profile', auth, updateProfile);
router.post('/change-password', auth, validate(changePasswordValidation), changePassword);

export default router;