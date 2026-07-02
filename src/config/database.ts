import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { env } from './env';

// Prevent multiple instances of Prisma Client and pg Pool in development due to hot reloading
const globalForPrisma = global as unknown as { prisma: PrismaClient; pool: Pool };

const connectionString = env.DATABASE_URL;

// Initialize PostgreSQL connection pool
export const pool =
  globalForPrisma.pool ||
  new Pool({
    connectionString,
    max: env.NODE_ENV === 'production' ? 20 : 5, // pool size limit
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });

if (env.NODE_ENV !== 'production') {
  globalForPrisma.pool = pool;
}

// Instantiate the official Prisma Pg Adapter with the pg pool
const adapter = new PrismaPg(pool);

// Instantiate PrismaClient using the PostgreSQL adapter (Required in Prisma v7)
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Test database connection helper using pg pool
export const connectDb = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    client.release(); // release client back to the pool
    console.log(' Database connected successfully via PostgreSQL Pool Adapter.');
  } catch (error) {
    console.error(' Failed to connect to the database:', error);
    process.exit(1);
  }
};
