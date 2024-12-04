// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
  message: string;
  stack?: string;
}

export const errorHandler = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  const errorResponse: ErrorResponse = {
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  console.error(`Error: ${err.message}`);

  res.status(statusCode).json(errorResponse);
};