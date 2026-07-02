"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
/**
 * Custom API Error class for standardizing HTTP error responses
 */
class ApiError extends Error {
    statusCode;
    errors;
    constructor(statusCode, message, errors) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        // Restore prototype chain
        Object.setPrototypeOf(this, new.target.prototype);
        // Capture stack trace
        Error.captureStackTrace(this, this.constructor);
    }
    static badRequest(message, errors) {
        return new ApiError(400, message, errors);
    }
    static unauthorized(message = 'Unauthorized access.') {
        return new ApiError(401, message);
    }
    static forbidden(message = 'Permission denied.') {
        return new ApiError(403, message);
    }
    static notFound(message = 'Requested resource not found.') {
        return new ApiError(404, message);
    }
    static conflict(message) {
        return new ApiError(409, message);
    }
    static tooManyRequests(message = 'Too many requests.') {
        return new ApiError(429, message);
    }
    static internal(message = 'Internal server error.') {
        return new ApiError(500, message);
    }
}
exports.ApiError = ApiError;
exports.default = ApiError;
//# sourceMappingURL=apiError.js.map