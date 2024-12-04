// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const protect = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ 
      message: 'No token, authorization denied' 
    });
  }

  try {
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || ''
    ) as TokenPayload;

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ 
      message: 'Token is not valid' 
    });
  }
};