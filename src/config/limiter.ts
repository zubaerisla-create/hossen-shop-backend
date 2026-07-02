import rateLimit from 'express-rate-limit';
import { env } from './env';

const isDev = env.NODE_ENV === 'development';

/**
 * Global rate limiter: Applies to all incoming requests by default.
 * Limits each IP to 100 requests per 15 minutes (relaxed to 10000 in development).
 */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: isDev ? 10000 : 100, // relaxed limit in dev
  standardHeaders: 'draft-7', // standard headers for rate limiting
  legacyHeaders: false, // Disable the X-RateLimit-* headers
  message: {
    success: false,
    status: 429,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
});

/**
 * Auth-specific rate limiter: More restrictive to prevent brute-force attacks.
 * Limits each IP to 10 authentication/checkout requests per 15 minutes (relaxed to 1000 in development).
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: isDev ? 1000 : 10, // relaxed limit in dev
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    status: 429,
    message: 'Too many authentication or checkout requests. Please try again after 15 minutes.',
  },
});
