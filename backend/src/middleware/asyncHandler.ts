import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => Promise<void | Response>;

const asyncHandler = (fn: AsyncFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncHandler;