"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = exports.prisma = exports.pool = void 0;
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const env_1 = require("./env");
// Prevent multiple instances of Prisma Client and pg Pool in development due to hot reloading
const globalForPrisma = global;
const connectionString = env_1.env.DATABASE_URL;
// Initialize PostgreSQL connection pool
exports.pool = globalForPrisma.pool ||
    new pg_1.Pool({
        connectionString,
        max: env_1.env.NODE_ENV === 'production' ? 20 : 5, // pool size limit
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
    });
if (env_1.env.NODE_ENV !== 'production') {
    globalForPrisma.pool = exports.pool;
}
// Instantiate the official Prisma Pg Adapter with the pg pool
const adapter = new adapter_pg_1.PrismaPg(exports.pool);
// Instantiate PrismaClient using the PostgreSQL adapter (Required in Prisma v7)
exports.prisma = globalForPrisma.prisma ||
    new client_1.PrismaClient({
        adapter,
        log: env_1.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
if (env_1.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = exports.prisma;
}
// Test database connection helper using pg pool
const connectDb = async () => {
    try {
        const client = await exports.pool.connect();
        client.release(); // release client back to the pool
        console.log(' Database connected successfully via PostgreSQL Pool Adapter.');
    }
    catch (error) {
        console.error(' Failed to connect to the database:', error);
        process.exit(1);
    }
};
exports.connectDb = connectDb;
//# sourceMappingURL=database.js.map