"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./routes"));
const env_1 = require("./config/env");
const limiter_1 = require("./config/limiter");
const errorHandler_1 = require("./middlewares/errorHandler");
const apiError_1 = require("./utils/apiError");
const app = (0, express_1.default)();
// ==========================================
// 1. Security Middlewares
// ==========================================
// Helmet helps secure the Express app by setting various HTTP headers
app.use((0, helmet_1.default)());
// Enable CORS with dynamic settings loaded from Zod-validated environment config
app.use((0, cors_1.default)({
    origin: env_1.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
// ==========================================
// 2. Global Request Limiters & Body Parsers
// ==========================================
// Apply global rate limiter to prevent denial of service (DoS) attacks
app.use(limiter_1.globalLimiter);
// Parse JSON request bodies with payload limits (prevent large payload flooding)
app.use(express_1.default.json({ limit: '10mb' }));
// Parse URL-encoded requests
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Custom request logger in development mode
if (env_1.env.NODE_ENV === 'development') {
    app.use((req, _res, next) => {
        console.log(`📡 [${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
        next();
    });
}
// ==========================================
// 3. API Routes
// ==========================================
// Centralized API entrypoint
app.use('/api/v1', routes_1.default);
// Base Health Check endpoint
app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        environment: env_1.env.NODE_ENV,
    });
});
// ==========================================
// 4. Error Handling
// ==========================================
// Fallback for requests matching no registered endpoints
app.use((_req, _res, next) => {
    next(apiError_1.ApiError.notFound('The requested API resource does not exist.'));
});
// Global Error Handler Middleware
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map