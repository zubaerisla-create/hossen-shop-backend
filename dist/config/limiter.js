"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLimiter = exports.globalLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_1 = require("./env");
const isDev = env_1.env.NODE_ENV === 'development';
/**
 * Global rate limiter: Applies to all incoming requests by default.
 * Limits each IP to 100 requests per 15 minutes (relaxed to 10000 in development).
 */
exports.globalLimiter = (0, express_rate_limit_1.default)({
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
exports.authLimiter = (0, express_rate_limit_1.default)({
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
//# sourceMappingURL=limiter.js.map