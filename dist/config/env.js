"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
// Load environment variables from .env file
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().default(5000),
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    CORS_ORIGIN: zod_1.z.string().default('*'),
    DATABASE_URL: zod_1.z.string({
        error: 'DATABASE_URL environment variable is required.',
    }),
    DIRECT_URL: zod_1.z.string().optional(),
    SUPABASE_URL: zod_1.z.string().url('SUPABASE_URL must be a valid URL.').optional(),
    SUPABASE_ANON_KEY: zod_1.z.string().optional(),
    SUPABASE_SERVICE_ROLE_KEY: zod_1.z.string().optional(),
    CLOUDINARY_CLOUD_NAME: zod_1.z.string().optional(),
    CLOUDINARY_API_KEY: zod_1.z.string().optional(),
    CLOUDINARY_API_SECRET: zod_1.z.string().optional(),
    STRIPE_SECRET_KEY: zod_1.z.string().optional(),
});
const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    console.error('❌ Invalid environment variables:');
    console.error(JSON.stringify(parsedEnv.error.format(), null, 2));
    process.exit(1);
}
exports.env = parsedEnv.data;
//# sourceMappingURL=env.js.map