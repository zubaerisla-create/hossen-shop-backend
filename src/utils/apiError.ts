/**
 * Custom API Error class for standardizing HTTP error responses
 */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errors?: unknown;

  constructor(statusCode: number, message: string, errors?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    // Restore prototype chain
    Object.setPrototypeOf(this, new.target.prototype);

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, errors?: unknown): ApiError {
    return new ApiError(400, message, errors);
  }

  static unauthorized(message: string = 'Unauthorized access.'): ApiError {
    return new ApiError(401, message);
  }

  static forbidden(message: string = 'Permission denied.'): ApiError {
    return new ApiError(403, message);
  }

  static notFound(message: string = 'Requested resource not found.'): ApiError {
    return new ApiError(404, message);
  }

  static conflict(message: string): ApiError {
    return new ApiError(409, message);
  }

  static tooManyRequests(message: string = 'Too many requests.'): ApiError {
    return new ApiError(429, message);
  }

  static internal(message: string = 'Internal server error.'): ApiError {
    return new ApiError(500, message);
  }
}
export default ApiError;
