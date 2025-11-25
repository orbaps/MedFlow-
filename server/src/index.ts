import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import compression from 'compression';

dotenv.config();

import authRoutes from './routes/authRoutes';
import inventoryRoutes from './routes/inventoryRoutes';
import orderRoutes from './routes/orderRoutes';
import alertRoutes from './routes/alertRoutes';
import aiRoutes from './routes/aiRoutes';
import logger from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { helmetConfig, limiter, authLimiter, corsOptions } from './middleware/security';

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmetConfig);
app.use(cors(corsOptions));

// Request logging
app.use(morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim())
    }
}));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression
app.use(compression());

// Rate limiting
app.use('/api/', limiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/ai', aiRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
});

// Global error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`);
    logger.info(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
    logger.info(`🏥 MedFlow API is ready!`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
    logger.error('Unhandled Rejection:', err);
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
    logger.error('Uncaught Exception:', err);
    process.exit(1);
});
