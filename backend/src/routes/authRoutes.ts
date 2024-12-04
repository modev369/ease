// src/routes/authRoutes.ts
import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController';
import { validateRequest } from '../middleware/validationMiddleware';

const router = express.Router();

router.post('/register', [
  body('username')
    .trim()
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], validateRequest, register);

router.post('/login', [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required')
], validateRequest, login);

export default router;