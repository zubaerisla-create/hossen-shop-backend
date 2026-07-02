"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.authenticate = void 0;
const supabase_1 = require("../config/supabase");
const apiError_1 = require("../utils/apiError");
const database_1 = require("../config/database");
/**
 * Middleware to authenticate requests using Supabase JWT.
 * Falls back to mock tokens in development if Supabase credentials are not configured.
 */
const authenticate = async (req, _res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw apiError_1.ApiError.unauthorized('Access token is missing or invalid. Use Bearer token.');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw apiError_1.ApiError.unauthorized('Bearer token cannot be empty.');
        }
        // Developer Ergonomics: Support mock auth in development when Supabase is not yet configured
        if (!supabase_1.supabase) {
            if (token.startsWith('mock-admin-')) {
                req.user = {
                    id: 'mock-admin-uuid',
                    email: 'admin@hossenshop.com',
                    role: 'admin',
                };
                return next();
            }
            else if (token.startsWith('mock-user-')) {
                req.user = {
                    id: 'mock-user-uuid',
                    email: 'customer@gmail.com',
                    role: 'customer',
                };
                return next();
            }
            throw apiError_1.ApiError.unauthorized('Supabase client not configured. Use a mock token (e.g. "mock-admin-123" or "mock-user-123") for development.');
        }
        // Call Supabase API to retrieve user info for the token
        const { data: { user }, error } = await supabase_1.supabase.auth.getUser(token);
        if (error || !user) {
            throw apiError_1.ApiError.unauthorized('Invalid or expired authentication session.');
        }
        // Find or sync the user in our main PostgreSQL database
        let dbUser = await database_1.prisma.user.findUnique({
            where: { id: user.id },
        });
        if (!dbUser) {
            dbUser = await database_1.prisma.user.create({
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
    }
    catch (err) {
        next(err);
    }
};
exports.authenticate = authenticate;
/**
 * Middleware to restrict access to administrators only.
 * Must be placed after the 'authenticate' middleware.
 */
const requireAdmin = (req, _res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return next(apiError_1.ApiError.forbidden('Administrator privileges are required to access this resource.'));
    }
    next();
};
exports.requireAdmin = requireAdmin;
//# sourceMappingURL=auth.js.map