import { Request, Response, NextFunction } from 'express';
import { ZodObject } from 'zod';

/**
 * Request Validation Middleware using Zod.
 * Validates request body, query, and params against a Zod schema.
 */
export const validate = (schema: ZodObject<any>) => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      // Parse and validate req.body, req.query, and req.params
      const parsed = (await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })) as any;

      // Assign the coerced/validated values back to express Request object
      req.body = parsed.body;

      if (parsed.query && req.query) {
        for (const key of Object.keys(req.query)) {
          delete req.query[key];
        }
        Object.assign(req.query, parsed.query);
      }

      if (parsed.params && req.params) {
        for (const key of Object.keys(req.params)) {
          delete req.params[key];
        }
        Object.assign(req.params, parsed.params);
      }

      next();
    } catch (error) {
      // Pass the validation error to the global error handler
      next(error);
    }
  };
};

export default validate;
