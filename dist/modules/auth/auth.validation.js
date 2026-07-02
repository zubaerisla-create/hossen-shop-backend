"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signUpSchema = void 0;
const zod_1 = require("zod");
exports.signUpSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Please provide a valid email address.'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters.'),
        name: zod_1.z.string().min(2, 'Name must be at least 2 characters.').optional(),
    }),
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Please provide a valid email address.'),
        password: zod_1.z.string().min(1, 'Password is required.'),
    }),
});
//# sourceMappingURL=auth.validation.js.map