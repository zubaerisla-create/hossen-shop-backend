"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const database_1 = require("./config/database");
const server = http_1.default.createServer(app_1.default);
async function startServer() {
    try {
        // 1. Verify database connectivity
        await (0, database_1.connectDb)();
        // 2. Start HTTP server listening
        server.listen(env_1.env.PORT, () => {
            console.log(`🚀 Server running in [${env_1.env.NODE_ENV}] mode on http://localhost:${env_1.env.PORT}`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start application server:', error);
        process.exit(1);
    }
}
// ==========================================
// Graceful Shutdown Mechanics
// ==========================================
function gracefulShutdown(signal) {
    console.log(`\n🛑 Received ${signal}. Initiating graceful shutdown...`);
    // Close HTTP server to stop accepting new requests
    server.close(async () => {
        console.log('🚪 HTTP server closed.');
        try {
            // Disconnect database connections
            await database_1.prisma.$disconnect();
            console.log('🔌 Database connections disconnected.');
            console.log('👋 Shutdown complete. Goodbye.');
            process.exit(0);
        }
        catch (err) {
            console.error('⚠️ Error during database disconnect:', err);
            process.exit(1);
        }
    });
    // Force shutdown after a timeout (safety mechanism)
    setTimeout(() => {
        console.error('🚨 Forceful shutdown triggered (timeout exceeded).');
        process.exit(1);
    }, 10000);
}
// Setup listeners for process exit signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
startServer();
//# sourceMappingURL=server.js.map