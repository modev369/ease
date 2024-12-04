import { Request, Response, NextFunction } from 'express';
import { Result, ValidationError } from 'express-validator';

export const validateRequest = (
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  const errors: Result<ValidationError> = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path || 'unknown',
        message: err.msg
      }))
    });
  }
  
  next();
};