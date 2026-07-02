/**
 * Global rate limiter: Applies to all incoming requests by default.
 * Limits each IP to 100 requests per 15 minutes (relaxed to 10000 in development).
 */
export declare const globalLimiter: import("express-rate-limit").RateLimitRequestHandler;
/**
 * Auth-specific rate limiter: More restrictive to prevent brute-force attacks.
 * Limits each IP to 10 authentication/checkout requests per 15 minutes (relaxed to 1000 in development).
 */
export declare const authLimiter: import("express-rate-limit").RateLimitRequestHandler;
