// src/middleware/loggerMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export const requestLogger = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
};