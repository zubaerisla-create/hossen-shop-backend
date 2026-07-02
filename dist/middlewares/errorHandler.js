"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const apiError_1 = require("../utils/apiError");
const env_1 = require("../config/env");
/**
 * Global Error Handler Middleware.
 * Standardizes errors caught during route execution.
 */
const errorHandler = (err, _req, res, _next) => {
    let statusCode = 500;
    let message = 'An unexpected error occurred on the server.';
    let errors = undefined;
    // Handle custom ApiError
    if (err instanceof apiError_1.ApiError) {
        statusCode = err.statusCode;
        message = err.message;
        errors = err.errors;
    }
    // Handle Zod Schema Validation Errors
    else if (err instanceof zod_1.ZodError) {
        statusCode = 400;
        message = 'Validation failed.';
        // Zod 4 uses issues instead of errors
        errors = err.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
        }));
    }
    // Handle Prisma Database Client Errors
    else if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
            case 'P2002': { // Unique constraint violation
                statusCode = 409;
                const target = err.meta?.target || [];
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
                if (env_1.env.NODE_ENV === 'development') {
                    errors = { code: err.code, meta: err.meta };
                }
                break;
        }
    }
    // Log error stack trace in development
    if (env_1.env.NODE_ENV === 'development') {
        console.error('🔴 Error details:', err);
    }
    else {
        console.error(`🔴 Error: ${err.name} - ${err.message}`);
    }
    res.status(statusCode).json({
        success: false,
        message,
        ...(errors !== undefined && { errors }),
        ...(env_1.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};
exports.errorHandler = errorHandler;
exports.default = exports.errorHandler;
//# sourceMappingURL=errorHandler.js.map