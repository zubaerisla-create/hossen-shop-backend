"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
/**
 * Request Validation Middleware using Zod.
 * Validates request body, query, and params against a Zod schema.
 */
const validate = (schema) => {
    return async (req, _res, next) => {
        try {
            // Parse and validate req.body, req.query, and req.params
            const parsed = (await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            }));
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
        }
        catch (error) {
            // Pass the validation error to the global error handler
            next(error);
        }
    };
};
exports.validate = validate;
exports.default = exports.validate;
//# sourceMappingURL=validate.js.map