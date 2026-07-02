import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { ApiError } from '../utils/apiError';
import { env } from '../config/env';

/**
 * Global Error Handler Middleware.
 * Standardizes errors caught during route execution.
 */
export const errorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'An unexpected error occurred on the server.';
  let errors: unknown = undefined;

  // Handle custom ApiError
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  }
  // Handle Zod Schema Validation Errors
  else if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation failed.';
    // Zod 4 uses issues instead of errors
    errors = err.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
  }
  // Handle Prisma Database Client Errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002': { // Unique constraint violation
        statusCode = 409;
        const target = (err.meta?.target as string[]) || [];
        message = `A record with this ${target.join(', ')} already exists.`;
        break;
      }
      case 'P2025': // Record not found
        statusCode = 404;
        message = 'The requested record could not be found.';
        break;
      default:
        statusCode = 400;
        message = 'Database operation failed.';
        if (env.NODE_ENV === 'development') {
          errors = { code: err.code, meta: err.meta };
        }
        break;
    }
  }

  // Log error stack trace in development
  if (env.NODE_ENV === 'development') {
    console.error('🔴 Error details:', err);
  } else {
    console.error(`🔴 Error: ${err.name} - ${err.message}`);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(errors !== undefined && { errors }),
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
