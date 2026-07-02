import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { env } from './config/env';
import { globalLimiter } from './config/limiter';
import { errorHandler } from './middlewares/errorHandler';
import { ApiError } from './utils/apiError';

const app: Application = express();

// ==========================================
// 1. Security Middlewares
// ==========================================
// Helmet helps secure the Express app by setting various HTTP headers
app.use(helmet());

// Enable CORS with dynamic settings loaded from Zod-validated environment config
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ==========================================
// 2. Global Request Limiters & Body Parsers
// ==========================================
// Apply global rate limiter to prevent denial of service (DoS) attacks
app.use(globalLimiter);

// Parse JSON request bodies with payload limits (prevent large payload flooding)
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded requests
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Custom request logger in development mode
if (env.NODE_ENV === 'development') {
  app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(`📡 [${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
  });
}

// ==========================================
// 3. API Routes
// ==========================================
// Centralized API entrypoint
app.use('/api/v1', routes);

// Base Health Check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});

// ==========================================
// 4. Error Handling
// ==========================================
// Fallback for requests matching no registered endpoints
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(ApiError.notFound('The requested API resource does not exist.'));
});

// Global Error Handler Middleware
app.use(errorHandler);

export default app;
