import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { AuthService } from '../services/authService';

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  // Login method
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      
      if (result.success) {
        res.status(200).json({
          message: 'Login successful',
          token: result.token
        });
      } else {
        res.status(401).json({
          message: 'Invalid credentials'
        });
      }
    } catch (error) {
      logger.error('Login error', error);
      next(error);
    }
  }

  // Register method
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;
      const result = await this.authService.register(userData);
      
      if (result.success) {
        res.status(201).json({
          message: 'Registration successful',
          userId: result.userId
        });
      } else {
        res.status(400).json({
          message: 'Registration failed',
          errors: result.errors
        });
      }
    } catch (error) {
      logger.error('Registration error', error);
      next(error);
    }
  }

  // Reset Password method
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, newPassword } = req.body;
      const result = await this.authService.resetPassword(email, newPassword);
      
      if (result.success) {
        res.status(200).json({
          message: 'Password reset successful'
        });
      } else {
        res.status(400).json({
          message: 'Password reset failed',
          errors: result.errors
        });
      }
    } catch (error) {
      logger.error('Password reset error', error);
      next(error);
    }
  }

  // Verify Token method
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({
          message: 'No token provided'
        });
      }

      const result = await this.authService.verifyToken(token);
      
      if (result.valid) {
        res.status(200).json({
          message: 'Token is valid',
          user: result.user
        });
      } else {
        res.status(401).json({
          message: 'Invalid or expired token'
        });
      }
    } catch (error) {
      logger.error('Token verification error', error);
      next(error);
    }
  }
}

// Create and export an instance with dependency injection
export default new AuthController(new AuthService());