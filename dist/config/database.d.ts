import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
export declare const pool: Pool;
export declare const prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/client").DefaultArgs>;
export declare const connectDb: () => Promise<void>;
