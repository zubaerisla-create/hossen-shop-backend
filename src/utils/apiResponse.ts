import { Response } from 'express';

/**
 * Standard utility for sending successful API responses.
 */
export class ApiResponse {
  /**
   * Send a successful JSON response
   */
  static success<T>(
    res: Response,
    message: string,
    data?: T,
    statusCode: number = 200
  ): Response {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  /**
   * Send a Paginated JSON response
   */
  static paginated<T>(
    res: Response,
    message: string,
    data: T[],
    page: number,
    limit: number,
    totalItems: number,
    statusCode: number = 200
  ): Response {
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
export default ApiResponse;
