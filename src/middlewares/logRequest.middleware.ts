import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/apiError';

// Log the request
export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  try {
    const clientIp = req.ip || req.headers['x-forwarded-for'];
    console.log(
      `${clientIp} - ${req.method} - ${req.url} - ${new Date().toISOString()}`
    );
    next();
  } catch {
    return next(new ApiError(500, 'Something went wrong!!'));
  }
};
