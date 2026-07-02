import http from 'http';
import app from './app';
import { env } from './config/env';
import { connectDb, prisma } from './config/database';

// Initialize http server instance
const server = http.createServer(app);

async function startServer() {
  try {
    // 1. Verify database connectivity
    await connectDb();

    // 2. Start HTTP server listening
    server.listen(env.PORT, () => {
      console.log(`🚀 Server running in [${env.NODE_ENV}] mode on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start application server:', error);
    process.exit(1);
  }
}

// ==========================================
// Graceful Shutdown Mechanics
// ==========================================
function gracefulShutdown(signal: string) {
  console.log(`\n🛑 Received ${signal}. Initiating graceful shutdown...`);

  // Close HTTP server to stop accepting new requests
  server.close(async () => {
    console.log('🚪 HTTP server closed.');

    try {
      // Disconnect database connections
      await prisma.$disconnect();
      console.log('🔌 Database connections disconnected.');
      
      console.log('👋 Shutdown complete. Goodbye.');
      process.exit(0);
    } catch (err) {
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
