"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
/**
 * Standard utility for sending successful API responses.
 */
class ApiResponse {
    /**
     * Send a successful JSON response
     */
    static success(res, message, data, statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }
    /**
     * Send a Paginated JSON response
     */
    static paginated(res, message, data, page, limit, totalItems, statusCode = 200) {
        const totalPages = Math.ceil(totalItems / limit);
        return res.status(statusCode).json({
            success: true,
            message,
            pagination: {
                page,
                limit,
                totalItems,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
            data,
        });
    }
}
exports.ApiResponse = ApiResponse;
exports.default = ApiResponse;
//# sourceMappingURL=apiResponse.js.map