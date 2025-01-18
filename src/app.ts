/* eslint-disable @typescript-eslint/no-unused-vars */
import express, {
  Application,
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { z } from 'zod';
import { logRequest } from './middlewares';
import {
  userRoutes,
  classroomRoutes,
  subjectRoutes,
  assessmentRoutes,
  assessmentCriteriaRoutes,
} from './routes/index';
import ApiError from './utils/apiError';

// Create and configure the application
const createApp = (): Application => {
  const app: Application = express();

  // 1. Configure middleware
  configureMiddleware(app);

  // 2. Setup routes
  setupRoutes(app);

  // 3. Configure error handling
  configureErrorHandling(app);

  return app;
};

// Configure middleware
const configureMiddleware = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
  }

  // Custom logging middleware
  app.use(logRequest);
};

// Setup routes
const setupRoutes = (app: Application) => {
  const router = Router();

  // Add routes
  userRoutes(router);
  classroomRoutes(router);
  subjectRoutes(router);
  assessmentRoutes(router);
  assessmentCriteriaRoutes(router);

  // Mount the router
  app.use('/api', router);
};

// Configure error handling
const configureErrorHandling = (app: Application) => {
  // Fallback for unmatched routes
  app.use('*', (req: Request, res: Response) => {
    res.status(404).json({ message: 'Route not found' });
    return;
  });

  // Global error-handling middleware
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    const customError = error as ApiError;
    const statusCode = customError.statusCode || 500;
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      res.status(400).json({
        statusCode: 400,
        message: 'Validation errors occurred.',
        errors: error.errors.map((err) => ({
          field: err.path[0], // Extract the field name
          message: err.message, // Use the provided error message
        })),
        timestamp: new Date().toISOString(), // Add timestamp
      });
      return;
    }
    // Handle other errors
    res.status(statusCode).json({
      message: customError.message,
      statusCode,
      timestamp: new Date().toISOString(),
    });
    return;
  });
};

// Export the configured application
export default createApp();
