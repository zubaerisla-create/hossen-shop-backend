import { Response } from 'express';
/**
 * Standard utility for sending successful API responses.
 */
export declare class ApiResponse {
    /**
     * Send a successful JSON response
     */
    static success<T>(res: Response, message: string, data?: T, statusCode?: number): Response;
    /**
     * Send a Paginated JSON response
     */
    static paginated<T>(res: Response, message: string, data: T[], page: number, limit: number, totalItems: number, statusCode?: number): Response;
}
export default ApiResponse;
