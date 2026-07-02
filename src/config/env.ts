import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { z } from 'zod';

const envPath = path.resolve(__dirname, '../../.env');

// Load environment variables from .env file using absolute path
dotenv.config({ path: envPath });

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  CORS_ORIGIN: z.string().default('*'),
  DATABASE_URL: z.string({
    error: 'DATABASE_URL environment variable is required.',
  }),
  DIRECT_URL: z.string().optional(),
  SUPABASE_URL: z.string().url('SUPABASE_URL must be a valid URL.').optional(),
  SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  EMAIL_HOST: z.string().default('smtp.gmail.com'),
  EMAIL_PORT: z.coerce.number().default(587),
  EMAIL_USER: z.string().default('admin.nexolve@gmail.com'),
  EMAIL_PASS: z.string().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:');
  console.error(JSON.stringify(parsedEnv.error.format(), null, 2));
  process.exit(1);
}

export const env = parsedEnv.data;
