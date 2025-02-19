import { IUser } from '../src/models/types';

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Add user property, which is optional (it may or may not be available)
      files?:
        | Record<string, Express.Multer.File[]>
        | Express.Multer.File[]
        | undefined; // Add file property, which is optional (it may or may not be available)
    }
  }
}
