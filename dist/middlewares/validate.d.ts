import { Request, Response, NextFunction } from 'express';
import { ZodObject } from 'zod';
/**
 * Request Validation Middleware using Zod.
 * Validates request body, query, and params against a Zod schema.
 */
export declare const validate: (schema: ZodObject<any>) => (req: Request, _res: Response, next: NextFunction) => Promise<void>;
export default validate;
