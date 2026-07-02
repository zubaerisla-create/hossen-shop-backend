import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { ApiError } from '../utils/apiError';
import { prisma } from '../config/database';

/**
 * Interface extending Express Request to include the authenticated user info.
 */
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

/**
 * Middleware to authenticate requests using Supabase JWT.
 * Falls back to mock tokens in development if Supabase credentials are not configured.
 */
export const authenticate = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw ApiError.unauthorized('Access token is missing or invalid. Use Bearer token.');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw ApiError.unauthorized('Bearer token cannot be empty.');
    }

    // Developer Ergonomics: Support mock auth in development when Supabase is not yet configured
    if (!supabase) {
      if (token.startsWith('mock-admin-')) {
        req.user = {
          id: 'mock-admin-uuid',
          email: 'admin@hossenshop.com',
          role: 'admin',
        };
        return next();
      } else if (token.startsWith('mock-user-')) {
        req.user = {
          id: 'mock-user-uuid',
          email: 'customer@gmail.com',
          role: 'customer',
        };
        return next();
      }
      throw ApiError.unauthorized(
        'Supabase client not configured. Use a mock token (e.g. "mock-admin-123" or "mock-user-123") for development.'
      );
    }

    // Call Supabase API to retrieve user info for the token
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      throw ApiError.unauthorized('Invalid or expired authentication session.');
    }

    // Find or sync the user in our main PostgreSQL database
    let dbUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          email: user.email || '',
          name: user.user_metadata?.full_name || user.user_metadata?.name || null,
          role: 'customer', // Default role
        },
      });
    }

    req.user = {
      id: dbUser.id,
      email: dbUser.email,
      role: dbUser.role,
    };

    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Middleware to restrict access to administrators only.
 * Must be placed after the 'authenticate' middleware.
 */
export const requireAdmin = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.role !== 'admin') {
    return next(ApiError.forbidden('Administrator privileges are required to access this resource.'));
  }
  next();
};
